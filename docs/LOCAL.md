# Running the Project Locally

This project builds and runs on macOS only, because it talks to Apple's Neural
Engine through private frameworks. The current instructions cover a local
checkout of the repository.

## Requirements

- macOS 15 (Sequoia) or newer on Apple Silicon (tested on M4).
- Xcode Command Line Tools, for `xcrun`, `clang`, and the macOS SDK.
- Python 3.9+ (optional: tokenization and the training dashboard).

Install the command line tools if you do not already have them:

```bash
xcode-select --install
```

Verify the toolchain and architecture:

```bash
sw_vers
uname -m          # must print arm64
xcrun clang --version
```

No third-party C libraries are needed. The build uses the system `Foundation`,
`CoreML`, `IOSurface`, and `Accelerate` frameworks, and resolves the private ANE
APIs at runtime.

## Get the code

```bash
git clone https://github.com/ahmedbanihanibh/ane.git
cd ane
```

## Build

The main training program lives in `training/` and is built with `make`:

```bash
cd training

make train_large   # main trainer (12-layer Stories110M)
make train         # minimal single-layer prototype
make probes        # hardware/API probe binaries (test_*)
```

The equivalent manual build for the main trainer is:

```bash
xcrun clang -O2 -Wall -Wno-deprecated-declarations -fobjc-arc \
  -framework Foundation -framework CoreML -framework IOSurface \
  -ldl -framework Accelerate \
  -o train_large train_large.m
```

## Data and model files

`train_large` reads its weights and tokens from fixed relative paths, so place
the files before running it:

- `assets/models/stories110M.bin` — pretrained Stories110M weights in
  `llama2.c` format (resolved as `../../assets/models/stories110M.bin` from
  `training/`).
- `training/tinystories_data00.bin` — flat `uint16` token IDs (32K Llama 2 BPE
  vocabulary).

Extract the tokenized data from a pretokenized TinyStories zip:

```bash
# expects ~/tiny_stories_data_pretokenized.zip containing data00.bin
cd training
python3 tokenize.py
```

The script writes `training/tinystories_data00.bin` and is a no-op if the file
already exists. The optional dashboard also looks for
`assets/models/tokenizer.bin` for text generation.

## Run

From the `training/` directory:

```bash
./train_large             # start a fresh run
./train_large --resume    # resume from ane_stories110M_ckpt.bin
```

The process checkpoints automatically. Because the ANE compiler leaks resources,
it restarts itself with `exec()` after roughly 119 compiles per process; with
`--resume` it continues from the checkpoint.

The minimal prototype takes a model file and optional arguments:

```bash
./train ../../assets/models/stories110M.bin [seq_len] [steps] [lr] [--cpu]
```

Pass `--cpu` to run without the ANE backend.

## Dashboard (optional)

The dashboard reads the trainer's log and shows loss, throughput, power, and
memory:

```bash
pip install blessed psutil numpy
python3 dashboard.py --resume
```

`powermetrics` requires root, so run the dashboard with `sudo` if you want power
graphs. It is normally started alongside `./train_large` and expects the same
working directory.

## Hardware probes (optional)

The probe binaries document the ANE discovery work and can be run directly:

```bash
cd training
make probes
./test_weight_reload
./test_perf_stats
./test_qos_sweep
./test_ane_advanced
```

## Troubleshooting

- `xcrun: error: unable to find utility "clang"` — install the Xcode Command
  Line Tools with `xcode-select --install`.
- Build succeeds but the program exits immediately while loading a model — check
  that `assets/models/stories110M.bin` exists and matches the expected dims
  (`dim=768`, `hidden=2048`, `layers=12`).
- `Cannot open training/tinystories_data00.bin` — run `python3 tokenize.py` or
  place the token file manually.
- ANE compilation failures — the trainer falls back to CPU in the prototype;
  `train_large` requires Apple Silicon with a working ANE.

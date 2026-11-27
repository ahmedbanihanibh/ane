# Note One

The ANE Training project explores training neural networks directly on Apple's Neural Engine using reverse-engineered private APIs. Rather than relying on CoreML training or the GPU, it constructs MIL compute graphs at runtime and runs forward and backward passes on ANE hardware through `_ANEClient` and `_ANECompiler`. The current single-layer transformer prototype reaches about 9.3 ms per step on an M4, with most forward and backward input-gradient work on the ANE and weight gradients computed on the CPU via Accelerate.

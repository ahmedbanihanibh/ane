# Plan Two: Probe Execution

## Goal

Run the probe suite and capture comparable measurements.

## Steps

1. Execute the in-memory probe scripts (`inmem_basic.m`, `inmem_bench.m`, `inmem_peak.m`).
2. Execute the SRAM probe scripts (`sram_probe.m`, `sram_bench.m`).
3. Collect timing, memory, and QoS observations into a single summary.

## Success Criteria

- Each probe runs to completion or fails with a documented error.
- Results are comparable against the Plan One baseline.

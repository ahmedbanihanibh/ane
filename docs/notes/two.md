# Note Two

The training loop is organized around six ANE kernels per step: two forward kernels for attention and the SwiGLU FFN, plus four backward kernels covering the FFN, both SDPA stages, and the QKV projection. Weights are embedded directly into compiled programs as BLOBFILE constants, so they are rebuilt when weights change, while IOSurface shared memory carries fp16 tensors in the ANE-friendly `[1,C,1,S]` layout. Optimization work such as channel-first layout, vectorized RMSNorm, and overlapping CPU gradient math with ANE evaluation reduced step time from 33.5 ms to 9.3 ms.

# Note Three

Practical use of the project requires macOS 15 or newer on Apple Silicon, and the sample programs build with the system clang against Foundation, IOSurface, CoreML, and Accelerate. Known limitations include ANE hardware ignoring SDPA attention masks, a compiler resource leak that caps programs at roughly 119 compiles per process (worked around by restarting with checkpoints), and a current focus on a single layer with synthetic data. The code is independent research released under the MIT license and is not affiliated with or endorsed by Apple.

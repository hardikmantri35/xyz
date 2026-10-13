# ESP32 PlatformIO Project Instructions

- Add verbose inline comments to all code. Comments must explain the hardware-debugging logic, including what a state, GPIO operation, timing decision, sensor reading, or error path is expected to indicate on the physical device.
- Add `Serial.println()` statements at every major state change so behavior can be traced easily in the Serial Monitor. Log setup completion, mode changes, important input readings, actuator changes, recoverable errors, and failure states with clear messages.
- Use PlatformIO CLI commands for every compile, upload, or monitor command provided to the user. Use commands such as `pio run`, `pio run -t upload`, and `pio device monitor -b 115200`; do not provide Arduino IDE, ESP-IDF, or raw toolchain commands.
- When modifying code, output only the modified functions in response examples or patches. Do not reproduce an entire source file when only functions changed.
- Preserve the project monitor speed of 115200 baud unless the user explicitly requests a different value.
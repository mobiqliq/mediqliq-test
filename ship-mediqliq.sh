#!/bin/bash
echo "🚢 Preparing Mediqliq v1.0 Production Ship..."

# 1. Directory Integrity Check
mkdir -p dist/manual
cp documentation/staff_sop.md dist/manual/

# 2. Compile Assets
npm run build

# 3. Generate Desktop Binaries
npx electron-builder build --win --mac --universal

echo "✅ Mediqliq v1.0 is ready for Pilot Deployment."
echo "Location: /dist/Mediqliq-Setup.exe and /dist/Mediqliq-Universal.dmg"

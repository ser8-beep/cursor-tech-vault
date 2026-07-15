#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/assets/case-studies"
mkdir -p "$DIR"

download() {
  curl -sL "$1" -o "$2"
  echo "saved $2"
}

# Default artwork — Figma organism-case-study-card-1920 (97:2026)
download "https://www.figma.com/api/mcp/asset/4b8f64b5-c279-45a8-96cd-b040b164b3f2" "$DIR/insurance-default.png"
download "https://www.figma.com/api/mcp/asset/2f7fc9c2-a98e-43ea-bc07-4bcd3704d7ec" "$DIR/maternity-default.png"
download "https://www.figma.com/api/mcp/asset/cf1665ad-06e4-4087-b1b0-e19e29b64ad5" "$DIR/smart-home-default.png"
download "https://www.figma.com/api/mcp/asset/6f2a9218-64dc-489b-a94a-ab586a4134bb" "$DIR/erp-default.png"

# Hover artwork — Figma organism-case-study-card-1920 hover (97:2026)
download "https://www.figma.com/api/mcp/asset/3b153ef7-2032-483b-b916-904e7fc33a11" "$DIR/insurance-hover.png"
download "https://www.figma.com/api/mcp/asset/df19b423-3061-4dda-8fc8-2228b23acdc8" "$DIR/maternity-hover.png"
download "https://www.figma.com/api/mcp/asset/d92bfcb1-02a0-43d1-b223-dd552356ba28" "$DIR/smart-home-hover.png"
download "https://www.figma.com/api/mcp/asset/d610162b-2bb0-4cd0-9723-3e3b930a8666" "$DIR/erp-hover.png"

# Maternity hover halftone texture overlay
download "https://www.figma.com/api/mcp/asset/e202ff00-ed61-4a15-9cc4-cdbc0bd24446" "$DIR/maternity-hover-texture.png"

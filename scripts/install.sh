#!/usr/bin/env bash
set -euo pipefail

# Fast Food — Bash installer
# Usage examples:
#   bash scripts/install.sh                # install node modules
#   bash scripts/install.sh --prebuild ios # prebuild iOS
#   bash scripts/install.sh --prebuild android # prebuild Android
#   bash scripts/install.sh --prebuild both    # prebuild both platforms
#   bash scripts/install.sh --no-ci        # force npm install instead of npm ci

force_npm_install=false
prebuild_target=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-ci)
      force_npm_install=true
      shift
      ;;
    --prebuild)
      prebuild_target=${2:-}
      if [[ -z "$prebuild_target" ]]; then
        echo "Error: --prebuild requires an argument: ios | android | both" >&2
        exit 1
      fi
      shift 2
      ;;
    --help|-h)
      grep -E "^# " "$0" | sed 's/^# //'
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

# 1) Check Node and npm
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed or not in PATH. Please install Node 18+." >&2
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed or not in PATH. Please install npm 10+." >&2
  exit 1
fi

echo "Node: $(node -v)"
echo "npm:  $(npm -v)"

# 2) Install dependencies
if [[ -f package-lock.json && $force_npm_install == false ]]; then
  echo "Installing dependencies with npm ci..."
  npm ci
else
  echo "Installing dependencies with npm install..."
  npm install
fi

echo "Dependencies installed successfully."

# 3) Optional prebuild
if [[ -n "$prebuild_target" ]]; then
  if ! command -v npx >/dev/null 2>&1; then
    echo "npx is required to run expo prebuild. Please ensure npm provides npx." >&2
    exit 1
  fi
  if ! npx --yes expo --version >/dev/null 2>&1; then
    echo "Installing Expo CLI locally to run prebuild..."
    npm install --no-fund --no-audit --save-dev expo
  fi

  case "$prebuild_target" in
    ios)
      echo "Running: npx expo prebuild -p ios --clean"
      npx expo prebuild -p ios --clean
      ;;
    android)
      echo "Running: npx expo prebuild -p android --clean"
      npx expo prebuild -p android --clean
      ;;
    both)
      echo "Running: npx expo prebuild -p ios --clean"
      npx expo prebuild -p ios --clean
      echo "Running: npx expo prebuild -p android --clean"
      npx expo prebuild -p android --clean
      ;;
    *)
      echo "Unknown prebuild target: $prebuild_target (expected ios|android|both)" >&2
      exit 1
      ;;
  esac
fi

echo "Done."
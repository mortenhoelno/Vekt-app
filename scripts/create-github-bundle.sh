#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
BUNDLE_DIR="$REPO_ROOT/dist"
BUNDLE_PATH="$BUNDLE_DIR/vekt-app.bundle"

mkdir -p "$BUNDLE_DIR"

if [ -f "$BUNDLE_PATH" ]; then
  echo "Sletter eksisterende bundle: $BUNDLE_PATH"
  rm -f "$BUNDLE_PATH"
fi

echo "Lager git bundle i $BUNDLE_PATH"
git -C "$REPO_ROOT" bundle create "$BUNDLE_PATH" --all

echo "Bundle klar. Last opp filen til GitHub ved å gå til https://github.com/new/import"
echo "og velg \"GitHub importerer\" -> \"Upload a file\" for å laste opp bundle-filen."

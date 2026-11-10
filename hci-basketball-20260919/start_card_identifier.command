#!/bin/zsh
set -e
cd "${0:A:h}"
PYTHON='/Users/jamescho/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3'
exec "$PYTHON" card_identification_server.py

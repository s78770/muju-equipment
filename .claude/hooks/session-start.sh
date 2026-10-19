#!/bin/bash
set -euo pipefail

# Only run in Claude Code cloud sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Node dependencies
npm install

# markitdown (document → Markdown converter)
if ! command -v markitdown >/dev/null 2>&1; then
  pip install --quiet 'markitdown[all]'
fi

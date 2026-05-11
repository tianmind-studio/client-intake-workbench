#!/usr/bin/env bash
set -euo pipefail

root="${1:-.}"

cd "$root"

fail=0

echo "== Checking forbidden files =="
for pattern in ".env" "._*" "*.sqlite" "*.db" "*.key" "*.pem" "id_rsa" "uploads" ".next" "node_modules"; do
  matches=$(find . -path "./.git" -prune -o -name "$pattern" -print)
  if [ -n "$matches" ]; then
    echo "Found forbidden pattern: $pattern"
    echo "$matches"
    fail=1
  fi
done

echo "== Scanning sensitive keywords =="
keywords=(
  "OPENAI_API_KEY"
  "ANTHROPIC_API_KEY"
  "GITHUB_TOKEN"
  "CLOUDFLARE_API_TOKEN"
  "password="
  "passwd"
  "BEGIN OPENSSH PRIVATE KEY"
  "BEGIN RSA PRIVATE KEY"
  "cookie"
  "session"
  "真实客户"
  "客户原话"
  "身份证"
  "手机号"
  "微信号"
)

for keyword in "${keywords[@]}"; do
  if rg -n --hidden --glob '!.git/**' --glob '!scripts/check-public-safe.sh' "$keyword" . >/tmp/client-intake-public-scan.txt; then
    echo "Sensitive keyword found: $keyword"
    cat /tmp/client-intake-public-scan.txt
    fail=1
  fi
done

rm -f /tmp/client-intake-public-scan.txt

if [ "$fail" -ne 0 ]; then
  echo "Public-safety check failed."
  exit 1
fi

echo "Public-safety check passed."

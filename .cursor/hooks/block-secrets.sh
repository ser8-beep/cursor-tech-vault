#!/bin/bash
# Blocks agent writes to sensitive file paths.
# Hook event: preToolUse (matcher: Write|StrReplace|EditNotebook)

input=$(cat)

path=$(python3 -c "
import json, sys
data = json.load(sys.stdin)
for key in ('path', 'file_path', 'target_notebook'):
    if data.get(key):
        print(data[key])
        break
" <<< "$input" 2>/dev/null)

if [ -z "$path" ]; then
  echo '{"permission": "allow"}'
  exit 0
fi

# Normalize path for matching
normalized=$(echo "$path" | tr '\\' '/')

blocked=0
case "$normalized" in
  *.env|.env|*/.env)
    blocked=1; reason=".env files may contain secrets" ;;
  *.pem|*/.pem)
    blocked=1; reason="PEM files may contain private keys" ;;
  *.key|*/.key)
    blocked=1; reason=".key files may contain secrets" ;;
  credentials.json|*/credentials.json)
    blocked=1; reason="credentials.json may contain secrets" ;;
  id_rsa|id_rsa.pub|*/id_rsa|*/id_rsa.pub|*/.ssh/*|.ssh/*)
    blocked=1; reason="SSH key files must not be edited by the agent" ;;
  *.p12|*.pfx|*/secrets/*|secrets/*)
    blocked=1; reason="File path is in a protected secrets category" ;;
esac

if [ "$blocked" -eq 1 ]; then
  python3 -c "
import json
print(json.dumps({
    'permission': 'deny',
    'user_message': 'Blocked: $reason. Store secrets outside the vault or use a password manager.',
    'agent_message': 'Edit blocked by secret-protection hook for path: $path'
}))
"
  exit 2
fi

echo '{"permission": "allow"}'
exit 0

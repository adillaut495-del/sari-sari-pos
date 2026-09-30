#!/data/data/com.termux/files/usr/bin/bash
set -e

REPOSITORY_URL="https://github.com/adillaut495-del/sari-sari-pos.git"
PROJECT_DIR="$HOME/sari-sari-pos"

echo "Updating Termux packages..."
pkg update -y
pkg install -y git nodejs

if [ -d "$PROJECT_DIR/.git" ]; then
  echo "Updating Sari-Sari POS..."
  git -C "$PROJECT_DIR" pull --ff-only
elif [ -e "$PROJECT_DIR" ]; then
  echo "Cannot install: $PROJECT_DIR exists but is not a Git repository."
  exit 1
else
  echo "Downloading Sari-Sari POS..."
  git clone "$REPOSITORY_URL" "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"

echo "Installing dependencies..."
npm install

echo "Building the frontend..."
npm run build

echo "Starting Sari-Sari POS..."
echo "Frontend: http://127.0.0.1:4173"
echo "Database API: http://127.0.0.1:4174"
exec npm run start:local

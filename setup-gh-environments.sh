#!/usr/bin/env bash

set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
	echo "gh CLI is required. Install it first: https://cli.github.com/"
	exit 1
fi

SKIP_SSH=false
REPO=""

for arg in "$@"; do
	case "$arg" in
	--skip-ssh | --db-only)
		SKIP_SSH=true
		;;
	*)
		if [ -z "$REPO" ]; then
			REPO="$arg"
		else
			echo "Unexpected argument: $arg"
			echo "Usage: $0 [owner/repo] [--skip-ssh]"
			exit 1
		fi
		;;
	esac
done

if [ -z "$REPO" ]; then
	REPO="$(gh repo view --json nameWithOwner --jq .nameWithOwner)"
fi

prompt_required() {
	local label="$1"
	local secret_mode="${2:-false}"
	local value

	while true; do
		if [ "$secret_mode" = "true" ]; then
			read -r -s -p "$label: " value
			echo
		else
			read -r -p "$label: " value
		fi

		if [ -n "$value" ]; then
			printf '%s' "$value"
			return 0
		fi

		echo "This value is required."
	done
}

prompt_with_default() {
	local label="$1"
	local default_value="$2"
	local value

	read -r -p "$label [$default_value]: " value
	if [ -z "$value" ]; then
		printf '%s' "$default_value"
	else
		printf '%s' "$value"
	fi
}

set_environment() {
	local environment_name="$1"
	echo "Creating/updating environment: $environment_name"
	gh api -X PUT "repos/$REPO/environments/$environment_name" >/dev/null
}

set_secret() {
	local environment_name="$1"
	local secret_name="$2"
	local secret_value="$3"
	gh secret set "$secret_name" --repo "$REPO" --env "$environment_name" --body "$secret_value" >/dev/null
}

set_key_secret() {
	local environment_name="$1"
	local key_file="$2"
	gh secret set KEY --repo "$REPO" --env "$environment_name" <"$key_file"
}

yes_or_no() {
	local prompt="$1"
	local default_value="$2"
	local value

	read -r -p "$prompt [$default_value]: " value
	if [ -z "$value" ]; then
		value="$default_value"
	fi

	case "$value" in
	y | Y | yes | YES) return 0 ;;
	*) return 1 ;;
	esac
}

echo "Repository: $REPO"
echo "This script configures GitHub Environment secrets for production/development deploys."
echo

KEY_FILE=""
PROD_HOST=""
PROD_USER=""
PROD_SSH_PORT="22"

if [ "$SKIP_SSH" = "false" ]; then
	KEY_FILE="$(prompt_required 'Path to SSH private key file (for KEY secret)')"
	if [ ! -f "$KEY_FILE" ]; then
		echo "File not found: $KEY_FILE"
		exit 1
	fi

	PROD_HOST="$(prompt_required 'Production VPS host (HOST)')"
	PROD_USER="$(prompt_required 'Production VPS SSH username (USERNAME)')"
	PROD_SSH_PORT="$(prompt_with_default 'Production VPS SSH port (SSH_PORT)' '22')"
else
	echo "Skipping SSH secret prompts (--skip-ssh)."
	echo "Existing repo/environment SSH secrets will be used."
fi

PROD_DB_NETWORK="$(prompt_with_default 'Production DB network (BACKEND_DB_NETWORK)' 'urf-backend-network')"
PROD_BACKEND_DOMAIN="$(prompt_with_default 'Production backend domain (BACKEND_DOMAIN)' 'api.urf.buildstack.space')"
PROD_TRAEFIK_ENABLE="$(prompt_with_default 'Production traefik enable (TRAEFIK_ENABLE)' 'true')"
PROD_DATABASE_HOST="$(prompt_with_default 'Production DATABASE_HOST' 'urf-postgres')"
PROD_DATABASE_PORT="$(prompt_with_default 'Production DATABASE_PORT' '5432')"
PROD_DATABASE_USERNAME="$(prompt_required 'Production DATABASE_USERNAME')"
PROD_DATABASE_PASSWORD="$(prompt_required 'Production DATABASE_PASSWORD' true)"
PROD_DATABASE_NAME="$(prompt_required 'Production DATABASE_NAME')"
PROD_JWT_SECRET="$(prompt_required 'Production JWT_SECRET' true)"

set_environment production
if [ "$SKIP_SSH" = "false" ]; then
	set_secret production HOST "$PROD_HOST"
	set_secret production USERNAME "$PROD_USER"
	set_secret production SSH_PORT "$PROD_SSH_PORT"
	set_key_secret production "$KEY_FILE"
fi
set_secret production BACKEND_DB_NETWORK "$PROD_DB_NETWORK"
set_secret production BACKEND_DOMAIN "$PROD_BACKEND_DOMAIN"
set_secret production TRAEFIK_ENABLE "$PROD_TRAEFIK_ENABLE"
set_secret production DATABASE_HOST "$PROD_DATABASE_HOST"
set_secret production DATABASE_PORT "$PROD_DATABASE_PORT"
set_secret production DATABASE_USERNAME "$PROD_DATABASE_USERNAME"
set_secret production DATABASE_PASSWORD "$PROD_DATABASE_PASSWORD"
set_secret production DATABASE_NAME "$PROD_DATABASE_NAME"
set_secret production JWT_SECRET "$PROD_JWT_SECRET"

if yes_or_no 'Configure development environment secrets now?' 'y'; then
	echo
	echo 'Configuring development environment'

	DEV_HOST="$PROD_HOST"
	DEV_USER="$PROD_USER"
	DEV_SSH_PORT="$PROD_SSH_PORT"
	if [ "$SKIP_SSH" = "false" ]; then
		DEV_HOST="$(prompt_with_default 'Development VPS host (HOST)' "$PROD_HOST")"
		DEV_USER="$(prompt_with_default 'Development VPS SSH username (USERNAME)' "$PROD_USER")"
		DEV_SSH_PORT="$(prompt_with_default 'Development VPS SSH port (SSH_PORT)' "$PROD_SSH_PORT")"
	fi
	DEV_DB_NETWORK="$(prompt_with_default 'Development DB network (BACKEND_DB_NETWORK)' "$PROD_DB_NETWORK")"
	DEV_BACKEND_DOMAIN="$(prompt_with_default 'Development backend domain (BACKEND_DOMAIN)' 'api-dev.urf.buildstack.space')"
	DEV_TRAEFIK_ENABLE="$(prompt_with_default 'Development traefik enable (TRAEFIK_ENABLE)' 'false')"
	DEV_DATABASE_HOST="$(prompt_with_default 'Development DATABASE_HOST' "$PROD_DATABASE_HOST")"
	DEV_DATABASE_PORT="$(prompt_with_default 'Development DATABASE_PORT' "$PROD_DATABASE_PORT")"
	DEV_DATABASE_USERNAME="$(prompt_with_default 'Development DATABASE_USERNAME' "$PROD_DATABASE_USERNAME")"
	DEV_DATABASE_PASSWORD="$(prompt_required 'Development DATABASE_PASSWORD' true)"
	DEV_DATABASE_NAME="$(prompt_with_default 'Development DATABASE_NAME' "$PROD_DATABASE_NAME")"
	DEV_JWT_SECRET="$(prompt_required 'Development JWT_SECRET' true)"

	set_environment development
	if [ "$SKIP_SSH" = "false" ]; then
		set_secret development HOST "$DEV_HOST"
		set_secret development USERNAME "$DEV_USER"
		set_secret development SSH_PORT "$DEV_SSH_PORT"
		set_key_secret development "$KEY_FILE"
	fi
	set_secret development BACKEND_DB_NETWORK "$DEV_DB_NETWORK"
	set_secret development BACKEND_DOMAIN "$DEV_BACKEND_DOMAIN"
	set_secret development TRAEFIK_ENABLE "$DEV_TRAEFIK_ENABLE"
	set_secret development DATABASE_HOST "$DEV_DATABASE_HOST"
	set_secret development DATABASE_PORT "$DEV_DATABASE_PORT"
	set_secret development DATABASE_USERNAME "$DEV_DATABASE_USERNAME"
	set_secret development DATABASE_PASSWORD "$DEV_DATABASE_PASSWORD"
	set_secret development DATABASE_NAME "$DEV_DATABASE_NAME"
	set_secret development JWT_SECRET "$DEV_JWT_SECRET"
fi

echo
echo "Done. Environment secrets are configured."
echo "Verify with: gh secret list --repo $REPO --env production"
echo "and:         gh secret list --repo $REPO --env development"

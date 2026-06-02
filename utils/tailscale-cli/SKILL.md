---
name: tailscale-cli
description: Use the Tailscale CLI for device management, diagnostics, and configuration. Includes commands for connecting to tailnet, managing access, checking status, generating certificates, and troubleshooting network issues.
metadata:
  category: command-line
  feature: cli-tools
---

# Tailscale CLI Reference

The Tailscale CLI is your primary interface for managing your device within your Tailscale network (tailnet). Use it to connect, manage settings, diagnose issues, and perform administrative tasks.

## CLI Location

On Linux, the `tailscale` binary should be in your `$PATH`:

```bash
tailscale --version
```

On macOS, the CLI may need to be accessed via the full path or configured in PATH.

## Tab Completion

Enable tab completion for commands, flags, and arguments:

### Bash

```bash
tailscale completion bash | sudo tee /etc/bash_completion.d/tailscale
source ~/.bashrc
```

### Zsh

```bash
tailscale completion zsh | sudo tee /usr/share/zsh/site-functions/_tailscale
exec zsh
```

## Core Commands

### up

Connect your device to Tailscale and authenticate if needed.

```bash
tailscale up
```

**Common flags:**

- `--ssh`: Enable Tailscale SSH server on this device
- `--accept-routes`: Accept subnet routes advertised by other nodes
- `--advertise-exit-node`: Offer this device as an exit node
- `--advertise-routes=<ip>`: Expose physical subnet routes (e.g., `192.168.1.0/24`)
- `--exit-node=<ip|name>`: Use another device as an exit node for outbound traffic
- `--shields-up`: Block incoming connections from other tailnet devices
- `--force-reauth`: Force re-authentication
- `--stateful-filtering`: Enable stateful filtering for subnet routers and exit nodes

**Examples:**

```bash
# Connect with SSH enabled
tailscale up --ssh

# Accept routes and enable exit node
tailscale up --accept-routes --advertise-exit-node

# Use another device as exit node
tailscale up --exit-node="server.tailnet-name.ts.net"

# Shield your personal device
tailscale up --shields-up
```

### down

Disconnect from Tailscale.

```bash
tailscale down
```

**Flags:**

- `--accept-risk=<risk>`: Skip confirmation. Use `lose-ssh` to accept SSH loss warning, or `all` to accept all risks.
- `--reason="<message>"`: Specify reason for disconnecting (required if `AlwaysOn.OverrideWithReason` policy is enabled)

**Example:**

```bash
# Disconnect without confirmation
tailscale down --accept-risk=all
```

### status

Display the current status of your Tailscale connection.

```bash
tailscale status
```

Shows:
- Connection status (online/offline)
- Your Tailscale IP address
- Connected peers in your tailnet
- Relay server info
- Active capabilities (SSH, funnel, serve, etc.)

**Output example:**
```
Peer: device1
  IP: 100.1.2.3
  OS: linux

Peer: device2
  IP: 100.1.2.4
  OS: darwin

Peer: device3 (exit node)
  IP: 100.1.2.5
  OS: linux

Yourself: mydevice
  IP: 100.1.2.6
  Status: online
```

### ping

Check connectivity to another device in your tailnet.

```bash
tailscale ping device-name
```

Or use the Tailscale IP:

```bash
tailscale ping 100.1.2.3
```

### logout

Disconnect and log out your device from the tailnet.

```bash
tailscale logout
```

After logout, you'll need to authenticate again with `tailscale up` to reconnect.

## SSH Commands

### ssh

Execute SSH commands (requires `tailscale up --ssh` on both devices):

```bash
# SSH into a device
ssh user@device-name

# Run a command
ssh user@device-name "uname -a"

# Copy files with SCP
scp file.txt user@device-name:/tmp/
```

## DNS Commands

### dns

Manage DNS settings (Tailscale v1.74.0+).

```bash
# Check DNS status
tailscale dns status

# Show current DNS configuration
tailscale dns query google.com
```

## Certificate Commands

### cert

Generate Let's Encrypt certificates for HTTPS services.

```bash
# Generate certificate for your tailnet domain
tailscale cert
```

This creates `cert.pem` and `key.pem` files in the current directory.

**Flags:**

- `--cert-file=<path>`: Save certificate to custom path
- `--key-file=<path>`: Save private key to custom path
- `--serve-demo`: Serve a demo on port 443 using the certificate

**Example:**

```bash
# Generate and save to specific paths
tailscale cert --cert-file=./certs/cert.pem --key-file=./certs/key.pem

# Generate and serve a demo
tailscale cert --serve-demo
```

## Serve Commands

### serve

Share services, files, and directories over your tailnet.

```bash
# Serve a web service
tailscale serve https://localhost:8080

# Serve a directory
tailscale serve file /path/to/directory

# Check serve status
tailscale serve status

# Disable serving
tailscale serve off
```

## Funnel Commands

### funnel

Share local services with the public internet.

```bash
# Share a local service
tailscale funnel 8080

# Enable funnel (first time)
tailscale funnel

# Disable funnel
tailscale funnel off
```

## Network Commands

### netcheck

Check your network connectivity and NAT situation.

```bash
tailscale netcheck
```

Shows:
- External IP address
- NAT type (UPnP, PMP, PCP availability)
- Derp regions (relay server regions available)
- Latency to different regions

**Example output:**
```
NetCheck Report:
  IP: 203.0.113.42
  DERPs: 6/6 available
    sfo: 15.2ms, 15.1ms
    syd: 142.3ms, 141.7ms
```

### bugreport

Generate diagnostic information for troubleshooting.

```bash
tailscale bugreport
```

**Flags:**

- `--diagnose`: Include additional system information
- `--record`: Create two reports with a pause for reproducing issues

Use the generated ID when reporting issues to Tailscale support.

## Configuration Commands

### update

Update Tailscale to the latest version (if available).

```bash
tailscale update
```

### version

Display current Tailscale version.

```bash
tailscale version
```

### web

Open the Tailscale web UI in your browser.

```bash
tailscale web
```

The web UI is typically available at `http://localhost:8008`.

## Diagnostic Commands

### name

Show the machine name of your device.

```bash
tailscale name
```

### id

Display your device's unique identifier and tailnet information.

```bash
tailscale id
```

## Advanced: Using the Socket Flag

For systems with multiple Tailscale instances or custom socket locations:

```bash
tailscale --socket=/var/run/tailscale/tailscaled.sock status
```

## Common Workflows

### Connect to tailnet and enable SSH

```bash
tailscale up --ssh
```

### Set up as exit node

```bash
tailscale up --advertise-exit-node
```

Then on another device, route all traffic through it:

```bash
tailscale up --exit-node="exit-device"
```

### Share a web service

```bash
tailscale serve https://localhost:3000
```

### Share with public internet

```bash
tailscale funnel 8080
```

### Check connectivity to a peer

```bash
tailscale ping peer-device-name
```

### Generate certificate for HTTPS

```bash
tailscale cert
cp cert.pem key.pem ~/.local/share/myapp/
```

## Troubleshooting Commands

### Check status and connectivity

```bash
tailscale status
```

### Test network connectivity

```bash
tailscale netcheck
```

### Verify peer is reachable

```bash
tailscale ping device-name
```

### Generate diagnostic report

```bash
tailscale bugreport --diagnose
```

## Help and Documentation

View help for any command:

```bash
tailscale help
tailscale help up
tailscale help funnel
```

Or check online documentation at:
```
https://tailscale.com/docs/reference/tailscale-cli
```

## Tab Completion

After setting up tab completion, use:

```bash
tailscale <TAB>          # Complete command names
tailscale up <TAB>       # Complete flags
tailscale ping <TAB>     # Complete peer names
```

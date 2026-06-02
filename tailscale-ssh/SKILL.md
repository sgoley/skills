---
name: tailscale-ssh
description: Enable and manage Tailscale SSH for secure authentication and authorization of SSH connections. Use when setting up secure SSH access, enabling SSH servers on devices, managing user access to machines, or implementing check mode for high-risk connections in your tailnet.
compatibility: Requires Linux or macOS open-source tailscale variant. Tailscale v1.24 or later.
metadata:
  category: networking
  feature: tailscale-ssh
---

# Tailscale SSH

Tailscale SSH lets Tailscale manage the authentication and authorization of SSH connections in your tailnet, eliminating the need for managing SSH keys directly.

## Key Features

- **Automatic authentication**: Uses Tailscale for authentication instead of SSH keys
- **Access control integration**: Enforce SSH access using tailnet access control policies
- **Check mode**: Optionally require re-authentication for high-risk connections (e.g., root access)
- **Session recording**: Record SSH sessions for audit and compliance
- **No key management**: WireGuard keys are automatically generated and expire after session ends

## Prerequisites

Tailscale SSH server is available on:
- Linux devices
- macOS devices running the open-source `tailscale` + `tailscaled` CLI variant

Clients can connect from any device running Tailscale. Requires Tailscale v1.24 or later.

## Enable Tailscale SSH on a Device

To enable Tailscale SSH on a device and advertise it:

```bash
tailscale up --ssh
```

This enables the Tailscale SSH server on your device. Other devices in your tailnet can now SSH to this device if access control policies permit it.

## Connect via SSH

To SSH from one device to another in your tailnet using Tailscale SSH:

```bash
ssh user@device-name
```

Or using the Tailscale IP address:

```bash
ssh user@100.x.x.x
```

Your SSH client will use the Tailscale IP for the connection. Tailscale handles authentication automatically based on your identity in the tailnet.

## Access Control

Tailscale SSH respects your tailnet's access control policies (ACLs). To allow SSH access, ensure your ACL includes a rule permitting the source device/user to connect to the destination on port 22:

```acl
{
  "acls": [
    {
      "action": "accept",
      "src": ["group:developers"],
      "dst": ["group:production:22"]
    }
  ]
}
```

## Check Mode (Re-authentication)

For high-risk connections (like root access), enable check mode to require re-authentication before connecting:

```bash
tailscale up --ssh --check-mode
```

With check mode enabled, users must re-authenticate with their identity provider before establishing the SSH connection. After authentication, the user has access for the next 12 hours before needing to re-authenticate again.

## Verify SSH Server Status

Check if Tailscale SSH is enabled on your device:

```bash
tailscale status
```

Look for the SSH capability in the output. You should see an indication that SSH is running.

## SSH Key and Host Key Management

With Tailscale SSH:

- **Private SSH host keys** are stored locally on the device
- **Public SSH host keys** are distributed through the Tailscale control plane
- **Node keys** are used for authentication and encryption
- If a key is compromised, uninstall Tailscale and reinstall to generate new keys

## User Revocation

To revoke a user's SSH access:

1. Update your tailnet's access control policy to restrict the user
2. Save the policy
3. Within seconds, clients will receive the new rules and existing SSH connections will be terminated

You don't need to purge SSH keys like with traditional SSH—policy changes take effect immediately.

## Limitations

- Tailscale SSH server only works on Linux and macOS (open source variant)
- macOS App Store variant does not support Tailscale SSH server
- Your SSH config (`/etc/ssh/sshd_config`) and authorized_keys are not modified
- Other SSH connections not made over Tailscale will still work normally

## Common Use Cases

### Secure infrastructure access
Ensure all SSH traffic to production systems is routed through your encrypted tailnet without managing individual SSH keys.

### Reduce SSH key management overhead
Tailscale manages key generation and rotation automatically, eliminating manual key distribution.

### Compliance and audit requirements
Use session recording to maintain audit trails of who accessed what and when.

### Team onboarding and offboarding
Instantly grant or revoke SSH access through policy updates without touching SSH configuration files.

## Related Features

- **Access Controls**: Define policies that determine which users and devices can SSH
- **SSH Session Recording**: Record and audit SSH sessions
- **MagicDNS**: Use device names instead of IP addresses for SSH connections
- **Tailscale Serve**: Share services over your tailnet

## Troubleshooting

**"SSH connection refused"**: Check that:
- The destination device has Tailscale SSH enabled (`tailscale up --ssh`)
- Your access control policy permits the connection
- Both devices are connected to the same tailnet
- The destination is online

**"Unknown host" error**: Ensure MagicDNS is enabled in your tailnet or use the direct Tailscale IP address.

**Key-based SSH still works**: Tailscale SSH is available alongside traditional SSH on port 22. Your standard SSH configuration remains unchanged.

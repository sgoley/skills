---
name: tailscale-exit-nodes
description: Configure and use exit nodes to route all outbound traffic through another device in your tailnet. Use when you need to bypass local network restrictions, change your public IP address, or centralize internet traffic through a secure gateway.
metadata:
  category: networking
  feature: exit-nodes
---

# Tailscale Exit Nodes

An exit node allows a device to route all its internet traffic through another device in your Tailscale network (tailnet). This is useful for accessing geographically specific content, maintaining a consistent public IP, or centralizing network access through a trusted gateway.

## Key Features

- **Route all traffic**: Send all outbound internet traffic through an exit node
- **Bypass restrictions**: Access geographically restricted content or bypass local firewalls
- **Consistent IP**: Appear to come from the exit node's network
- **Central gateway**: Manage outbound traffic through a single, trusted device
- **Easy switching**: Change exit nodes with a single command
- **LAN access**: Maintain access to local network while using an exit node

## Prerequisites

- One device configured to **advertise** itself as an exit node
- Another device configured to **use** that exit node
- Both devices connected to the same tailnet
- Access control policies must permit exit node traffic

## Advertise as an Exit Node

On the device you want to act as an exit node (typically a server or always-on device):

```bash
tailscale up --advertise-exit-node
```

This device will now appear as an available exit node to other devices in your tailnet.

### Verify Exit Node Status

```bash
tailscale status
```

Look for indication that this device is advertising as an exit node.

## Use an Exit Node

On any device, use another device as an exit node:

```bash
tailscale up --exit-node="exit-device-name"
```

Or use the Tailscale IP:

```bash
tailscale up --exit-node="100.1.2.3"
```

Check status:

```bash
tailscale status
```

Your public IP will now appear to be from the exit node's network.

## Stop Using an Exit Node

To disable the exit node and return to normal routing:

```bash
tailscale up --exit-node=""
```

Or:

```bash
tailscale up --exit-node=
```

## Accessing Local Network While Using Exit Node

By default, using an exit node routes all traffic including local network access. To maintain access to your local network while using an exit node:

```bash
tailscale up --exit-node="exit-device" --exit-node-allow-lan-access
```

This allows you to:
- Access printers, file shares, and other local devices
- Route internet traffic through the exit node
- Still reach your local network seamlessly

## Common Exit Node Scenarios

### Access geographically restricted content

Set up an exit node in your office or data center location, then use it to access location-restricted services from remote locations.

### Consistent public IP

Route traffic through an always-on exit node to maintain a consistent public IP address:

```bash
tailscale up --exit-node="home-server"
```

### Bypass corporate firewall

If approved by your organization, route traffic through a home exit node to access external services when traveling.

### Centralized outbound proxy

Route all devices' internet traffic through a central exit node for:
- Monitoring and logging
- Content filtering
- DLP (Data Loss Prevention)
- Network policy enforcement

## Advanced: Stateful Filtering for Exit Nodes

Enable stateful filtering for more secure exit node behavior:

```bash
tailscale up --advertise-exit-node --stateful-filtering
```

Stateful filtering tracks outbound connections and only allows inbound packets that are responses to tracked outbound connections. This provides additional security for exit node traffic.

## Exit Node Traffic Flow

```
Device A
   │
   ├─ All outbound traffic
   │  (HTTP, HTTPS, DNS, etc.)
   │
   v
Encrypted WireGuard tunnel
   │
   v
Exit Node (Device B)
   │
   ├─ Decrypts traffic
   │
   ├─ Sends to internet
   │  (appears from Exit Node's IP)
   │
   v
Internet
```

Device A appears to originate from the exit node's network while all traffic remains encrypted through the Tailscale tunnel.

## Access Control for Exit Nodes

Use ACLs to control which devices can use exit nodes:

```json
{
  "acls": [
    {
      "action": "accept",
      "src": ["group:employees"],
      "dst": ["group:exit-nodes:0"]
    }
  ]
}
```

Restrict specific users or groups from using exit node capability.

## Finding Available Exit Nodes

```bash
tailscale status
```

Look for devices marked as exit nodes in the output. Exit nodes usually have specific indicators in their status.

## Performance Considerations

- Exit node traffic routes through your tailnet's relay servers or direct connections
- May add slight latency compared to direct internet access
- Bandwidth is dependent on the exit node's internet connection
- Multiple devices using the same exit node share its bandwidth

## Security Considerations

### Trust the exit node

The exit node can see all unencrypted traffic passing through it. Only use exit nodes you trust.

### Encryption end-to-end

Traffic is encrypted from your device to the exit node through WireGuard. Once decrypted at the exit node, internet traffic follows normal security practices (HTTPS, VPN, etc.).

### DNS leaks

If using an exit node, configure your DNS settings carefully to avoid DNS leaks:

```bash
tailscale up --exit-node="exit-device"
```

Use Tailscale DNS settings to ensure DNS queries also route through the exit node.

### Acceptable use

Exit nodes can access internet traffic flowing through them. Only use exit nodes for legitimate purposes and in accordance with your organization's policies.

## Troubleshooting

### "No exit nodes available"

**Cause**: No device is advertising as an exit node.

**Solution**:
- Ensure at least one device runs: `tailscale up --advertise-exit-node`
- Verify the exit node device is online: `tailscale status`
- Check ACLs don't block exit node capability

### "Exit node connection refused"

**Cause**: ACLs block the connection or exit node is misconfigured.

**Solution**:
- Verify ACLs permit exit node usage
- Confirm the exit node is still advertising: `tailscale status` on the exit node device
- Try disconnecting and reconnecting: `tailscale down && tailscale up --exit-node="exit-device"`

### "Cannot reach local network while using exit node"

**Cause**: Not using `--exit-node-allow-lan-access` flag.

**Solution**:
```bash
tailscale up --exit-node="exit-device" --exit-node-allow-lan-access
```

### "Traffic still shows local IP"

**Cause**: Exit node not properly activated or DNS still resolving differently.

**Solution**:
- Check: `tailscale status` confirms exit node is active
- Restart: `tailscale down && tailscale up --exit-node="exit-device"`
- Verify with: `curl ifconfig.me` (should show exit node's IP)

### "Slow internet through exit node"

**Cause**: Exit node has limited bandwidth or high latency.

**Solution**:
- Choose a different exit node closer to your location
- Check exit node's available bandwidth
- Reduce the number of concurrent connections through the exit node
- Use exit node only when needed

## Common Use Cases

### Remote worker accessing corporate network

An employee working from a coffee shop uses a home exit node to access corporate resources.

### Content streaming

A user in a restricted country uses an exit node in an unrestricted region to access streaming services.

### Testing from different locations

Developers test geolocation features by using exit nodes in different regions.

### Network isolation

A device uses an exit node to keep its traffic separate from corporate network for sensitive tasks.

### Centralized logging

Route all employee traffic through an exit node to log internet usage for compliance.

## Related Features

- **Subnet Routers**: Share your local network with the tailnet
- **Access Controls**: Define who can use exit nodes
- **Tailscale DNS**: Manage DNS while using exit nodes
- **MagicDNS**: Use device names to reference exit nodes

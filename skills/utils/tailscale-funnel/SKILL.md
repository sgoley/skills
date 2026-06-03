---
name: tailscale-funnel
description: Set up and manage Tailscale Funnel to share local services with the public internet through encrypted tunnels. Use when exposing web apps, services, or files to users outside your tailnet, or when you need public URLs for services on your private devices.
compatibility: Tailscale v1.38.3 or later. Requires MagicDNS and HTTPS certificates enabled. Works on Linux and macOS open-source variant.
metadata:
  category: networking
  feature: funnel-sharing
---

# Tailscale Funnel

Tailscale Funnel lets you share local services with the public internet through encrypted tunnels. Anyone can access your shared service via a public URL—they don't need Tailscale.

## Key Features

- **Public URL sharing**: Generate unique Funnel URLs for local services
- **End-to-end encryption**: TCP proxy encryption maintains data privacy
- **No IP exposure**: Your device IP remains hidden from the internet
- **Simple setup**: Just run a command—certificates are created automatically
- **User-friendly**: Share files, directories, or web services easily
- **No Tailscale required**: Public users don't need Tailscale to access the service

## Prerequisites

Before using Funnel, ensure:

1. **Tailscale v1.38.3 or later** is installed
2. **MagicDNS is enabled** in your tailnet
3. **HTTPS certificates are enabled** and valid
4. **Funnel permission** exists in your tailnet policy file (under `node attributes`)
5. **Supported platform**: Linux or macOS open-source variant (not iOS, Android, or macOS App Store variant)

### Check Prerequisites

```bash
tailscale status
```

Verify that you see "funnel" in the node capabilities.

## How Funnel Works

1. User requests your Funnel URL
2. DNS resolves to a Funnel relay server
3. Relay creates an encrypted TCP proxy to your device
4. Request passes through the proxy to your local service
5. Response travels back through the encrypted proxy
6. Relay forwards response to the user

Your device IP never reaches the internet—Funnel relay servers cannot decrypt the traffic.

## Enable Funnel

Enable Funnel for your tailnet using:

```bash
tailscale funnel
```

This triggers a web interface where you approve enabling Funnel. Tailscale will:
- Create HTTPS certificates for your tailnet
- Add a `funnel` node attribute to your policy file
- Grant users in `autogroup:member` permission to use Funnel (customizable)

## Share a Local Service

To share a service running on `localhost:8080`:

```bash
tailscale funnel 8080
```

Funnel will display a public URL like:
```
https://mydevice.tailnet-name.ts.net:443
```

Anyone with this URL can access the service through an encrypted tunnel.

### Share on a Custom Port

If your service runs on a different port:

```bash
tailscale funnel 3000
```

### Share a Specific Path

For HTTP services, share only specific paths:

```bash
tailscale funnel https://localhost:8080/api
```

### Share a File or Directory

Make files available via HTTP:

```bash
tailscale funnel file /path/to/file
```

Or share an entire directory:

```bash
tailscale funnel file /path/to/directory
```

## Available Funnel Ports

Funnel can only listen on:
- **443** (default HTTPS)
- **8443**
- **10000**

Choose the port that doesn't conflict with `tailscale serve`.

## Stop Sharing via Funnel

To disable Funnel on a port:

```bash
tailscale funnel off
```

Or disable on a specific port:

```bash
tailscale funnel 8080 off
```

## Access Control

By default, Tailscale grants `autogroup:member` permission to use Funnel. To restrict who can create Funnels, update your policy file:

```json
{
  "nodeAttrs": [
    {
      "target": ["group:backend"],
      "attr": "funnel"
    }
  ]
}
```

This restricts Funnel access to the `backend` group only.

## Troubleshooting

### "Funnel not enabled"

**Cause**: Funnel requires policy configuration.

**Solution**: Run `tailscale funnel` to enable it for your tailnet.

### "Certificate not found" or HTTPS error

**Cause**: HTTPS certificates not created or expired.

**Solution**:
1. Ensure HTTPS is enabled in your tailnet
2. Verify MagicDNS is enabled
3. Re-enable Funnel to generate new certificates

### "Port already in use" or "Funnel already active on this port"

**Cause**: Funnel or Serve is already using the port, or a local service is listening.

**Solution**:
- Stop the existing Funnel: `tailscale funnel off`
- Stop the local service on that port
- Use a different port: `tailscale funnel 8443`

### High latency or bandwidth limits

**Cause**: Funnel applies non-configurable bandwidth limits.

**Solution**:
- For local-only sharing, use `tailscale serve` instead
- Consider the traffic volume expected
- Review Funnel relay server status

### Users see "DNS not resolved"

**Cause**: Public DNS cannot resolve your Funnel URL (this is intentional security).

**Solution**:
- Only share Funnel URLs with intended recipients
- This is expected behavior—Funnel URLs only work via Funnel relay servers

## Limitations

- **DNS**: Funnel can only use `tailnet-name.ts.net` domain names
- **Ports**: Only ports 443, 8443, and 10000 are supported
- **TLS only**: Funnel only works over TLS/HTTPS
- **Platform**: Not available on iOS, Android, or macOS App Store variant
- **Bandwidth**: Subject to non-configurable rate limits
- **Exclusive**: Can't use the same port for both Serve and Funnel simultaneously
- **Certificate rate limits**: Frequent certificate requests may hit Let's Encrypt rate limits

## Funnel vs. Tailscale Serve

| Feature | Funnel | Serve |
|---------|--------|-------|
| Access | Public internet | Tailnet only |
| Requires Tailscale | Users don't need Tailscale | Recipients need Tailscale |
| Encryption | End-to-end encrypted | Encrypted within tailnet |
| Use case | Public sharing | Internal sharing |
| Ports | 443, 8443, 10000 | Any port |

For sharing only within your tailnet, use Tailscale Serve instead.

## Security Best Practices

1. **Limit access**: Use policy-based access control to restrict who can create Funnels
2. **Monitor usage**: Check which services are exposed
3. **Revoke when needed**: Disable Funnel on ports you're no longer sharing
4. **HTTPS only**: All Funnel traffic is encrypted—don't expose unencrypted services
5. **Rate limiting**: Be aware of bandwidth limits for high-traffic services

## Common Use Cases

### Temporary demo access
Share a local prototype with stakeholders without setting up a public server.

### Mobile app testing
Allow testers to access your local API during development.

### Webhook testing
Expose a local webhook receiver for external services.

### Quick file sharing
Share files directly from your laptop without uploading to a cloud service.

## Related Features

- **Tailscale Serve**: Share services within your tailnet only
- **MagicDNS**: Enable automatic device naming
- **HTTPS Certificates**: Set up TLS for your tailnet
- **Access Controls**: Define who can use Funnel

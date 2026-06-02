---
name: tailscale-dns
description: Configure and manage DNS settings in your Tailscale network, including MagicDNS, nameservers, search domains, and DNS splitting. Use when setting up DNS resolution, configuring private nameservers, managing domain routing, or checking DNS configuration.
metadata:
  category: networking
  feature: dns-management
---

# Tailscale DNS Management

Manage DNS for your Tailscale network (tailnet) to map Tailscale IP addresses to human-readable names using MagicDNS, custom nameservers, and split DNS configuration.

## Key Features

- **MagicDNS**: Automatic DNS naming for devices in your tailnet
- **Custom nameservers**: Use public DNS (Cloudflare, Google, Quad9) or private nameservers
- **Split DNS**: Route specific domains to different nameservers (split DNS)
- **Search domains**: Configure default search domains for easier DNS lookups
- **DoH encryption**: Automatic DNS-over-HTTPS when using public nameservers

## Prerequisites

- Clients must have "Use Tailscale DNS settings" enabled in preferences
- MagicDNS is optional—other DNS settings work without it

## MagicDNS

MagicDNS is enabled by default and automatically assigns DNS names to devices in your tailnet.

### How MagicDNS Works

Each device gets a DNS name based on its machine name. With MagicDNS enabled:

```
mydevice.tailnet-name.ts.net
```

This allows you to SSH and connect to devices by name instead of remembering IP addresses.

### Check MagicDNS Status

View your tailnet's MagicDNS configuration via the admin console at:
```
https://login.tailscale.com/admin/dns
```

### Enable/Disable MagicDNS

MagicDNS is enabled by default. To disable it or change settings, use the admin console DNS page.

## Nameservers

Configure which DNS servers devices use to resolve domain names.

### Global Nameservers

Global nameservers handle DNS queries for any domain. Common public options:

- **Cloudflare**: `1.1.1.1`, `1.0.0.1`
- **Google**: `8.8.8.8`, `8.8.4.4`
- **Quad9**: `9.9.9.9`, `149.112.112.112`

Example configuration for Cloudflare:
```
Global Nameserver: 1.1.1.1
```

### Restricted Nameservers (Split DNS)

A restricted nameserver only applies to DNS queries matching a specific domain. Useful for routing corporate domain traffic to an internal DNS server.

Example: Route `example.com` to internal DNS
```
Domain: example.com
Nameserver: 10.0.0.1
```

When configured this way, only DNS queries for `*.example.com` use the internal nameserver `10.0.0.1`. All other queries use your global nameservers.

## Check Current DNS Settings

### Using the CLI

Check your local DNS configuration:
```bash
tailscale dns status
```

This shows:
- Current nameservers
- Search domains
- MagicDNS status
- Any split DNS rules

### View Full Tailnet DNS Settings

Access the admin console at:
```
https://login.tailscale.com/admin/dns
```

This shows all DNS settings for your entire tailnet.

## DNS Configuration Examples

### Basic Configuration (Default)

- MagicDNS: Enabled
- Global Nameserver: `1.1.1.1` (Cloudflare)
- Search Domain: `tailnet-name.ts.net`

Devices can resolve each other by machine name automatically.

### Split DNS with Private Network

```
MagicDNS: Enabled
Global Nameserver: 1.1.1.1 (Cloudflare)
Restricted Nameservers:
  - Domain: corp.example.com → 10.0.0.1 (internal DNS)
  - Domain: internal.example.com → 10.0.0.1
```

With this setup:
- `mail.corp.example.com` queries go to `10.0.0.1`
- `mydevice.tailnet-name.ts.net` resolves via MagicDNS
- All other domains use Cloudflare DNS

### Multiple Global Nameservers (Redundancy)

For reliability, configure more than one global nameserver:
```
Global Nameserver 1: 1.1.1.1 (Cloudflare)
Global Nameserver 2: 8.8.8.8 (Google)
```

## Search Domains

Search domains are used to complete short domain names. For example, if search domain is set to `corp.example.com`, you can use `hostname` instead of `hostname.corp.example.com`.

Default search domain is your tailnet's domain (`tailnet-name.ts.net`).

## DNS-over-HTTPS (DoH)

When using public global nameservers, Tailscale automatically encrypts DNS queries using DNS-over-HTTPS (DoH). This ensures:
- DNS queries are encrypted in transit
- Your DNS activity is private from ISPs and network observers
- No additional configuration needed

## Common Issues

### Devices Can't Resolve Each Other

**Cause**: MagicDNS not enabled or DNS settings not applied to clients.

**Solution**:
1. Enable "Use Tailscale DNS settings" on the client
2. Verify MagicDNS is enabled in admin console
3. Restart Tailscale client on the device

### Internal Domain Not Resolving

**Cause**: Split DNS not configured correctly.

**Solution**:
1. Verify the restricted nameserver is correct in the DNS settings
2. Ensure the domain pattern matches (e.g., `*.example.com` includes subdomains)
3. Verify the internal DNS server is reachable from your tailnet
4. Test DNS resolution: `nslookup hostname.corp.example.com`

### DNS Queries Are Slow

**Cause**: Nameserver is unreachable or unresponsive.

**Solution**:
1. Switch to a faster public nameserver (Cloudflare `1.1.1.1` is typically fast)
2. Use redundant nameservers for fallback
3. Check network connectivity to the nameserver

## Best Practices

1. **Use at least two global nameservers** for redundancy
2. **Test split DNS patterns** before applying to production
3. **Use MagicDNS** for easier device-to-device communication
4. **Monitor DNS resolution** if you notice slowness or failures
5. **Document your DNS setup** for your tailnet team

## Related Features

- **MagicDNS**: Automatic device naming within your tailnet
- **Tailscale Serve**: Serve content over your tailnet using DNS names
- **Access Controls**: Combine with DNS for fine-grained access
- **Exit Nodes**: Route all traffic through an exit node with tailnet DNS

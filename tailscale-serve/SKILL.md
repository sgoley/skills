---
name: tailscale-serve
description: Use Tailscale Serve to share files, directories, and local services over your tailnet using HTTP. Use when you want internal team members to access local resources by name without exposing to the public internet.
metadata:
  category: networking
  feature: serve-internal
---

# Tailscale Serve

Tailscale Serve lets you share files, directories, and web services over your tailnet using simple HTTP URLs. Unlike Funnel which exposes to the public internet, Serve keeps everything within your private tailnet.

## Key Features

- **File and directory sharing**: Serve static files and folders directly
- **Web service proxying**: Forward HTTP requests to local services
- **Automatic routing**: MagicDNS names make sharing easy
- **Local-only access**: Only accessible from devices in your tailnet
- **Simple setup**: Just run a command
- **Flexible ports**: Use any port (unlike Funnel's limitation to 443, 8443, 10000)

## Comparison: Serve vs. Funnel

| Feature | Serve | Funnel |
|---------|-------|--------|
| Access | Tailnet only | Public internet |
| Requires Tailscale | Yes, on recipients | No, uses public URL |
| Encryption | Within tailnet | End-to-end encrypted |
| Ports available | Any port | 443, 8443, 10000 only |
| Setup | Simple commands | Requires policy setup |
| Use case | Internal sharing | Public sharing |

## Prerequisites

- Tailscale connected (`tailscale up`)
- Local service running on localhost (for proxying)
- Access control policies permit the connection (if using ACLs)

## Share a Web Service

To share a local web service on port 3000:

```bash
tailscale serve https://localhost:3000
```

Other devices in your tailnet can now access the service:

```
https://mydevice.tailnet-name.ts.net:3000
```

### Serve on Different Ports

```bash
# Share service on port 8080
tailscale serve https://localhost:8080

# Share on port 5000
tailscale serve https://localhost:5000

# Share on any port
tailscale serve https://localhost:<port>
```

### Use HTTP (Unencrypted Locally)

If your local service uses HTTP instead of HTTPS:

```bash
tailscale serve http://localhost:8080
```

Note: The connection is still encrypted over your tailnet's WireGuard tunnel.

## Share Files and Directories

Share a single file:

```bash
tailscale serve file /path/to/document.pdf
```

Share an entire directory:

```bash
tailscale serve file /path/to/directory
```

Share multiple files by serving a directory:

```bash
# Share entire directory with browse-ability
tailscale serve file /home/user/shared-files
```

## Check Serve Status

View what you're currently serving:

```bash
tailscale serve status
```

Output shows:
- Ports and services being served
- Local paths for file sharing
- Access URLs

Example:

```
Serve status:

3000: https://localhost:3000
  https://mydevice.tailnet-name.ts.net:3000

/path/to/files:
  https://mydevice.tailnet-name.ts.net:3000/files
```

## Stop Serving

Stop sharing on a specific port:

```bash
tailscale serve off https://localhost:3000
```

Stop all serving:

```bash
tailscale serve off
```

## Access Shared Services

From another device in your tailnet:

```bash
# Access via device name and port
https://mydevice.tailnet-name.ts.net:3000

# Or using the Tailscale IP
https://100.1.2.3:3000
```

Use your browser or CLI tools:

```bash
curl https://mydevice.tailnet-name.ts.net:3000/api/users

wget https://mydevice.tailnet-name.ts.net:3000/file.zip
```

## Advanced: Path-Based Routing

You can serve multiple services on different paths of the same port (with appropriate configuration of your local reverse proxy or by serving a directory with subdirectories).

Example: Directory structure

```
shared/
├── app1/
├── app2/
└── files/
```

Serve the directory:

```bash
tailscale serve file ./shared
```

Access different parts:

```
https://mydevice:3000/app1/
https://mydevice:3000/app2/
https://mydevice:3000/files/
```

## Security Considerations

### Access Control

Your tailnet's ACLs determine who can access served content. Ensure your access control policy permits access:

```json
{
  "acls": [
    {
      "action": "accept",
      "src": ["group:developers"],
      "dst": ["group:team-servers"]
    }
  ]
}
```

### HTTPS Certificates

Serve uses auto-generated HTTPS certificates. Your browser may show warnings about self-signed certificates on first access—this is normal for internal-only services.

### Sensitive Data

- Serve is designed for internal sharing only
- Don't serve sensitive production data on open services
- Use Tailscale access controls to restrict who can access served content

## Common Use Cases

### Share development server

Developers can access local development servers by name:

```bash
tailscale serve https://localhost:3000  # Development frontend
tailscale serve https://localhost:5000  # Development API
```

### Team file sharing

Share project files or documents:

```bash
tailscale serve file /opt/project-docs
```

### Internal dashboards

Share monitoring dashboards accessible only to your team:

```bash
tailscale serve https://localhost:9090  # Prometheus
```

### Documentation server

Share local API documentation:

```bash
tailscale serve https://localhost:8000
```

### Testing and staging

Testers access local staging environments:

```bash
tailscale serve https://localhost:3000  # Staging app
```

## Troubleshooting

### "Port already in use"

**Cause**: Another service is using the port.

**Solution**:
- Check what's using the port: `lsof -i :8080`
- Use a different port: `tailscale serve https://localhost:9000`
- Stop the conflicting service

### "Cannot connect to served service"

**Cause**: ACL blocking access or local service not running.

**Solution**:
- Verify local service is running: `curl http://localhost:3000` (from the same machine)
- Check ACLs permit the connection
- Verify both devices are in the same tailnet: `tailscale status`
- Try connecting with the Tailscale IP instead of device name

### "SSL certificate error" in browser

**Cause**: Browser doesn't trust the auto-generated HTTPS certificate.

**Solution**:
- This is normal—click "Continue anyway" or "Advanced" in your browser
- Alternatively, use `curl` with `-k` flag: `curl -k https://mydevice:3000`
- Not a security issue for internal-only services

### Mixed HTTP/HTTPS issues

**Cause**: Served content references insecure URLs.

**Solution**:
- Ensure your local application generates HTTPS URLs
- Use relative URLs in your application code

## Advanced: Combining Serve and Funnel

You can serve services over your tailnet with Serve, then selectively expose specific services to the public with Funnel:

```bash
# Internal access only (Serve)
tailscale serve https://localhost:8000

# Also expose to public via Funnel on different port
tailscale funnel 8443
```

Just remember—only ports 443, 8443, and 10000 work with Funnel.

## Related Features

- **Tailscale Funnel**: Share with public internet
- **MagicDNS**: Use friendly device names
- **Access Controls**: Restrict who can access services
- **Tailscale Cert**: Generate HTTPS certificates

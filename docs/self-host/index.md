---
sidebar_position: 1
---

# Self-hosting KleckRelay

At the moment it's a bit difficult to self-host KleckRelay, but we're working on it.

However, if you are keen on self-hosting KleckRelay, you can do so by following the instructions below.

## Hosting the Server (Backend)

The easiest way to self-host KleckRelay is to use the Docker image.
You will need to use a server that supports port 25, 443 and we strongly recommend you having a static IP address.

:::tip
We recommend using [Incognet](https://incognet.io/) as a VPS provider.
They offer cheap VPS, static IPs, allow port 25 and allow you to pay in crypto.

**We are not sponsored by Incognet in anyway. We just like them.**
:::

KleckRelay should not be exposed to the internet directly, but instead you should use a reverse proxy such as 
Nginx or Caddy.

:::tip
We recommend using [bunkerweb](https://github.com/bunkerity/bunkerweb) as a reverse proxy.
You can use our [tool](#tool) to generate a configuration for bunkerweb.
:::

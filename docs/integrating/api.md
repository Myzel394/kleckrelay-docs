---
sidebar_position: 2
---

# Accessing the API

## Documentation

KleckRelay uses FastAPI under the hood, which means that documentation for the API is automatically generated.

The API documentation is available at [https://api.kleckrelay.com/docs](https://api.kleckrelay.com/docs).

## Versioning

KleckRelay uses simple versioning for the API.
This means that the API version is included in the URL.
A change in the number indicates a breaking change.

For example, the API version 1 is available at `https://api.kleckrelay.com/v1/`.

## Authorization

While JWT authentication is used for the website, you will need to use API keys for the API.

To access the API, you will need to include the API key in the `Authorization` header.
The API key must be prefixed with `Api-Key `.

### Example

```bash
curl -X GET "https://api.kleckrelay.com/v1/alias" \
  -H "accept: application/json" \
  -H "Authorization: Api-Key <API_KEY>"
```

## Errors

### 401

You are not authenticated.

This could be either because you did not include an API key, or because the API key is invalid, 
or because the API key does not have the required permissions.

### 424

You have 2FA enabled, but did not include a 2FA token.

:::info
This error only occurs when you have 2FA enabled on your account, and you are accessing the API via JWT.
:::

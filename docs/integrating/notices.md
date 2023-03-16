---
sidebar_position: 1
---

# Notices for integrating KleckRelay

KleckRelay uses internally their rest API to communicate with the server.
To access it, you will need your users to ask to generate an API key for them.

At KleckRelay we want to store as little data as possible, everything else is encrypted.
This means that you also need to ask your user for their password to access encrypted data,
and decrypt & encrypt everything on your site. This ensures full privacy for your users.

## Generating a new API key

You can direct your users to the API key generation page and autofill the scopes and label field.
The page is located at [https://app.kleckrelay.com/settings/api-keys](https://app.kleckrelay.com/settings/api-keys).

You will need to specify these query parameters:

| key | value | description                                                  |
| --- | ----- |--------------------------------------------------------------|
| `action` | `create-new` | This must be set to `create-new` to show the creation dialog |
| `label` | Optional | The label for the API key. This will be shown to the user.   |
| `scopes` | See [API scopes](#api-scopes) | The scopes for the API key. |

### Examples

* Alias read access: `https://app.kleckrelay.com/settings/api-keys?action=create-new&label=My%20website&scopes=read:alias`
* Alias read & write access: `https://app.kleckrelay.com/settings/api-keys?action=create-new&label=My%20website&scopes=read:alias,write:alias`
* Alias read & write access, and read access to reports: `https://app.kleckrelay.com/settings/api-keys?action=create-new&label=My%20website&scopes=read:alias,write:alias,read:report`


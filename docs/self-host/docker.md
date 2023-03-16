---
sidebar_position: 1
---

KleckRelay requires a total of 3 services to run (this will probably change in future):

1. The database (a PostgreSQL database)
2. The server (the backend)
3. The maid (a cron job that cleans up content)

:::info
This guide assumes you are using Docker and Docker Compose.
:::

### Creating docker-compose.yml

We will use a separate `.env` file to store sensitive information. This will be shared by multiple services.
Here's an example, you will need to change at least the passwords and the domain name:

```bash
# The domain of the API
API_DOMAIN=api.app.krl
# The domain of the app (that's the actual website)
APP_DOMAIN=app.krl
# The domain where you will receive emails
MAIL_DOMAIN=mail.app.krl
# A randomly generated string, this is used to generate all kind of tokens
KLECK_SECRET=secret_change_me
# The URL of the database
DB_URI=postgresql://user:PASSWORD_1@kleckrelay_database/mail
# A private key used to sign content
SERVER_PRIVATE_KEY=LS0tLS1CRUdJTiBQR1AgUFJJVkFURSBLRVkgQkxPQ0stLS0tLQpWZXJzaW9uOiBPcGVuUEdQLmpzIHY0LjEwLjEwCkNvbW1lbnQ6IGh0dHBzOi8vb3BlbnBncGpzLm9yZwoKeGNMWUJHUEcyRmdCQ0FEVUVKVVpIYWtlS2ZxTEF6UU9tVTBBK1NuWFI2bUttbEttT2YwUzZDZVBka0VVCmtNUXJLUkFHOGxpT3FIU00ydGcyMW95T2xBQnFRSlJXSlhuSHBBcDMxVWRHTG1BQ3VVT3lVc3poYy83VgpYc1RTdWtCKzlIQ2dvQTFrTjJqbFVBK24xSGduOVRBdlV0bEhMMjZIYXNrcE95YlhTYWFFMUJVYVJRWngKNjRqd2J2ckU2RlV1Y0t4MmxUaG5KdGpyOHJyMEgwUkdYRFVSc21Zamc0ZEp3MFcrU2w1aVpYKzJZUzI2CityOTk1RDNwY2pienVxemZ0OW9QRnNwekNKS2pUdGJyUkpYRXg4bHNrR2J4ZUpaQVlzL2NDd1Bab05IRwo1eE1VR3dKNW9PZFl0dlB2VlBURnBwelU0QWMrTVdreHppTEE2TnJ4ZlYvcS9DVGFBQ2ozM3BmYkFCRUIKQUFFQUIvNHpFTmt1aHA5eVpZNXhDakR2Y1FnRGUzeVJYQzdkOHdLREI4VEMyRWVxZXNINk4xQWR5cElTCjhpblVGSW1ZWDV5Z08vTDE1SHJqR3pEOU82SURLcVBncm1tdTR6ejRldTlyMGhlSEZOMGhPV1J4RUN1Mgp4cHNXZXVRdXBVOHJwU2RYOVVpSDZybVRNOEtocXpEVkNDaHZ0dEJJR0hLeVdyWElNU1gzcWMyOGc3VEYKSW91dk1SeDdpV3F4ZmdtMUtXbWlpRm9mRFJFWkFsTDhXQU5zZUhmUkNCWkdqT0srdFZJVTJlM2dubHJZCnJRUm12U1k3ak0yMzJFOHFiMWZmQTk1SVlvTk51U2RFNzhkdllBaTEycWk1dHVLNTh5TTJNK1ByVVJnRwprN2NYdmxqcVVjTDVhK0l1UE9iWDN3aHdOcDJpMDhMMC85NjRjSkFwZk41Q1ZwNlZCQURvbGMwN3Vlb0gKZHd3cDhFaC9HRkt1UlRNL1dkQTZxRmZtczZrSTdjZG5STFVHTlhQaGZ5Q2c0Nk84VEZjUDhLQ01hNjhaCmhzV0ZBcHhhdkxpLzBEMkliSE1QTkwra3F0SFRCRmtkNFA1ZHA5a2lMTlh6UmtLdFE4akNQamk1M2w5bgp0SkJuTVhkY2NDRjQxZHNvWlFDRVBjdklkeUVZMk5Zc2oyRlZOUHFtM3dRQTZXbnRsOGJGdkQzQk1nb2oKMlVpMzQrK0taVVg1RndBd3pPcVQxQXFxeC9XZmNnbmV5Y1RqcTB0WEFDcmZYK2E3OWVKbDlsNVc5VVpDClJ2dnJFUkdiRm1HS3Uxb01HZ3lVNkNWYStDalZXTHoyLzVUL2FIWUlHZkU4QzlOZHhNOG1LcmdpQ29HRwpKZ29wZXFsYTFLZThjMzVjd05iQzFhdFcvVndoalczMDJvVUVBSldXRVg2VzYwV28vd2J3Szd1c1k5c2kKQjVkTjlWblpwSEF6Y0tZaGwwRGZaVUFRWlhwWnAzWHhHNmkzUkJobjFDQ25Yakh4cnBycVZrSUtxT3Q2CjFTOEJSRk1scFdRZ1JYVkU2Z2ZJMGY3SWZJZ01KLzVFK09kNW5JTUtncnB5c0xodjZ5alVEeGo5YksyWgpzeEF1M0FXNW8rUGprdlEyWmNQTUNsbUJXUzIzUXpUTkVXRWdQR0ZBWlhoaGJYQnNaUzVqYjIwK3dzQ04KQkJBQkNBQWdCUUpqeHRoWUJnc0pCd2dEQWdRVkNBb0NCQllDQVFBQ0dRRUNHd01DSGdFQUlRa1FENi9mCkpjb3djS2tXSVFUbXN0UWxSdm12SnRUa3hlTVByOThseWpCd3Flay9DQURRSDlNeUEzdWRuWGhWdm1DbAowa2E2aXRaWXA1R0lya2gvQmFHdWYva3MrVk55amZ6cm9jbUlnYmkvOWZPM3BWbzMwV3JWdlErb2xZV2IKYXIzc005SitGZUxiZ251Rm1HM2xtbGlZdU5RWlFZWEd4SWNtVXdQVDlDVXNKRGQ1YlV6bk9reXRNNmoxCmRkZWM2ODZEMm5IVktvbi9pRks0T3FsbUFSdHhrOW1SaTB3OUpDWTl0V0RrZ205R29GTzFROFNrZjRRNwo3U0syakplcktNUTNHSnplVXl0dEhXNEhLRUZZb1JRR3J2eGJ4UERQMXRLaXpaYS9GTlJCUEJJVHo0UWkKemdvdjRCZDRTZW1Tc0cyTVRDUVdFeUxaRUd6MVpMM0szd2xwbDFhb1JVVnpFRUhtYmJhVXBCclQyUzl5CnJqRHI0ZU03VHEwb29oRFlNMnZPYUhSQng4TFlCR1BHMkZnQkNBQ3d6TEs2eDdYbHRXOUFyUnVjeXBmNgpLTk1lWFNaR2tQcVc5VHVUMk9BZDl6K0hLVUYvYk45M0VuS1pSRTJaU3hPaEN6amtxT2hUbmVkMkp2dWcKNnc1R3N4VHZxVjBXYW9EV2hNU1A5MWd2Q1I3ajcvTURqQkFZSFI1YmREWGZzazljUVZTWDgwRE8zTEloCldPWm85amVOZ1NkMlRuUnREalZ1cXFod1VyZERQcHRTM0Jzb2E5VG1GNHNTN3pOdTNGVDZ1amNuUDd6TgpjbHZmcTBLZ0E5Z0s2b21VUDVNcWR6OTY3ci9BMnZ0cld0R3FicEJwaEZlbnZuNVNqMlV4eG1TYWRhQysKSnNUNGhWN0pncGZVclV6cE1XbkJQeEVLWjIrTGM1WFNaekxFenhjZ2cyMWxWVXJnTTdBZVpEaHNBMHVSCnc4WVVJbG4rWXZWVTk1TnJTaDNsQUJFQkFBRUFCLzBjZDFqdnFlZ25yQ2JWaXdtL0hQK0xUN2R1VkNFdAppM3BOZy82cnQyZWVhNGpYQWxXQlpzNDBKY3c5MFRtTlRRRkVGTUo4VHBYWm9McjcweHNBdGRmK21pYnMKejZBbFU5Q2F1WlhNZUU3Q2cvMXRSZDBpM1JKYVQ1WHJzN0pZNmlUTS9kZlkvMW1YOVFEWlRhOExoMWs2CmQya2JLMWFqbUg0UjYzaGpYVzRVYldONzBVbTkrY0tPSjhQRENxWGFlWXExdmllTGRnN3ZRZWEyc3dzWQpOaFJDU3E1OG1ubmh2ZnR5RWhwdkVpbGRROFhsL1RIVXZ3ZjM5TElHTXNhQjZCNlN3RnJtemhsTXJFNXAKTm1YVnQ0by83MmtGNEdQYlVVa0JtL2ZCWU4zdkhacXBwcFNZVlg5Y08wUHNaQW5IZGJ3aXFRUlBaamd1Cm1KK1VhMzl4WVdHaEJBREhEWXFSVkwrOHFLODhwUm43WjA5cFNGaHZ0ZEtJWU1xcGJ0ZkVFMGRTTnNGVwoybXVRTkMxTjk4aUJMdDFWTVpkbFgvZDNyeEdoSFFhWDRWTzJadkdXMUowRzdaZTk3TWNLcmVYcG16ZkQKdlpPM0VDMytGQWpZRG9oeEs4UlBKTEd2QjNBakwrcm9iTldsUlQ4YWt4UmVsZ0hPc1F4ZHNiMzhTUUR5Clh6Y21rd1FBNDJGWVkvOXphSmY5VVhkaHR6blZZaHRjbXNPVlVwS3MvSkV5S2p5K2pKemZPM29rKzN3RQpoMWlDaFRCeXJFR1lwYktkVmdNMXA5RGRUNUVrRll0bCtBT1hjZHB1em4vZGdHdDFmNHM3c3Vsa2ExVnMKY2x6cW5nUkZLb216eXBhMmYyZ0owbnZSYzY2eHNKczdleDQ3NUF1OTZsK0g3S2ZZY3pMbWJSdVV2S2NECi9qa05QYjdWdTJFak5GaWs1eHBsckUvalFMU3VXSGQzOFNNeTN3blRHeDJ3WFlmUERIa1llUDJZZ1NqcQpxd1dod21jRWdSMFBYY3N6RGFZMGhlTnFlWU1xQkZpMkNsaCtSQVNKQ1Y3aDFlNER5cnE4cGFIR01ZRGkKc0srcmJsL2pMa2x6ZFBNU2tuck54QUp6UXN6OEZjekpWaEcwRTNSMjRJUll4NWZkb3Rmc1FjN0N3SFlFCkdBRUlBQWtGQW1QRzJGZ0NHd3dBSVFrUUQ2L2ZKY293Y0trV0lRVG1zdFFsUnZtdkp0VGt4ZU1Qcjk4bAp5akJ3cVdkTUIvOVNKZGt5am9PVEdNVFRhOUJaNk0vOCt6RzFIS2FNRTVjQyt4b3F4OG5MUUpBTy9KV0oKMDB4SDkxcW03N0F0WnhyMUpIK2x0c2RrRERoUXMrZHdISWpVV1haTjd3SnNwREV6NGY2c2tRRWVySzVXCmhtSzJhdGdDMkQxRmVidnJuQjBMS2xDY2o4ZDQzZzREamxuaEVHNkFIenYwUWxBRHI1VlNGRTdkaSs5TgpBcHV6WDFxVWdXbUxxSHVMY3hUQkJtYUo4S09mTWhwNWdCVE9aU2w3elc5RTU3T3NHblVHRERPVWg2VDIKTFEzNGt4Wi93ZEt1ZzQrYWRGRFphODZVRk5KL0duR1BVak9kbkNYZXZHVzVieXU0RHhmalI1Zk93TENDCmJxVWFHeGgwd2cvL0x1Wkh3T0NidHFkb0YvRFNFeDFVU2pzY1l4WUllcE91QW94OUhiWDUKPWd3d0EKLS0tLS1FTkQgUEdQIFBSSVZBVEUgS0VZIEJMT0NLLS0tLS0K
# A private key for DKIM (used for signing emails), reduces your spam score
DKIM_PRIVATE_KEY=LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlDV3dJQkFBS0JnUUMvV3V5SWovWDAvMk1sdmVQQlVhai9KQXVIQzNCdlpwUWUrS1ZPTDBwdEF3RzZndm1kCkV6dmljL00zRGsxVzJtR3NLaFVpY0lSMHd1MVlpZEVCcGdWa0FFU2MxSE95TjAwbDJDbmhxQTZ2TU1Md0xlVkoKYVVDRmEwOU4xMUQ3TWVHbFdrdStXY1hNTEMva1B0TW5KNmo2YUZhbVFCbEZJdHJTSnk1dnN4VVV1UUlEQVFBQgpBb0dBUE5FTURoY2JCOFBIWWk1bzNYOHpvK3R6MG5iYlJEeW81UE1IcnNLdTk5aVZ5dzVuZ1BtazljTCtVTWcxCjRsM0QzekQ4eUpaVU1ydmxMVmVYMnR0R0tNYUlyRHBIQXd6N0NWYk0zK0ZsZzVYZy9McE1GRVJWNllUQkVkSysKQ01YNXJ1aUFVYnE5TDZ2Rk5WYkZVQkZxbWQ2UXY5YUl1Vm5vck1jaUhGQUZzeVVDUVFEaUUxSUJUbzgwT0VyaQpubHByN1I0R3grSEtwb054SWloejVDZ0NvSytDUWMxbzZCMmppaU1GYjRvdFNSOEpwUzhhbk05TG9ySStOa2NuCnJ6Z0Y0bG4vQWtFQTJLOFd6S285VFRlUFZsNE9uOVBIeEI4dTEvSklRWjBxcHkyMlpRZmNDZHNsbXN5bDB2SGcKSUtnZ05HKzFFc0svdjVwRnhvQjdQUUx6V09NMVBjdmhSd0pBSzljOVR0MlNMYmxBNUdONiszVDNIcStDWE04ZgpyRC9JZ25qYlBXODF1ZGZTNHFZb29UODNmV1ZjOFYwOXRKd2czMU5MYThwNE1GSk1TQ2pWZjJhZXR3SkFGQlE5CmY1K3k2SW5pZlhWZjA0MnpjRWdYZGlsY2FzQWVxTGxDc3FBRTB1RDgzaGhpc1daNmgyd3M5ODcyTDVQZVl1bnYKMTFJbW1XUEJteFlLNC93Vmx3SkFibDd1dUlJWDdmbFRuYTRlUHA0VWVoK3o2R0x1OFVsM1RQQU00MHl6MjVKSwpjUnFJZzZXRTRpRkF4U2h0MnpYemRrODg1T1lQRVJobGppL3RzeHp0Wnc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=
# Whether admins should be able to change global settings through the web interface (we recommend to keep this enabled)
USE_GLOBAL_SETTINGS=yes
# A comma-separated list of admins (email addresses)
ADMINS=marvin@kleckrelay.example,sarah@kleckrelay.example
```

Here's an example `docker-compose.yml` file, you will need to change at least the passwords and the domain name.
This file assumes that you have these folders in the same directory as the `docker-compose.yml` file:

* `db` - To store database data
* `tutorial` - To store tutorial files (used to explain how to set up your DNS records)
* `opendkim_keys` - To store DKIM keys
* `certs` - To store SSL certificates
* `letsencrypt` - To store Let's Encrypt certificates

```yaml
version: '3'

services:
  kleckrelay_database:
    image: 'postgres:latest'
    container_name: kleckrelay_database
    restart: on-failure:5

    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: PASSWORD_1
      POSTGRES_DB: mail

    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mail"]
      interval: 5s
      timeout: 5s
      retries: 5

    volumes:
      - ./db:/var/lib/postgresql/data

    ports:
      - "35432:5432"

  kleckrelay_server:
    image: myzel394/kleckrelay-server
    container_name: kleckrelay_server
    restart: on-failure:5

    depends_on:
      kleckrelay_database:
        condition: service_healthy

    cap_add:
      - NET_BIND_SERVICE
      - SYS_PTRACE

    ports:
      - "25:25"
      - "587:587"

    volumes:
      - ./tutorial:/tutorial
      - ./opendkim_keys:/etc/opendkim/keys
      - ./certs:/etc/ssl/certs

    env_file:
      - .env

 kleckrelay_maid:
    image: myzel394/kleckrelay-maid
    container_name: kleckrelay_maid
    restart: on-failure

    depends_on:
      kleckrelay_database:
        condition: service_healthy

    env_file:
      - .env

  nginx:
    container_name: nginx
    image: bunkerity/bunkerweb
    restart: on-failure:5
    ports:
      - 80:8080
      - 443:8443
    volumes:
      # Change to your own path where you would like to store your HTTPS certificates and
      #uncomment the line
      - ./letsencrypt:/etc/letsencrypt
    environment:
      - MULTISITE=yes
      # Specify your domains here (including subdomains)
      - SERVER_NAME=api.kleckrelay.com
      - USE_REVERSE_PROXY=yes
      - DISABLE_DEFAULT_SERVER=yes
      - AUTO_LETS_ENCRYPT=yes
      # If you want to receive a notification when your certificates are not automatically
      # renewed and will expire soon, enter an email here
      # - EMAIL_LETS_ENCRYPT=
      - USE_BAD_BEHAVIOR=no

      - api.kleckrelay.com_REVERSE_PROXY_URL=/
      - api.kleckrelay.com_REVERSE_PROXY_HOST=http://kleckrelay_server:80
      - api.kleckrelay.com_ALLOWED_METHODS=GET|POST|PUT|PATCH|DELETE|OPTIONS
      # Security is too strict
      - api.kleckrelay.com_BLOCK_ABUSERS=no

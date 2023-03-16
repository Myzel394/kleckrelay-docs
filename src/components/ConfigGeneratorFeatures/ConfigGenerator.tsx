import React, {ReactElement, useState} from "react";
import * as openpgp from "openpgp/lightweight";
import cryptoRandomString from "crypto-random-string";

export default function ConfigGenerator(): ReactElement {
  const [domain, setDomain] = useState<string>("");
  const [mailDomain, setMailDomain] = useState<string>("");
  const [apiDomain, setApiDomain] = useState<string>("");
  const [admins, setAdmins] = useState<string[]>([]);
  const [tempAdminValue, setTempAdminValue] = useState<string>("");
  const [dockerServicesPrefix, setDockerServicesPrefix] = useState<string>("kleckrelay_");

  const [status, setStatus] = useState<"input" | "loading" | "display">("input");

  const [privateKeys, setPrivateKeys] = useState<{
    serverKey: string;
    dkimKey: string;
    kleckSecret: string;
    dbPassword: string;
  }>();

  if (status === "loading") {
    return (
      <h3>
        Generating keys...
      </h3>
    )
  }

  if (status === "display") {
    return (
      <div className="flex flex-col space-y-5">
        <div>
          <h2>
            Here's your <code>.env</code> file:
          </h2>
        </div>
        <div>
          <pre>
            <code>
        {`
API_DOMAIN=${apiDomain}
MAIL_DOMAIN=${mailDomain}
KLECK_SECRET=${privateKeys!.kleckSecret}
SERVER_PRIVATE_KEY=${privateKeys!.serverKey}
DKIM_PRIVATE_KEY=${privateKeys!.dkimKey}
ADMIN_EMAILS=${admins.join(",")}
DB_URI=postgres://kleckrelay:${privateKeys!.dbPassword}@${dockerServicesPrefix}database/kleckrelay
        `.trimStart().trimEnd()}
            </code>
          </pre>
        </div>
        <div>
          <h2>
            Here's your <code>docker-compose.yml</code> file:
          </h2>
        </div>
        <div>
          <pre>
            <code>
              {`
version: "3"
services:
  ${dockerServicesPrefix}database:
    image: postgres:latest
    container_name: "${dockerServicesPrefix}database"
    restart: on-failure:5
 
    environment:
      POSTGRES_USER: kleckrelay
      POSTGRES_PASSWORD: ${privateKeys!.dbPassword}
      POSTGRES_DB: kleckrelay

    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mail"]
      interval: 5s
      timeout: 5s
      retries: 5

    volumes:
      - ./db:/var/lib/postgresql/data

  ${dockerServicesPrefix}server:
    image: myzel394/kleckrelay-server:latest 
    container_name: "${dockerServicesPrefix}server"
    restart: on-failure:5

    depends_on:
      ${dockerServicesPrefix}database:
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

  ${dockerServicesPrefix}maid:
    image: myzel394/kleckrelay-maid:latest
    container_name: "${dockerServicesPrefix}maid"
    restart: on-failure:5
 
    depends_on:
      ${dockerServicesPrefix}database:
        condition: service_healthy

    env_file:
      - .env

  nginx:
    image: bunkerity/bunkerweb
    container_name: nginx
    restart: on-failure:5

    ports:
      - "80:80"
      - "443:443"

    volumes:
      - ./letsencrypt:/etc/letsencrypt

    environment:
      - MULTISITE=yes
      - SERVER_NAME=${domain}
      - USE_REVERSE_PROXY=yes
      - DISABLE_DEFAULT_SERVER=yes
      - AUTO_LETS_ENCRYPT=yes
      
      - ${domain}_REVERSE_PROXY_URL=/
      - ${domain}_REVERSE_PROXY_HOST=${dockerServicesPrefix}server
      - ${domain}_ALLOWED_METHODS=GET|POST|PUT|PATCH|DELETE|OPTIONS
      # Security is too strict
      - ${domain}_BLOCK_ABUSERS=no
      - ${domain}_USE_BAD_BEHAVIOR=no
      - ${domain}_REVERSE_PROXY_INTERCEPT_ERRORS=no
`.trimStart().trimEnd()}
            </code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-3 w-full">
        <div className="flex flex-row space-x-2 items-center">
          <div className="basis-2/12">
            <label htmlFor="domain" className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Base Domain
            </label>
          </div>
          <div className="basis-10/12">
            <input
              id="domain"
              className="px-4 py-2 bg-gray-200 border-none rounded-md dark:bg-gray-900"
              placeholder="kleckrelay.com"
              style={{
                borderWidth: 1,
                borderColor: "var(--ifm-color-primary-darkest)",
              }}
              type="text"
              value={domain}
              onChange={event => {
                setDomain(event.target.value);
                setApiDomain(`api.${event.target.value}`);
                setMailDomain(`mail.${event.target.value}`);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="basis-2/12">
            <label htmlFor="mailDomain" className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Mail Domain
            </label>
          </div>
          <div className="basis-10/12">
            <input
              id="mailDomain"
              className="px-4 py-2 bg-gray-200 border-none rounded-md dark:bg-gray-900"
              placeholder="mail.kleckrelay.com"
              style={{
                borderWidth: 1,
                borderColor: "var(--ifm-color-primary-darkest)",
              }}
              type="text"
              value={mailDomain}
              onChange={e => setMailDomain(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="basis-2/12">
            <label htmlFor="apiDomain" className="text-sm font-medium text-gray-700 dark:text-gray-200">
              API Domain
            </label>
          </div>
          <div className="basis-10/12">
            <input
              id="apiDomain"
              className="px-4 py-2 bg-gray-200 border-none rounded-md dark:bg-gray-900"
              placeholder="api.kleckrelay.com"
              style={{
                borderWidth: 1,
                borderColor: "var(--ifm-color-primary-darkest)",
              }}
              type="text"
              value={apiDomain}
              onChange={e => setApiDomain(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <div className="basis-2/12">
          <label htmlFor="adminInput" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Admins
          </label>
        </div>
        <div className="basis-10/12">
          <div className="flex flex-col space-y-2 items-start">
            <div>
              <input
                id="adminInput"
                className="px-4 py-2 bg-gray-200 border-none rounded-md dark:bg-gray-900"
                placeholder="marvin@kleckrelay.example"
                style={{
                  borderWidth: 1,
                  borderColor: "var(--ifm-color-primary-darkest)",
                }}
                type="text"
                value={tempAdminValue}
                onChange={e => setTempAdminValue(e.target.value)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " " || event.key === "," || event.key === ";") {
                    event.preventDefault();

                    if (tempAdminValue) {
                      setAdmins([...admins, tempAdminValue]);
                      setTempAdminValue("");
                    }
                  }
                }}
              />
            </div>
            <div className="flex flex-row space-x-2 items-center">
              {admins.map((admin, index) => (
                <button
                  key={admin}
                  aria-label={`Remove ${admin} from admins`}
                  className="flex flex-row space-x-2 items-center px-3 py-1 border-none cursor-pointer bg-gray-300 dark:bg-gray-800 rounded-full"
                  onClick={() => {
                    const newAdmins = [...admins];
                    newAdmins.splice(index, 1);
                    setAdmins(newAdmins);
                  }}
                >
                  <p className="text-sm m-0 font-medium text-gray-700 dark:text-gray-200">{admin}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <div className="basis-2/12">
          <label htmlFor="dockerServicesPrefix" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Docker Services Prefix
          </label>
        </div>
        <div className="basis-10/12">
          <input
            id="dockerServicesPrefix"
            className="px-4 py-2 bg-gray-200 border-none rounded-md dark:bg-gray-900"
            placeholder="my_prefix_"
            style={{
              borderWidth: 1,
              borderColor: "var(--ifm-color-primary-darkest)",
            }}
            type="text"
            value={dockerServicesPrefix}
            onChange={e => setDockerServicesPrefix(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className="px-4 py-2 cursor-pointer border-none rounded-md text-white"
          style={{
            background: "var(--ifm-color-primary-darkest)",
          }}
          onClick={async () => {
            setStatus("loading");

            const {privateKey: serverPrivateKey} = await openpgp.generateKey({
              type: "ecc",
              format: "armored",
              userIDs: [{name: "John Smith", email: "john@example.com"}],
              passphrase: "",
              rsaBits: 4096,
            })
            const {privateKey: dkimPrivateKey} = await openpgp.generateKey({
              type: "ecc",
              format: "armored",
              userIDs: [{name: "John Smith", email: "john@example.com"}],
              passphrase: "",
              rsaBits: 4096,
            })

            setPrivateKeys({
              serverKey: btoa(serverPrivateKey),
              dkimKey: btoa(dkimPrivateKey),
              kleckSecret: cryptoRandomString({
                length: 64,
                type: "hex",
              }),
              dbPassword: cryptoRandomString({
                length: 64,
                type: "hex",
              })
            })
            setStatus("display");
          }}>
          Generate config
        </button>
      </div>
    </div>
  )
}

# Testing auto-updater

This is a local setup for testing the electron-builder auto-update functionality.

## Before you start

This setup is only intended for local usage!
It includes setting up a local server with a s3 bucket that has public read & write access.
So please do not use that on any server that is publicly available.

Official docs reference: [Test Update on s3 Locally](https://www.electron.build/tutorials/test-update-on-s3-locally)

## Usage

1. Start the docker compose

The [docker compose](docker-compose.yml) includes a [minIO server](https://docs.min.io/docs/minio-docker-quickstart-guide).
It is a storage service which has a S3 compatible API.
That way we can use the s3 provider from the electron-builder.

```shell
yarn auto-update:up
```

When the minIO server is running you can open up the web console (`http:://localhost:9001`). You can find the login credentials in the docker compose file.

2. Setup AWS credentials profile

Before we can publish a new version to our local bucket server we have to set up AWS credentials.
In the electron-builder publish process it will use the s3 provider to publish a new version.

Use `aws configure` and provide the credentials for the [minio server](https://docs.min.io/docs/aws-cli-with-minio.html).
You can find them in the `docker-commpose.yml` env variables.

3. Create updatable app version

Build the app with:

```shell
yarn auto-update:make
```

This bundles an app and uploads it to the local minIO server.

4. Create updatable app

Now you **increase** the `package.json` version.
Then you again build the app with:

```shell
yarn auto-update:make
```

You should find both app versions in the `dist` directory.
Start the older version, where you can try the auto-update handling.

## Teardown

Shutting down the server will stop & remove the docker compose.
You can do that via:

```shell
yarn auto-update:down
```

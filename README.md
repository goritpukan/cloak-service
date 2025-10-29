# Cloak service

## Features
- Detects bots based on user-agent analysis
- Logs and rate-limits requests using MongoDB
- Detailed Swagger documentation
- Pre-commit checks with Husky (lint + tests)
- Fully Dockerized setup

## Description

This is a NestJS app that allows you to check, using request data, whether a request is made by a user or a bot.

It has a /check endpoint where we send IP, user-agent, and accept-language information. The app verifies that these headers are available and then checks the user-agent for specific keywords that can indicate if the request was made by a bot.

It also stores logs in MongoDB, which allows counting the number of incoming requests within one minute to help determine if the source is likely a bot or not.

This project is covered by unit and integration tests and is linted with ESLint and Prettier.

Additionally, Husky is used to automatically run the linter and tests before each commit, preventing unlinted or broken code from being committed.

The project comes with full Swagger documentation for the endpoint and DTO.

You can also run it using Docker Compose, so there’s no need to install dependencies locally or run MongoDB manually - everything is ready to go with one command.

## Swagger

Swagger url: [http://localhost:3000/swagger](http://localhost:3000/swagger)

## Setup

First of all you need to clone repo

`git clone https://github.com/goritpukan/cloak-service.git`

And then you can run it using docker or locally

---

### Docker

**Docker and docker compose should be installed on your machine**

`sudo docker compose up --build -d` for linux

`docker compose up --build -d` for macOS

---
### Locally

First of all, you need to install all dependencies

**Nodejs and npm should be installed on your machine and you need to host mongodb somewhere**

First of all, you should create .env file

`touch .env`

then you need to paste your mongodb uri there like this

`MONGO_URI=YOUR_URI`

Then 

`npm i` to install dependencies

`npm run build` to build project

`npm run start` to start project

## Stack

- NestJS (backend)
- Mongodb (database)
- Mongoose (ODM)
- Jest (Testing)
- Eslint (Lint)
- Husky (Run linter and tests before commit)


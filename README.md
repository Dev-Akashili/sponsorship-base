# SponsorshipBase

SponsorshipBase is a platform for individuals in the UK who secured jobs with visa sponsorship to share and receive insight with people looking for sponsorship and those already with sponsorship looking to make their next career move.

This repository consists of a full stack web application with a React frontend and an ASP.NET backend web api that interacts with a postgreSQL database.

## Getting Started

## Prerequisites

1. **.NET SDK** `8.x`
   - The API is .NET8
2. Docker

# Frontend

This uses React + TypeScript + Vite.

1. **Navigate to the project directory:**

   `cd repo-directory/frontend`

2. **Install dependencies using npm:**

   `npm install`

## Frontend App Configuration

The frontend app can be configured in any standard way an Node application can. Typically from environment variables.

```bash
VITE_API_LOCAL_URL=http://localhost:7297
VITE_CLIENT_LOCAL_URL=http://localhost:5173
```

# Backend

The application stack interacts with a PostgreSQL Server database, and uses code-first migrations for managing the database schema.

The repository contains a `docker-compose` for the database, so just run `docker-compose up -d` to start it running.

When setting up a new environment, or running a newer version of the codebase if there have been schema changes, you need to run migrations against your database server.

The easiest way is using the dotnet cli:

1. If you haven't already, install the local Entity Framework tooling

- Anywhere in the repo: `dotnet tool restore`

1. Navigate to the same directory as `SponsorshipBase.csproj`
1. Run migrations:

- `dotnet ef database update -s SponsorshipBase`
- The above runs against the default local server, using the connection string in `appsettings.Development.json`
- You can specify a connection string with the `--connection "<connection string>"` option

## Backend App Configuration

The app can be configured in any standard way an ASP.NET Core application can. Typically from an `appsettings.json`.

## Email Verification

Verification emails sent by the `Account Controller` for auth uses **EmailJS**. The credentials are stored in `appsettings.Development.json`. Kindly request for the credentials (public key, service id and template id) to set up your local repo.

```bash
  "EmailJS": {
    "ServiceId": "service_hunen6a",
    "RegisterTemplateId": "template_wgqju57",
    "ResetTemplateId": "template_j9dhivf",
    "Key": "2OdOhAdreljr98Bpk"
   }
```

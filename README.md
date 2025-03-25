# Reveal.js Analytics Application

Application to receive and process data from the [revealjs-analytics-plugin](https://github.com/ManhTin/revealjs-analytics-plugin).
Build with Next.js, Tailwind CSS, shadcn and Prisma


## Local Development

### Prerequisites

- Node.js `22.14.`
- Recommended: Pnpm
- Docker + Docker Compose

### Prepare Application

1. Create a environment file

    ```bash
    cp .env.example .env.local
    ```

2. Create a GitHub OAuth App for handling authentication.
  - Under [GitHub Developer OAuth Settings](https://github.com/settings/developers)
  create a new OAuth App with the following settings:
    - Name: e.g. `Reveal.js Analytics`
    - Homepage URL:`http://localhost:3000`
    - Authorization callback URL:`http://localhost:3000/api/auth/callback/github`

  - Add the `Client ID` and `Client Secret` to the `.env.local` file under the following keys:
    ```bash
    AUTH_GITHUB_ID=
    AUTH_GITHUB_SECRET=
    ```

### Start Development Server

1. Start local development database.

    ```bash
    docker-compose up -d
    ```

2. Create the database schema and seed the database.

    ```bash
    pnpm prisma:migrate:dev
    ```

3. First, run the development server:

    ```bash
    pnpm dev
    # or
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## License
MIT licensed

Copyright (c) 2025 Manh Tin Nguyen
# Tech Interview Timeline Tracker

**[Live demo →](https://interview-tracker-ashen.vercel.app)**

A personal CRM for job hunting. I got tired of losing track of which companies I'd applied to, what stage each application was in, and what I'd already told a recruiter — spread across a spreadsheet, my email, and memory. This is a small, single-purpose app that keeps all of it in one place: every application, its current stage in the pipeline, and whatever notes I need to remember for next time.

Nothing more than that. No job board integrations, no analytics dashboards, no reminders — just a clean record of where things stand.

## Features

- **Auth** — email/password signup and login, sessions handled server-side
- **Track applications** — add a company, role, and date applied in a couple clicks
- **Status pipeline** — move each application through `Applied → OA → Interview → Offer / Rejected`
- **Notes** — attach freeform notes to any application (interviewer names, questions asked, follow-ups owed)
- **Dashboard** — all applications grouped by status, so the state of the job search is visible at a glance

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React
- [Prisma](https://www.prisma.io) ORM
- PostgreSQL, hosted on [Neon](https://neon.tech)
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)

## Running it locally

```bash
npm install
```

Create a `.env` file in the project root with:

```bash
DATABASE_URL="postgresql://..."   # a Postgres connection string (Neon, or any Postgres instance)
SESSION_SECRET="..."              # a long random string used to sign session cookies
```

Push the schema to your database, then start the dev server:

```bash
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

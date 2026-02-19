# AXIOM Skill Intelligence Platform

AXIOM is a comprehensive Skill Intelligence Platform designed to bridge the gap between employee skills and organizational needs. It leverages AI and data analytics to provide actionable insights for recruitment, employee development, and strategic workforce planning.

## Key Features

*   **Skill Gap Analysis:** Identify and visualize skill gaps at individual, team, and organizational levels.
*   **Individual Development Plans (IDP):** Generate personalized learning paths and development plans for employees.
*   **Recruitment Assessment:** Streamline the hiring process with AI-driven candidate scoring and tracking (Kanban board).
*   **ROI Engine:** Calculate the financial return on investment for training and development initiatives.
*   **Coaching & Mentoring:** Facilitate coaching sessions and track progress.
*   **Employees Management:** Manage employee profiles, skills, and performance data.
*   **Skill Taxonomy:** Define and manage a structured hierarchy of skills and competencies.

## Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org) (React framework)
*   **Styling:** CSS Modules with Glassmorphism design system
*   **Language:** TypeScript
*   **State Management:** React Context / Hooks
*   **Deployment:** Netlify / Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

*   `src/app`: App router pages and layouts.
*   `src/components`: Reusable UI components (Sidebar, Navbar, etc.).
*   `src/lib`: Utility functions and business logic (scoring, gap detection).
*   `public`: Static assets.

## Deploy on Netlify

1.  Import this repository into Netlify.
2.  Set the **Base directory** to `AXIOM/axiom-platform`.
3.  Set the **Build command** to `npm run build`.
4.  Set the **Publish directory** to `.next`.

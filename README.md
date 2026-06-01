# Kabir Batra Portfolio

Personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and motion-driven interactions.

## Overview

This project renders a single-page portfolio with the following sections:

- Hero + availability status
- About + contact links
- Activity graph
- Experience timeline
- Projects
- Publications
- Background (education/awards)
- Certificates

Most content is data-driven from `src/lib/data.ts`, so updating the portfolio usually means editing one file.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Motion (`motion/react`)
- Phosphor Icons

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

`http://localhost:3000`

## Scripts

- `npm run dev` - run development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Content Editing Guide

### Primary content source

Edit `src/lib/data.ts` to update:

- Profile info (name, role, location, links)
- Experience
- Projects
- Publications
- Certificates
- Awards and supporting metadata

### Section composition

The page section order is defined in `src/app/page.tsx`.

### Styling

- Global styles and theme tokens: `src/app/globals.css`
- Section/component styles: `src/components/*`

## Assets

- Profile photo: `public/profile-photo-v3.jpg`
- Resume file: `public/resume.pdf`
- Project images: `public/projects/*`

## Deployment

Deploy on any platform that supports Next.js. Vercel is the default option:

[https://vercel.com/new](https://vercel.com/new)

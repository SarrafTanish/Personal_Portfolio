# Personal_Portfolio

A personal portfolio website built with React and Vite. The app presents an animated landing page with dark/light theme support, smooth motion effects, responsive navigation, project highlights, skills, experience, and contact links.

## Features

- Responsive single-page portfolio layout
- Animated hero section with typing effect
- Dark and light theme toggle with persistence
- Mobile navigation menu
- Animated sections using Framer Motion
- Project cards, skill cards, and experience timeline
- Contact links for email, GitHub, and LinkedIn
- Tailwind CSS v4 utility styling with custom classes

## Tech Stack

- **React 19**
- **Vite**
- **Framer Motion**
- **React Icons**
- **React Hot Toast**
- **Tailwind CSS v4**
- **ESLint**

## Prerequisites

- Node.js 18+ recommended
- npm

## Installation

```bash
npm install
```

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build in the `dist/` directory.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

## Project Structure

```text
client/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── resume.pdf
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── assets/
│       ├── hero.png
│       ├── react.svg
│       └── vite.svg
├── index.html
├── package.json
└── vite.config.js
```

## Notes

- The page fetches portfolio data from API endpoints such as `/api/profile`, `/api/projects`, and `/api/skills`.
- If those endpoints are not available, the UI still renders, but dynamic sections may remain empty and errors will be logged in the console.
- Theme preference is saved in `localStorage` and restored on load.

## Development

1. Install dependencies with `npm install`
2. Start the app with `npm run dev`
3. Open the local Vite URL shown in the terminal

## Build for Production

```bash
npm run build
```

The build output is generated in `dist/` and can be deployed to any static hosting provider.

## License

No license file is currently included in this project.

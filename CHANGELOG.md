# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-02-06

### Added
- Initialized Next.js project with App Router.
- Added Tailwind CSS for styling.
- Added Lucide React for icons.
- Added MathJax support for mathematical formulas in the Theory page.
- Created `src/app` directory structure with pages for Home, Aim, Theory, Procedure, Simulation, Result, and References.
- Created reusable `Navbar` and `Footer` components.
- Added a `CHANGELOG.md` to track project evolution.

### Changed
- Converted the project from a Vite-based HTML/CSS/JS structure to a Next.js (TypeScript) project.
- Migrated simulation logic from `simulation.js` to a React-based component in `src/app/simulation/page.tsx` using hooks and `requestAnimationFrame`.
- Moved assets (images) to the `public/` directory.
- Updated `README.md` with Next.js instructions and tech stack details.
- Switched git branch to `next`.

### Fixed
- Resolved LaTeX parsing issues in TSX by properly escaping backslashes and using string literals for formulas.
- Improved UI responsiveness and layout using Tailwind CSS.

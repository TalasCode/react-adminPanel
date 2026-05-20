# QuickPick Admin Dashboard

Admin dashboard for managing a QuickPick-style e-commerce platform. The project is a React + Vite frontend focused on internal operations such as product management, order tracking, coupon management, admin-user creation, and role-based access control.

## Overview

This repository contains the admin interface used to manage store data and operational workflows. The UI authenticates against a separate backend API, stores the login token in `localStorage`, and shows sidebar actions based on permissions returned for the logged-in user's role.

The frontend app lives in `adminPanel/`.

## Features

- Admin login with token-based authentication
- Role-based sidebar navigation using backend permissions
- Product inventory listing with low-stock highlighting
- Stock updates for existing items
- Product creation with category and brand selection
- Order listing with editable order status
- Coupon creation and activation/deactivation
- Category creation
- Brand creation
- Admin-user creation with role assignment
- Role creation with grouped permission mapping
- Light/dark visual mode toggle stored in `localStorage`

## Tech Stack

- React 18
- Vite 5
- React Router DOM
- Axios
- React Toastify
- ESLint

## Project Structure

```text
.
|-- README.md
`-- adminPanel
    |-- package.json
    |-- public
    `-- src
        |-- components
        |-- pages
        `-- assets
```

## Main Screens

- `Login`
- `List Items`
- `Add Items`
- `Orders`
- `Coupon Manager`
- `Add Category`
- `Add Brand`
- `Add Role`
- `Add Admin`

## Prerequisites

- Node.js 18+
- npm
- A running backend API at `https://localhost:7274`

## Getting Started

1. Open the frontend folder:

```bash
cd adminPanel
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local Vite URL shown in the terminal.

## Available Scripts

From `adminPanel/`:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Backend Integration

The frontend currently calls a backend hosted locally on:

```text
https://localhost:7274
```

Examples of API areas used by the app:

- `/api/Login`
- `/api/User`
- `/api/UserPermission`
- `/api/Role`
- `/api/Item`
- `/api/Order`
- `/api/Brand`
- `/api/Category`
- `/api/Coupon`

## Notes Before Publishing

- API URLs are currently hardcoded instead of being driven by environment variables.
- Authentication state is stored in `localStorage`.
- The repo currently contains only the admin frontend, not the backend API.
- Product, category, and brand image handling is wired around local public asset paths.
- The sidebar includes an offer-related entry, but the corresponding page is not wired in the current route setup.

## Suggested Repository Names

- `quickpick-admin-dashboard`
- `quickpick-admin-panel`
- `ecommerce-admin-rbac-dashboard`

Recommended: `quickpick-admin-dashboard`

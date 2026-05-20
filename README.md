# QuickPick Admin Dashboard

A modern React-based admin dashboard built for managing an e-commerce platform through a centralized operational interface.

The dashboard provides tools for product management, order processing, user administration, role-based permissions, and store configuration workflows.

Built with React + Vite and integrated with a backend API using JWT authentication and permission-based access control.

---

## Features

### Authentication & Access Control

* Secure login with token-based authentication
* Role-based access control (RBAC)
* Dynamic sidebar rendering based on user permissions
* Admin user creation and role assignment

### Product Management

* Product inventory listing
* Low-stock indicators
* Product creation and updates
* Category and brand assignment

### Store Operations

* Order tracking and status management
* Coupon creation and activation controls
* Category management
* Brand management

### Administration

* Role creation
* Permission mapping
* Admin account management

### User Experience

* Light/Dark mode support
* Persistent UI preferences using localStorage
* Responsive dashboard interface

---

## Architecture

```text
Admin Dashboard (React + Vite)
            ↓
Axios API Layer
            ↓
JWT Authentication
            ↓
ASP.NET Core Backend API
            ↓
SQL Server Database
```

---

## Tech Stack

* React 18
* Vite
* React Router DOM
* Axios
* React Toastify
* JavaScript
* JWT Authentication

---

## Project Structure

```text
quickpick-admin-dashboard/

├── adminPanel
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │
│   ├── public
│   └── package.json
│
└── README.md
```

---

## Main Screens

* Login
* Dashboard
* Product Management
* Orders
* Coupons
* Categories
* Brands
* Roles
* Admin Users

---

## Getting Started

Clone repository:

```bash
git clone <repo-url>
```

Navigate to the project:

```bash
cd adminPanel
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Backend Integration

The dashboard connects to a backend API handling:

* Authentication
* Users
* Roles
* Permissions
* Products
* Orders
* Categories
* Brands
* Coupons

---

## Future Improvements

* Environment variable support
* Analytics dashboard
* Image upload service
* Notifications system
* Advanced reporting
* Real-time order updates

---

## Why I built this

This project was built to strengthen frontend architecture skills while building real administrative workflows commonly found in production e-commerce systems.

# 🏢 Employee Management System (EMS)

A modern, fast, and responsive web application designed to streamline employee task management. This project provides a sleek, interactive frontend built with React, Vite, and Tailwind CSS. It features a fully functional role-based dashboard for Admins and Employees, with persistent local storage.

## 🚀 Tech Stack

*   **Framework:** [React 18](https://reactjs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Typography:** Google Fonts (Outfit)

## ✨ Features

*   **Role-Based Access Control (RBAC):** Distinct dashboards for Administrators and Employees.
*   **Admin Dashboard:** 
    *   Create and assign new tasks to specific employees.
    *   View real-time task statistics (Active, New, Completed, Failed) across the entire team.
*   **Employee Dashboard:** 
    *   View assigned tasks sorted by status.
    *   Interactive task progression: Accept new tasks, and mark active tasks as Completed or Failed.
*   **Persistent Storage:** Uses browser `localStorage` to securely save employee data, tasks, and login sessions. No database required for local testing!
*   **Modern Aesthetics:** Features glassmorphism UI components, subtle hover animations, and a rich radial-gradient dark mode.

## 🛠️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone this repository (or download the source).
2. Navigate to the project directory:
   ```bash
   cd ems
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the Vite development server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🔐 Demo Credentials

To test the application, use the following credentials:

**Admin Login:**
*   **Email:** `admin@example.com`
*   **Password:** `123`

**Employee Login (Example):**
*   **Email:** `e@e.com`
*   **Password:** `123`

*(Note: Additional employee credentials can be found in `src/utils/localStorage.jsx`)*
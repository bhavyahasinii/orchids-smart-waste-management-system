## Project Summary
A complete Smart Waste Management System web application. It monitors garbage bin fill levels in real-time using IoT devices and displays the data on a web dashboard for administrators. The system includes a backend for receiving IoT data, a database for storing bin states and history, and a modern React-based admin panel with status indicators and real-time updates.

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB (Mongoose)
- **Authentication**: Simple session-based admin authentication
- **State Management**: React Hooks & SWR/Fetch for polling

## Architecture
- `src/lib/mongodb.ts`: MongoDB connection utility
- `src/models/Bin.ts`: Mongoose schema for garbage bins
- `src/app/api/bins/update/route.ts`: IoT data receiver
- `src/app/api/bins/route.ts`: Bin listing API
- `src/app/api/bins/[id]/route.ts`: Single bin details API
- `src/app/dashboard/page.tsx`: Admin dashboard UI
- `src/app/login/page.tsx`: Simple admin login

## User Preferences
- Clean, modern UI suitable for college project review
- Color-coded status indicators (Green/Yellow/Red)
- Progress bars for fill levels
- Real-time refresh of bin data

## Project Guidelines
- No comments unless requested
- Modular, production-like code
- Clean validation and error handling
- Deployment-ready configuration

## Common Patterns
- API routes return standard JSON responses
- MongoDB models used for data persistence
- Environment variables for sensitive configuration (DB URI, Admin Password)

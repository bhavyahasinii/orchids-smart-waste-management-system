# Smart Waste Management System

A production-ready IoT-based Smart Waste Management System built with Next.js, Node.js, and MongoDB.

## Features
- **Real-time Monitoring**: Live dashboard showing bin fill levels with color-coded status.
- **IoT Integration**: Standardized REST API to receive data from ultrasonic sensors (or other IoT devices).
- **Historical Analytics**: Interactive charts showing fill level trends for each bin.
- **Secure Admin Portal**: Session-based authentication for administrators.
- **Responsive UI**: Optimized for mobile and desktop viewing.

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS, Lucide Icons, Recharts
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB (Mongoose)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (Atlas or local)

### Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_secure_admin_password
```

### Installation
```bash
npm install
npm run dev
```

## API Documentation

### 1. Update Bin Data (IoT Device)
**Endpoint**: `POST /api/bins/update`  
**Description**: Receives data from the IoT device.

**Payload**:
```json
{
  "bin_id": "BIN_01",
  "level": 85
}
```

**Response**:
```json
{
  "message": "Bin data updated successfully",
  "bin": { ... },
  "alert": true
}
```

**Sample Request (cURL)**:
```bash
curl -X POST http://localhost:3000/api/bins/update \
  -H "Content-Type: application/json" \
  -d '{"bin_id": "BIN_01", "level": 85}'
```

### 2. Fetch All Bins
**Endpoint**: `GET /api/bins`  
**Description**: Returns current status of all registered bins.

### 3. Fetch Single Bin
**Endpoint**: `GET /api/bins/:id`  
**Description**: Returns details and historical data for a specific bin.

## Deployment Instructions

### Backend (Render / Vercel)
1. Push the code to a GitHub repository.
2. Connect the repository to **Vercel** or **Render**.
3. Add the `MONGODB_URI` and `ADMIN_PASSWORD` environment variables in the project settings.
4. The system will automatically build and deploy.

### Database (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist the IP address `0.0.0.0/0` (for cloud deployment).
3. Copy the connection string and use it as `MONGODB_URI`.

## Project Structure
- `src/models/Bin.ts`: Database schema including historical logs.
- `src/app/api/bins/update/route.ts`: Core logic for status calculation and alerts.
- `src/app/dashboard/page.tsx`: Real-time monitoring dashboard with 5s polling.
- `src/components/BinHistoryModal.tsx`: Visual analytics using Recharts.

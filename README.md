# TeleHealth MVP

A functional telehealth application built for the WC Launchpad 2026 Builder Round. Enables patients to register, discover doctors, book consultations, and connect with medical professionals for online healthcare consultations.

## Features

### Patient Module
- ✅ User registration with secure email/password authentication
- ✅ Patient profile management (personal info, medical history)
- ✅ Doctor discovery and filtering by specialization
- ✅ AI-powered doctor recommendations based on symptoms
- ✅ Appointment booking with real-time availability
- ✅ Appointment management (reschedule/cancel)
- ✅ Real-time notifications for appointment updates
- ✅ Virtual consultation sessions with Jitsi
- ✅ Medical records viewing with prescriptions and notes

### Doctor Module
- ✅ Doctor account registration and profile setup
- ✅ Profile management with specialization and bio
- ✅ Consultation schedule management
- ✅ View patient consultation history
- ✅ Add consultation notes and prescriptions
- ✅ Join virtual consultations
- ✅ Real-time notifications for appointments

## Tech Stack

- **Frontend**: Next.js 16.2.6 with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: NestJS with TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Real-time**: Socket.io for WebSocket notifications
- **Video**: Jitsi for virtual consultations
- **State Management**: Zustand

## Setup & Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (via Docker recommended)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TeleHealthAPP
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npx prisma migrate dev  # Setup database schema
   npm run start:dev
   ```
   Backend runs on `http://localhost:3001`

4. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

5. **Access the application**
   - Open `http://localhost:3000`
   - Register as a patient or doctor
   - Explore features

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/telehealth_db?schema=public"
PORT=3001
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## Deployment

### Backend Deployment (Railway)
1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Set environment variables on Railway:
   - `DATABASE_URL` (Railway PostgreSQL)
   - `JWT_SECRET` (generate a secure key)
   - `PORT` (set to 3001 or desired port)
4. Deploy

### Frontend Deployment (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL` (your Railway backend URL)
   - `NEXT_PUBLIC_SOCKET_URL` (your Railway backend URL)
3. Deploy

### Database (Railway PostgreSQL)
1. Add PostgreSQL database in Railway
2. Copy connection string to `DATABASE_URL`

## Project Structure

```
TeleHealthAPP/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── appointments/   # Appointment management
│   │   ├── doctor-discovery/
│   │   ├── doctor-schedule/
│   │   ├── medical-records/
│   │   ├── patient-profile/
│   │   └── notification/   # WebSocket gateway
│   └── prisma/             # Database schema
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/            # Pages and layouts
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities (API client, socket)
│   │   ├── types/          # TypeScript types
│   │   └── contexts/       # Auth context
│   └── public/             # Static assets
└── docker-compose.yml      # Docker configuration
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Patient Profile
- `GET /patient/profile` - Get profile
- `PUT /patient/profile` - Update profile

### Doctors
- `GET /doctors` - List all doctors
- `GET /doctors?specialization=X` - Filter by specialization
- `POST /doctors/ai-recommend` - Get AI recommendations

### Appointments
- `POST /appointments` - Book appointment
- `GET /appointments` - List appointments
- `PUT /appointments/cancel/:id` - Cancel appointment

### Medical Records
- `GET /medical-records/patient` - Get patient records
- `POST /medical-records` - Create record

### Doctor Schedule
- `GET /doctor/schedule` - Get doctor schedule
- `POST /doctor/schedule` - Create schedule slot

## Performance & Architecture

### Design Decisions
1. **JWT Authentication** - Stateless, scalable auth with cookies
2. **Real-time Notifications** - Socket.io for instant updates
3. **Modular Architecture** - Each feature in its own NestJS module
4. **TypeScript** - Type safety across frontend and backend
5. **Prisma ORM** - Type-safe database queries

### Known Limitations & Future Improvements
1. Video consultation uses Jitsi public meeting rooms (not custom embedded)
2. AI recommendations based on basic specialization matching (could use ML)
3. No email notifications (only in-app WebSocket)
4. Basic prescription format (could be enhanced with forms)
5. No appointment reminders (future: scheduled emails/SMS)
6. Limited doctor availability UI (could add calendar widget)

## Testing

Run tests:
```bash
# Backend tests
cd backend && npm run test

# Backend e2e tests  
cd backend && npm run test:e2e
```

## License

Proprietary - WC Launchpad 2026

## Authors

Built as part of WC Launchpad 2026 Builder Round

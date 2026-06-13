# 📚 Vision Library

A Next.js application for managing students, seating arrangements, and WhatsApp communications.

## Features

- 👤 Student enrollment and management
- 💺 Seat allocation system
- 💬 WhatsApp messaging integration
- 🔐 User authentication with OTP
- 📅 Subscription plan management
- 💳 Payment tracking
- 📊 Dashboard analytics

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Express
- **Database**: MongoDB with Mongoose
- **Messaging**: Twilio WhatsApp API
- **Email**: Nodemailer
- **Authentication**: NextAuth, Better-auth

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB
- Twilio account (for WhatsApp)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/visionlibrary.git
cd visionlibrary

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your credentials
```

### Environment Setup

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/visionlibrary
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/              # API endpoints
│   ├── dashboard/        # Dashboard pages
│   └── page.js           # Home page
├── models/               # MongoDB schemas
├── lib/                  # Utility functions
├── zodSchema/            # Validation schemas
└── hooks/                # Custom React hooks
```

## Available Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create user account |
| POST | `/api/auth/otpverification` | Verify OTP |
| POST | `/api/students` | Add new student |
| GET | `/api/students` | Get all students |
| POST | `/api/send-whatsapp` | Send WhatsApp message |
| POST | `/api/whatsapp/appointmentmessage` | Send appointment reminder |

## Deployment

### Deploy on Vercel

```bash
npm run build
git push  # Push to GitHub
```

Connect your repository to Vercel and it will auto-deploy.

## Support

- 📧 [Create an Issue](../../issues) for bug reports
- 💬 [Start a Discussion](../../discussions) for questions

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Vahid Momin

---

For detailed documentation, see [README_DETAILED.md](./README_DETAILED.md) or [ARCHITECTURE.md](./ARCHITECTURE.md)

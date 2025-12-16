# Professional Job Portal

A full-stack job portal application built with Next.js, Prisma, and Clerk authentication.

## Features

### For Job Seekers
- 🔍 Browse and search job listings
- 📝 Create and manage professional profile
- 💼 Apply to jobs with cover letters
- 📊 Track application status
- 📈 View application history

### For Employers
- 🏢 Create company profile
- 📢 Post job listings
- 👥 Manage applications
- 📊 View application analytics
- ✅ Review candidate profiles

## Tech Stack

- **Frontend**: Next.js 16, React 19, TailwindCSS 4
- **Backend**: Next.js Server Actions
- **Database**: SQLite with Prisma ORM
- **Authentication**: Clerk
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd webdevelopmentportal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL="file:./prisma/dev.db"

# Clerk Authentication (Get these from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Setting Up Clerk Authentication

1. Go to [https://clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your publishable key and secret key
4. Paste them into your `.env` file
5. In Clerk dashboard, configure:
   - Sign-in/Sign-up URLs
   - Redirect URLs
   - Enable email/password authentication

## Database Schema

The application uses the following models:

- **User**: Core user data with Clerk integration
- **JobSeekerProfile**: Profile for job seekers
- **EmployerProfile**: Profile for employers
- **Job**: Job postings
- **Application**: Job applications

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── jobs/              # Job listing pages
│   ├── onboarding/        # Role selection
│   ├── profile/           # Profile management
│   ├── sign-in/           # Authentication
│   └── sign-up/           # Authentication
├── components/            # React components
│   ├── jobs/             # Job-related components
│   └── profile/          # Profile forms
├── actions/              # Server actions
│   ├── job.ts           # Job operations
│   └── user.ts          # User operations
├── lib/                  # Utilities
│   └── db.ts            # Prisma client
└── prisma/              # Database
    └── schema.prisma    # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Authentication Flow
1. User signs up/signs in via Clerk
2. Redirected to onboarding to select role (Job Seeker or Employer)
3. Redirected to profile setup
4. Access role-specific dashboard

### Job Seeker Flow
1. Complete profile with resume
2. Browse jobs with filters
3. Apply to jobs with cover letter
4. Track applications in dashboard

### Employer Flow
1. Complete company profile
2. Post job listings
3. View and manage applications
4. Review candidate profiles

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database in Production

For production, consider upgrading from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update DATABASE_URL in production environment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

For support, email your-email@example.com or open an issue in the repository.

# Expense Tracker App

A modern expense tracking application built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Features

- 🔐 **Authentication**: Secure user authentication with WorkOS AuthKit
- 💰 **Expense Management**: Add, view, and delete expenses
- 📊 **Dashboard**: Real-time expense statistics and analytics
- 🎨 **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- 🗄️ **Database**: PostgreSQL with Prisma ORM
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: WorkOS AuthKit
- **HTTP Client**: Axios with interceptors
- **UI Components**: Radix UI + Custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- WorkOS account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/expense_tracker"
   WORKOS_API_KEY="your_workos_api_key"
   WORKOS_CLIENT_ID="your_workos_client_id"
   WORKOS_REDIRECT_URI="http://localhost:3000/auth/callback"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication
- `GET /auth` - Login page
- `GET /auth/callback` - Authentication callback
- `POST /api/webhooks/workos` - WorkOS webhook handler

### Expenses
- `GET /api/v1/expense` - Get all expenses for authenticated user
- `POST /api/v1/expense` - Create a new expense
- `PUT /api/v1/expense` - Update an existing expense
- `DELETE /api/v1/expense?id={id}` - Delete an expense

### Users
- `GET /api/v1/user` - Get user information

## Project Structure

```
expense-tracker-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── v1/
│   │       ├── expense/   # Expense API endpoints
│   │       └── user/      # User API endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── Navbar.tsx        # Navigation component
├── lib/                  # Utility libraries
│   ├── api.ts           # Axios configuration
│   ├── prisma.ts        # Prisma client
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

## Key Features

### 1. Axios Integration
- Centralized API configuration with interceptors
- Automatic error handling and logging
- Request/response interceptors for authentication
- Type-safe API calls with TypeScript

### 2. Expense Management
- Add expenses with amount, date, category, and description
- View all expenses in a clean, organized list
- Delete expenses with confirmation
- Real-time statistics (total, monthly, categories)

### 3. User Interface
- Modern, responsive design with Tailwind CSS
- Floating action button for quick expense addition
- Modal dialogs for form interactions
- Loading states and error handling
- Icons throughout the interface

### 4. Database Schema
```sql
-- Users table
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "workosId" TEXT UNIQUE NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

-- Expenses table
CREATE TABLE "Expense" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("workosId")
);
```

## Development

### Adding New Features
1. Create new API endpoints in `app/api/v1/`
2. Add TypeScript types in `lib/types.ts`
3. Update the UI components as needed
4. Test thoroughly before deploying

### Database Changes
1. Update the Prisma schema in `prisma/schema.prisma`
2. Generate a new migration: `npx prisma migrate dev --name description`
3. Apply the migration: `npx prisma migrate deploy`

### Styling
- Use Tailwind CSS classes for styling
- Follow the existing design patterns
- Ensure responsive design for all screen sizes

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Set up your database and environment variables

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
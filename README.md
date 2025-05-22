# Subscription Tracker API

A robust backend API that helps users track their paid subscriptions and automatically sends email notifications when renewal dates are approaching. Built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Subscription Management**: Create, read, update, and delete subscription records
- **Smart Notifications**: Automated email reminders before renewal dates
- **Workflow Automation**: Background jobs for handling recurring tasks
- **Security**: Built-in rate limiting and request protection
- **Upcoming Renewals**: Track subscriptions expiring in the next 7 days
- **User-specific Data**: Users can only access their own subscriptions

## 🛠️ Technology Stack

### Core Framework
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for API endpoints
- **MongoDB**: NoSQL database for storing subscription data
- **Mongoose**: MongoDB object modeling library

### Authentication & Security
- **JWT (jsonwebtoken)**: Secure user authentication tokens
- **bcryptjs**: Password hashing and encryption
- **Arcjet**: Advanced security and rate limiting protection

### Automation & Communication
- **Upstash Workflow**: Background job processing for automated tasks
- **Nodemailer**: Email service for sending renewal notifications
- **dayjs**: Modern date manipulation and formatting library

### Development Tools
- **ESLint**: Code linting and formatting
- **Nodemon**: Development server with hot reload
- **Morgan**: HTTP request logging middleware
- **dotenv**: Environment variable management

## 📦 Package Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@arcjet/inspect` | ^1.0.0-beta.7 | Security inspection and monitoring |
| `@arcjet/node` | ^1.0.0-beta.7 | Rate limiting and bot protection |
| `@upstash/workflow` | ^0.2.13 | Background job processing for email automation |
| `bcryptjs` | ^3.0.2 | Password hashing for secure authentication |
| `cookie-parser` | ~1.4.4 | Parse cookies from HTTP requests |
| `dayjs` | ^1.11.13 | Date manipulation and formatting |
| `debug` | ~2.6.9 | Debugging utility for development |
| `dotenv` | ^16.5.0 | Load environment variables from .env file |
| `express` | ^4.21.2 | Web framework for building REST API |
| `jsonwebtoken` | ^9.0.2 | Create and verify JWT authentication tokens |
| `mongodb` | ^6.16.0 | MongoDB database driver |
| `mongoose` | ^8.15.0 | MongoDB object modeling and schema validation |
| `morgan` | ~1.9.1 | HTTP request logging middleware |
| `nodemailer` | ^7.0.3 | Send emails for subscription reminders |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@eslint/css` | ^0.8.1 | ESLint CSS linting support |
| `@eslint/js` | ^9.27.0 | ESLint JavaScript configuration |
| `@eslint/json` | ^0.12.0 | ESLint JSON linting support |
| `eslint` | ^9.27.0 | Code linting and style enforcement |
| `globals` | ^16.1.0 | Global variables for ESLint |
| `nodemon` | ^3.1.10 | Development server with automatic restart |

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database (local or cloud)
- SMTP email service (Gmail, SendGrid, etc.)
- Upstash account for workflow automation

### 1. Clone the Repository
```bash
git clone https://github.com/dylanewe/subtrack.git
cd subtrack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb-uri

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Upstash Workflow
UPSTASH_WORKFLOW_URL=your-upstash-workflow-url
UPSTASH_TOKEN=your-upstash-token

# Arcjet Security
ARCJET_KEY=your-arcjet-api-key

# Server URL (for workflow callbacks)
SERVER_URL=http://localhost:3000
```

### 4. Database Setup
Make sure MongoDB is running locally or you have access to a cloud instance:

```bash
# For local MongoDB
mongod --dbpath /path/to/your/db
```

### 5. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run start
```

The server will start on `http://localhost:3000` (or your specified PORT).

### 6. Verify Installation
Test the API with a simple request:
```bash
curl http://localhost:3000/api/health
```

## 📁 Project Structure

```
subscription-tracker-api/
├── models/
│   ├── subscription.model.js    # Subscription schema
│   └── user.model.js           # User schema
├── controllers/
│   ├── auth.controller.js      # Authentication logic
│   └── subscription.controller.js  # Subscription CRUD operations
├── routes/
│   ├── auth.routes.js          # Authentication routes
│   └── subscription.routes.js  # Subscription routes
├── middleware/
│   ├── auth.middleware.js      # JWT verification
│   └── security.middleware.js  # Arcjet security
├── workflows/
│   └── email.workflow.js       # Email automation workflows
├── utils/
│   ├── email.js               # Email utilities
│   └── constants.js           # Application constants
├── .env                       # Environment variables
├── app.js                     # Main application file
└── package.json               # Dependencies and scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions
- `POST /api/subscriptions` - Create new subscription
- `GET /api/subscriptions/:id` - Get subscription by ID
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription
- `GET /api/subscriptions/upcoming-renewals` - Get renewals in next 7 days
- `GET /api/subscriptions/user/:userId/upcoming-renewals` - Get user's upcoming renewals

## 🎯 Key Features Explained

### Automated Email Notifications
The system uses Upstash Workflow to schedule background jobs that check for upcoming renewals and send email notifications automatically.

### Security Features
- **Arcjet Integration**: Provides rate limiting and bot protection
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs ensures passwords are securely stored

### Date Handling
- **dayjs**: Modern alternative to moment.js for date manipulation
- Calculates days until renewal
- Formats dates for user-friendly display

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **JWT Secret**: Use a strong, unique secret key
3. **Database Security**: Use MongoDB Atlas or secure your local instance
4. **Email Credentials**: Use app passwords, not regular passwords
5. **Rate Limiting**: Arcjet provides built-in protection against abuse

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Update `SERVER_URL` to your production domain
3. Configure production database URI
4. Set up production email service

### Recommended Platforms
- **Heroku**: Easy deployment with add-ons
- **Vercel**: Serverless deployment
- **DigitalOcean**: VPS hosting
- **AWS/GCP**: Cloud platform deployment

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints for proper usage

---

Built with ❤️ using Node.js and Express
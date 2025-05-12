# Portfolio Backend

This is the backend service for my personal portfolio website. Built with TypeScript and Node.js, it provides the necessary APIs and services to power the portfolio frontend.

## 🚀 Features

- RESTful API endpoints
- TypeScript for type safety and better development experience
- Environment-based configuration
- Secure authentication and authorization
- API documentation
- Error handling and logging
- Database integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:

```bash
npm install

```

3. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
NODE_ENV=development
# Add other environment variables as needed such as secret keys for jwt
```

4. Start the development server:

```bash
npm run dev

```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── middleware/    # Custom middleware
│   ├── utils/         # Utility functions
│   └── config/        # Configuration files
├── tests/             # Test files
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
├── package.json      # Project dependencies
└── tsconfig.json     # TypeScript configuration
```

## 🧪 Running Tests

```bash
npm run test

```

## 📚 API Documentation

API documentation is available at `/api-docs` when running the server.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Format code

## 🤝 Contributing

Currently not looking for contributions but suggestions are welcomed

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

Your Name - [@herman-kwamebour](https://twitter.com/hermanskray) - hermankwamebour30@.com

Project Link: [https://github.com/Herman100/portfolio-herman-backend](https://github.com/Herman100/portfolio-herman-backend)

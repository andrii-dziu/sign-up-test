# Signup App - Full Stack CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with Angular 17 frontend and Node.js/Express backend. The application includes user authentication, product management, and a responsive dashboard.

## Features

- **User Authentication**: Registration and login with JWT tokens
- **Product Management**: Full CRUD operations for products
- **Dashboard**: Overview with latest products and statistics
- **Responsive Design**: Built with Tailwind CSS
- **Protected Routes**: Authentication guards for secure access
- **Modern Architecture**: Angular 17 with standalone components

## Tech Stack

### Frontend
- **Angular 17** - Latest version with standalone components
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming
- **Angular Router** - Client-side routing
- **Angular Forms** - Reactive forms with validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 17)

### Installing Angular CLI

```bash
npm install -g @angular/cli@17
```

## Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd signup-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

The application consists of two parts: the Angular frontend and the Node.js backend. You need to run both simultaneously.

### Option 1: Run Both Services (Recommended)

Open two terminal windows/tabs:

**Terminal 1 - Backend Server:**
```bash
npm run server
```
The backend will start on `http://localhost:3001`

**Terminal 2 - Frontend Development Server:**
```bash
npm start
```
The frontend will start on `http://localhost:4200`

### Option 2: Run Services Individually

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
ng serve
```

## Application Structure

```
signup-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/           # Login component
│   │   │   ├── register/        # Registration component
│   │   │   ├── dashboard/       # Dashboard component
│   │   │   └── products/        # Products CRUD component
│   │   ├── services/
│   │   │   ├── auth.service.ts  # Authentication service
│   │   │   └── product.service.ts # Product management service
│   │   ├── guards/
│   │   │   └── auth.guard.ts    # Route protection
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts # HTTP interceptor
│   │   └── app-routing.module.ts # Application routes
│   ├── assets/
│   │   └── products/            # Product images (SVG)
│   └── styles.scss              # Global styles with Tailwind
├── server/
│   └── server.js                # Express backend server
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (protected)
- `GET /api/products/latest` - Get 3 latest products (protected)
- `POST /api/products` - Create new product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

## Usage

### 1. Registration
- Navigate to the registration page
- Fill in your name, email, and password
- Submit the form
- You'll be redirected to login with a success message

### 2. Login
- Enter your email and password
- Click "Sign in"
- You'll be redirected to the dashboard

### 3. Dashboard
- View the 3 latest products
- See total inventory value and low stock count
- Navigate to Products page for full management

### 4. Products Management
- View all products in a responsive grid
- Add new products with image upload
- Edit existing products
- Delete products
- Monitor stock levels

## Product Fields

Each product contains:
- **Name** - Product name
- **SKU** - Stock Keeping Unit
- **Price** - Product price
- **Quantity** - Available stock
- **Image** - Product image (SVG placeholder)

## Development

### Available Scripts

```bash
# Start the development server
npm start

# Build the application
npm run build

# Run tests
npm test

# Start the backend server
npm run server

# Watch for changes and rebuild
npm run watch
```

### Code Structure

The application uses Angular 17's standalone components approach:
- No NgModules required
- Components are self-contained
- Services are provided at the root level
- Guards and interceptors are functional

### Styling

The application uses Tailwind CSS for styling:
- Utility-first approach
- Responsive design
- Custom components built with Tailwind classes
- PostCSS processing for optimization

## Troubleshooting

### Common Issues

1. **Port already in use (3001)**
   ```bash
   pkill -f "node server/server.js"
   npm run server
   ```

2. **Angular CLI not found**
   ```bash
   npm install -g @angular/cli@17
   ```

3. **Dependencies issues**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Images not showing**
   - Check that the backend server is running
   - Verify image paths in the browser console
   - Ensure SVG files are in the assets folder

### Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS configuration
- Input validation
- XSS protection

## Production Deployment

For production deployment:

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Set up environment variables:**
   - JWT_SECRET
   - Database connection (replace in-memory storage)

3. **Deploy backend:**
   - Use PM2 or similar process manager
   - Set up reverse proxy (nginx)
   - Configure SSL certificates

4. **Deploy frontend:**
   - Serve built files from a web server
   - Configure API base URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Review the browser console for errors
3. Ensure all prerequisites are installed
4. Verify both frontend and backend are running

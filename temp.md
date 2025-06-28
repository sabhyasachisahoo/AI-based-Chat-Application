```json
{
"package.json":
"""
{
"name": "es6-express-server",
"version": "1.0.0",
"description": "Express server with ES6 modules",
"main": "dist/app.js",
"scripts": {
"start": "node dist/app.js",
"dev": "nodemon src/app.js --exec babel-node",
"build": "babel src -d dist"
},
"keywords": [
"express",
"es6",
"modules",
"babel"
],
"author": "AI Assistant",
"license": "MIT",
"dependencies": {
"cors": "^2.8.5",
"express": "^4.18.2",
"helmet": "^7.1.0",
"morgan": "^1.10.0"
},
"devDependencies": {
"@babel/cli": "^7.23.4",
"@babel/core": "^7.23.5",
"@babel/node": "^7.22.19",
"@babel/preset-env": "^7.23.5",
"nodemon": "^3.0.1"
}
}
""",
"src/app.js":
"""
// Import necessary modules
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes'; // Import the routes
import { errorHandler, notFound } from './middleware/errorMiddleware';

// Create an Express application
const app = express();

// --- Middlewares ---

// Morgan for logging HTTP requests
app.use(morgan('dev')); // 'dev' provides concise output colored by HTTP status code

// Helmet for securing Express apps by setting various HTTP headers
app.use(helmet());

// CORS for enabling Cross-Origin Resource Sharing
app.use(cors());

// Express JSON middleware for parsing incoming JSON payloads
app.use(express.json());

// --- Routes ---

// Define a simple route handler for the root path
app.get('/', (req, res) => {
res.send('Hello, ES6 Express Server!');
});

// Use the routes defined in the routes module
app.use('/api', routes);

// --- Error Handling ---

// Custom error handling middleware to catch 404 errors (Not Found)
app.use(notFound);

// Custom error handling middleware to handle other errors
app.use(errorHandler);

// Define the port number for the server to listen on
const port = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
""",
"src/routes/index.js":
"""
// src/routes/index.js

import express from 'express';

const router = express.Router();

// Define a sample route
router.get('/hello', (req, res) => {
res.json({ message: 'Hello from the API!' });
});

export default router;

""",
"src/middleware/errorMiddleware.js":
"""
// Custom error handling middleware functions

// Middleware to handle 404 errors (Not Found)
const notFound = (req, res, next) => {
const error = new Error(`Not Found - ${req.originalUrl}`);
res.status(404);
next(error);
};

// Middleware to handle other errors
const errorHandler = (err, req, res, next) => {
// If the response status code is 200 (OK), set it to 500 (Internal Server Error)
const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
res.status(statusCode);
res.json({
message: err.message, // Send the error message in the response
stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Send the error stack trace in development mode
});
};

export { notFound, errorHandler };

""",
".babelrc":
"""
{
"presets": ["@babel/preset-env"]
}
"""
}
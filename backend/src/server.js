import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();
// Define PORT
const PORT = process.env.PORT || 5001;

//Middlewares
// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173' // Adjust this to your frontend's origin
}));
// Middleware to parse JSON bodies
app.use(express.json());
// Apply rate limiting middleware
app.use(rateLimiter);


// Routes
app.use("/api/notes", notesRoutes);

// app.get("/api/notes", (req, res) => {
//     res.send('There are 5 notes');
// });

// Connect to MongoDB
connectDB().then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
});
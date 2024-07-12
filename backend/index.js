const express = require('express');
const connectDB = require('./db'); // Import your database connection function

const app = express();
const port = 5001;

// Connect to MongoDB
connectDB(); // Assuming this connects to your MongoDB

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Optional: Allow credentials (cookies, authorization headers)
  next();
});

// Body parser middleware
app.use(express.json());

// Routes setup
app.use('/api', require('./Routes/CreateUser')); // Adjust with your actual route file

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Login route
app.post('/api/loginuser', (req, res) => {
  console.log("Received login request:");
  console.log("Request Body:", req.body); // Log request body to see what data is sent
  
  // Simulate login logic (replace with actual logic)
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password') {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

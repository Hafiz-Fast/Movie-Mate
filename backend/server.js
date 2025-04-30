const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const cron = require('node-cron');

const cleanupExpiredSeats = require('./models/cleanup');

app.use(express.json()); 
app.use(cors());
app.use('/api', taskRoutes);

const runCleanup = async () => {
    try {
        console.log("Cleanup triggered at:", new Date().toISOString());
        await cleanupExpiredSeats.cleanup();    // ← actually runs your cleanup SP
        console.log("Cleanup completed at:", new Date().toISOString());
    } catch (error) {
    console.error("Error during cleanup:", error);
    }
};

cron.schedule("*/5 * * * *", runCleanup, {
    timezone: "Asia/Karachi"
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
  

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hello from Node.js Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
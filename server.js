require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); 
const { Pool } = require('pg'); // Only need this once at the top!

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

const PORT = process.env.PORT || 3000;

// Root Route
app.get('/', (req, res) => {
    res.send("Welcome to my Backend API!");
});

// GET Route: Fetch skills
app.get('/api/skills', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM skills');
        res.json(result.rows);
    } catch (error) {
        console.error("GET Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST Route: Add new skills
app.post('/api/skills', async (req, res) => {
    try {
        const { category, technologies } = req.body;
        const newSkill = await pool.query(
            'INSERT INTO skills (category, technologies) VALUES ($1, $2) RETURNING *',
            [category, technologies]
        );
        res.json({
            message: "Skill successfully added to the database!",
            data: newSkill.rows[0]
        });
    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: "Failed to add skill" });
    }
});

// Boot the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
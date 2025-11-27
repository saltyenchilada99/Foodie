const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require("./database");


app.get("/", (req, res) => {
  res.send("Hello from cloud!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ success: true, server_time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

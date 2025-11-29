const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require("./database");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from cloud!");
});

app.get("/test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ success: true, server_time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/api/newAccount", async (req, res) => {
    const {firstName, lastName, email, password}= req.body;

    try {
    await pool.query(
      'INSERT INTO public."user" (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',
      [firstName, lastName, email, password]
    );
    res.json({ firstname: firstName, lastname: lastName, email: email, password: password });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/viewEmail", async (req, res) => {

    try {
    await pool.query(
      'SELECT email FROM public."user" WHERE userID = 1'
    );
    res.json({email: email});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

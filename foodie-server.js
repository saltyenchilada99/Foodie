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
    console.log("Attempting DB connection...");
    console.log("Incoming /test request from:", req.ip);
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, server_time: result.rows[0] });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/newAccount", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
    await pool.query(
      'INSERT INTO public."user" ("firstName", "lastName", email, password) VALUES ($1, $2, $3, $4)',
      [firstName, lastName, email, password]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/accountLookup", async (req, res) => {

    const {email, password} = req.body;

    try {
    const result = await pool.query(
      'SELECT "firstName", "lastName", "followerCount", "followingCount" FROM public."user" WHERE "email" = $1 AND "password" = $2', [email, password]
    );
    if(result.rowCount === 1) return res.json(result.rows[0]);
    else return res.json({success: false})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/newPost", async (req, res) => {

    const {postTitle, postAuthor, ingredientList, } = req.body;

    try {
    const result = await pool.query(
      'SELECT "firstName", "lastName", "followerCount", "followingCount" FROM public."user" WHERE "email" = $1 AND "password" = $2', [email, password]
    );
    if(result.rowCount === 1) return res.json(result.rows[0]);
    else return res.json({success: false})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

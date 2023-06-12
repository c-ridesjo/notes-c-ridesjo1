const express = require("express");
const router = express.Router();

// POST request for login
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Validate the username and password
  if (username === "test" && password === "test") {
    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    //login failed
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }
});

module.exports = router;

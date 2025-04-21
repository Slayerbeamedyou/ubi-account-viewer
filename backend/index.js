
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const UBI_APP_ID = "39baebad-39e5-4552-8c25-2c9b919064e2";

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      "https://public-ubiservices.ubi.com/v3/profiles/sessions",
      {
        email,
        password,
        rememberMe: true,
        spaceId: "prod"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Ubi-AppId": UBI_APP_ID,
          "User-Agent": "UbisoftClient/6.3.0"
        }
      }
    );

    res.json({ success: true, profile: response.data });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Login failed. Check your email and password.",
      error: error?.response?.data || error.message
    });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

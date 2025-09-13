"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { encrypt, decryptMethod } from "../../api/cripto"; // ✅ your crypto utils
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    const payload = {
      username,
      password,
      app_key: "com.mirrorinfo",
    };

    try {
      // 🔐 Encrypt payload before sending
      const encrypted = encrypt(JSON.stringify(payload));
      setLoading(true);

      console.log("🔹 Raw payload:", payload);
      console.log("🔹 Encrypted payload:", encrypted);

      // 🚀 API request
      const res = await axios.post(
        "https://api.mayway.in/api/users/2736fab291f04e69b62d490c3c09361f5b82461a",
        { data: encrypted },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("✅ Status:", res.status);
      console.log("✅ Raw response:", res.data);

      let parsedResponse;

      if (res.data?.data) {
        // 🔓 Decrypt backend encrypted response
        const decrypted = decryptMethod(res.data.data);
        console.log("🔓 Decrypted response:", decrypted);

        parsedResponse = JSON.parse(decrypted);
      } else {
        // If API returns plain JSON
        parsedResponse = res.data;
      }

      // ✅ Handle login success/failure
      if (parsedResponse?.success) {
        localStorage.setItem("user", JSON.stringify(parsedResponse));
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        alert(parsedResponse?.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="p-6 w-96">
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginScreen;

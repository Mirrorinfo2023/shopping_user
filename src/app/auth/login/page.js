"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import api from "@/utils/api"; // your axios instance
import { decryptMethod,encrypt } from "@/api/cripto";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      // Prepare original data
      const originalText = {
        username: username,
        password: password,
        app_key: "com.mirrorinfo",
      };

      // Encrypt the request
      const encrypted = encrypt(JSON.stringify(originalText));

      // Call login API
      const response = await axios.post("https://api.mayway.in/api/users/2736fab291f04e69b62d490c3c09361f5b82461a", { encReq: encrypted });

      // Decrypt response
      const decrypted = decryptMethod(response.data);

      if (decrypted.status === 200) {
        // Save user data in localStorage
        localStorage.setItem("userData", JSON.stringify(decrypted.data));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(decrypted.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

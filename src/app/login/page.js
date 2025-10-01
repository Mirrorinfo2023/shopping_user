"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { encrypt, decryptMethod } from "../../api/cripto";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [error, setError] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.replace("/pages/home");
    }
  }, [router]);

  const handleRecaptchaChange = (value) => setRecaptchaValue(value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateLogin = () => {
    const errs = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!password.trim()) errs.password = "Password is required";
    if (!recaptchaValue) errs.recaptcha = "Please verify that you are not a robot";
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = encrypt(JSON.stringify({ username, password, recaptcha: recaptchaValue }));
      const response = await axios.post("http://localhost:4223/api/users/login", { encReq: payload });
      const data = JSON.parse(decryptMethod(response.data));

      if (data.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("isLoggedIn", "true");
        router.replace("/pages/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 sm:p-8 md:p-10">
          <div className="mb-1 text-center">

            <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mt-1 text-gray-500 text-sm sm:text-base mb-5" >Sign in to access your account</p>
          </div>

          {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 rounded">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Username Field with Floating Label */}
            <div className="relative w-full">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}

                placeholder=" "
                className={`peer w-full rounded-lg border p-4 text-sm sm:text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${loginErrors.username ? "border-red-500" : "border-gray-300"
                  }`}
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-4 text-gray-400 text-sm sm:text-base transition-all duration-200 ease-out 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm 
                peer-focus:-top-2 peer-focus:text-indigo-500 peer-focus:text-xs bg-white px-1"
              >
                Username <span className="text-red-500">*</span>
              </label>
              {loginErrors.username && <p className="text-red-600 text-xs mt-1">{loginErrors.username}</p>}
            </div>

            {/* Password Field with Floating Label */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                placeholder=" "
                className={`peer w-full rounded-lg border p-4 text-sm sm:text-base text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${loginErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-gray-400 text-sm sm:text-base transition-all duration-200 ease-out 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm 
                peer-focus:-top-2 peer-focus:text-indigo-500 peer-focus:text-xs bg-white px-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {loginErrors.password && <p className="text-red-600 text-xs mt-1">{loginErrors.password}</p>}
            </div>

            {/* reCAPTCHA */}
            <ReCAPTCHA
              sitekey="6LdHTbwrAAAAAGawIo2escUPr198m8cP3o_ZzZK1"
              onChange={handleRecaptchaChange}
              theme="light"
            />
            {loginErrors.recaptcha && <p className="text-red-600 text-xs mt-1">{loginErrors.recaptcha}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium text-sm sm:text-base hover:bg-indigo-700 transition cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-4 sm:mt-6 text-center text-sm sm:text-base">
            <span>
              {"Don't have an account?"}{" "}
              <span
                className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                onClick={() => router.push("/register")}
              >
                Sign up
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AuthPage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});

  // Signup fields
  const [form, setForm] = useState({
    referralCode: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    pincode: "",
    state: "",
    city: "",
  });
  const [errors, setErrors] = useState({});

  const states = [
    "Maharashtra",
    "Karnataka",
    "Delhi",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Gujarat",
  ];
  const cities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bengaluru", "Mysore", "Hubli", "Mangalore"],
    Delhi: ["New Delhi", "North Delhi", "South Delhi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.replace("/home");
    }
  }, [router]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setErrors({});
    setLoginErrors({});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /** ---------- LOGIN VALIDATION ---------- */
  const validateLogin = () => {
    const errs = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!password.trim()) errs.password = "Password is required";
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "user" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        router.replace("/home");
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 1500);
  };

  /** ---------- SIGNUP VALIDATION ---------- */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!form.state) newErrors.state = "State is required";
    if (!form.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration successful! Please login.");
      setIsLoginMode(true);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl overflow-auto">
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-1 text-gray-500 text-sm sm:text-base">
              {isLoginMode
                ? "Sign in to access your account"
                : "Join us to get started"}
            </p>
          </div>

          {/* Global error */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 rounded">
              {error}
            </div>
          )}

          {/* Login Form */}
          {isLoginMode ? (
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                    loginErrors.username ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {loginErrors.username && (
                  <p className="text-red-600 text-xs mt-1">
                    {loginErrors.username}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                    loginErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {loginErrors.password && (
                  <p className="text-red-600 text-xs mt-1">
                    {loginErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white p-2 sm:p-3 rounded-md font-medium text-sm sm:text-base hover:bg-indigo-700 transition"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          ) : (
            /* Signup Form */
            <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Referral Code (Optional)"
                value={form.referralCode}
                onChange={(e) => handleChange("referralCode", e.target.value)}
                className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mobile && (
                  <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pincode && (
                  <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <select
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-600 text-xs mt-1">{errors.state}</p>
                  )}
                </div>

                <div className="flex-1">
                  <select
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select City</option>
                    {form.state &&
                      cities[form.state]?.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-600 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white p-2 sm:p-3 rounded-md font-medium text-sm sm:text-base hover:bg-indigo-700 transition"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>
          )}

          <div className="mt-4 sm:mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm sm:text-base text-gray-600 hover:text-indigo-600"
            >
              {isLoginMode
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

      
      </div>
    </div>
  );
}

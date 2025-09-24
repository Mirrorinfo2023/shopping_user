"use client";
import { useState } from "react";

const states = ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Uttar Pradesh", "Gujarat"];
const cities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Karnataka: ["Bengaluru", "Mysore", "Hubli", "Mangalore"],
    Delhi: ["New Delhi", "North Delhi", "South Delhi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
};

export default function RegisterPage() {
    const [form, setForm] = useState({
        referralCode: "", firstName: "", lastName: "", email: "",
        mobile: "", password: "", pincode: "", state: "", city: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
        if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
        else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Pincode must be 6 digits";
        if (!form.state) newErrors.state = "State is required";
        if (!form.city) newErrors.city = "City is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = e => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert("Registration successful! Please login.");
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 sm:p-8 md:p-10">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Account</h2>
                        <p className="mt-1 text-gray-500 text-sm sm:text-base">Join us to get started</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                        <input
                            type="text"
                            placeholder="Referral Code (Optional)"
                            value={form.referralCode}
                            onChange={e => handleChange("referralCode", e.target.value)}
                            className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                        />

                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={form.firstName}
                                    onChange={e => handleChange("firstName", e.target.value)}
                                    className={`w-full p-2 sm:p-3 border rounded-md ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={form.lastName}
                                    onChange={e => handleChange("lastName", e.target.value)}
                                    className={`w-full p-2 sm:p-3 border rounded-md ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={e => handleChange("email", e.target.value)}
                            className={`w-full p-2 sm:p-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}

                        <input
                            type="text"
                            placeholder="Mobile Number"
                            value={form.mobile}
                            onChange={e => handleChange("mobile", e.target.value)}
                            className={`w-full p-2 sm:p-3 border rounded-md ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>}

                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={e => handleChange("password", e.target.value)}
                            className={`w-full p-2 sm:p-3 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}

                        <input
                            type="text"
                            placeholder="Pincode"
                            value={form.pincode}
                            onChange={e => handleChange("pincode", e.target.value)}
                            className={`w-full p-2 sm:p-3 border rounded-md ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.pincode && <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>}

                        <div className="flex flex-col sm:flex-row gap-2">
                            <select
                                value={form.state}
                                onChange={e => handleChange("state", e.target.value)}
                                className={`flex-1 p-2 sm:p-3 border rounded-md ${errors.state ? "border-red-500" : "border-gray-300"}`}
                            >
                                <option value="">Select State</option>
                                {states.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}

                            <select
                                value={form.city}
                                onChange={e => handleChange("city", e.target.value)}
                                className={`flex-1 p-2 sm:p-3 border rounded-md ${errors.city ? "border-red-500" : "border-gray-300"}`}
                            >
                                <option value="">Select City</option>
                                {form.state && cities[form.state]?.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white p-2 sm:p-3 rounded-md font-medium text-sm sm:text-base hover:bg-indigo-700 transition"
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

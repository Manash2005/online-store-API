import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            if (activeTab === "login") {
                await login(formData.email, formData.password);
                navigate("/");
            } else {
                await register(formData.name, formData.email, formData.password, formData.role);
                navigate("/");
            }
        } catch (err) {
            const errMsg = err.response?.data?.message || "Something went wrong";
            setMessage({ type: "error", text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setMessage({ type: "", text: "" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 relative">
            {/* Background orbs */}
            <div className="absolute top-20 left-1/3 w-80 h-80 bg-brand-500/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-20 right-1/3 w-60 h-60 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10 animate-scale-in">
                {/* Card */}
                <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/40">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white font-bold font-[Outfit] text-lg">
                                S
                            </div>
                            <span className="text-xl font-bold font-[Outfit] text-white">
                                Shop<span className="gradient-text">Verse</span>
                            </span>
                        </Link>
                        <h2 className="text-2xl font-bold font-[Outfit] text-white mt-2">
                            {activeTab === "login" ? "Welcome Back" : "Get Started"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {activeTab === "login"
                                ? "Sign in to your account to continue"
                                : "Create a free account to start shopping"}
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-surface-800/80 rounded-2xl p-1.5 mb-7 border border-white/5">
                        <button
                            id="login-tab"
                            onClick={() => switchTab("login")}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === "login"
                                    ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25"
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            id="register-tab"
                            onClick={() => switchTab("register")}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === "register"
                                    ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25"
                                    : "text-slate-500 hover:text-slate-300"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Message Toast */}
                    {message.text && (
                        <div
                            className={`mb-5 p-3.5 rounded-xl text-sm font-medium animate-slide-down flex items-center gap-2 ${message.type === "success"
                                    ? "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20"
                                    : "bg-accent-rose/10 text-accent-rose border border-accent-rose/20"
                                }`}
                        >
                            <span>{message.type === "success" ? "✓" : "✕"}</span>
                            {message.text}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name (Register only) */}
                        {activeTab === "register" && (
                            <div className="animate-slide-down">
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">
                                    Full Name
                                </label>
                                <input
                                    id="name-input"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3.5 rounded-xl bg-surface-800/60 border border-white/5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">
                                Email Address
                            </label>
                            <input
                                id="email-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3.5 rounded-xl bg-surface-800/60 border border-white/5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">
                                Password
                            </label>
                            <input
                                id="password-input"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3.5 rounded-xl bg-surface-800/60 border border-white/5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                            />
                        </div>

                        {/* Role (Register only) */}
                        {activeTab === "register" && (
                            <div className="animate-slide-down">
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">
                                    I want to
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: "user", label: "Shop", emoji: "🛒", desc: "Buy products" },
                                        { value: "seller", label: "Sell", emoji: "🏪", desc: "List products" },
                                    ].map((role) => (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: role.value })}
                                            className={`py-3.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 border text-center cursor-pointer ${formData.role === role.value
                                                    ? "bg-brand-500/15 border-brand-500/40 text-white shadow-sm shadow-brand-500/10"
                                                    : "bg-surface-800/40 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
                                                }`}
                                        >
                                            <span className="text-lg block mb-0.5">{role.emoji}</span>
                                            <span className="font-semibold">{role.label}</span>
                                            <span className="block text-xs text-slate-500 mt-0.5">{role.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            id="auth-submit"
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 mt-1 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${loading
                                    ? "bg-brand-500/40 text-white/50 cursor-not-allowed"
                                    : "bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5 active:translate-y-0"
                                }`}
                        >
                            {loading ? (
                                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : activeTab === "login" ? (
                                "Sign In →"
                            ) : (
                                "Create Account →"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-xs text-slate-600">or</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-slate-500">
                        {activeTab === "login"
                            ? "New to ShopVerse? "
                            : "Already have an account? "}
                        <button
                            onClick={() => switchTab(activeTab === "login" ? "register" : "login")}
                            className="text-brand-400 hover:text-brand-300 font-semibold transition-colors cursor-pointer"
                        >
                            {activeTab === "login" ? "Create an account" : "Sign in instead"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

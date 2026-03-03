import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Try to restore session on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await api.get("/api/auth/user/me");
            if (res.data.user) {
                setUser(res.data.user);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await api.post("/api/auth/login", { email, password });
        if (res.data.user) {
            setUser(res.data.user);
        }
        return res.data;
    };

    const register = async (name, email, password, role) => {
        const res = await api.post("/api/auth/register", { name, email, password, role });
        if (res.data.newUser) {
            setUser(res.data.newUser);
        }
        return res.data;
    };

    const logout = async () => {
        await api.post("/api/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

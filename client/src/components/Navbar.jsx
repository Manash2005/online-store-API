import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "glass-strong shadow-lg shadow-black/20"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white font-bold text-lg font-[Outfit] transition-transform duration-300 group-hover:scale-110">
              S
            </div>
            <span className="text-xl font-bold font-[Outfit] text-white tracking-tight">
              Shop<span className="gradient-text">Verse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/"
                  ? "text-white bg-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
              Home
            </Link>

            {user ? (
              <>
                <span className="px-3 py-2 text-sm text-slate-400">
                  Hi, <span className="text-brand-300 font-medium">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-accent-rose hover:bg-accent-rose/10 transition-all duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/login"
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={`block h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              />
              <span
                className={`block h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : ""
                  }`}
              />
              <span
                className={`block h-0.5 bg-white rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="glass-strong border-t border-white/5 px-4 py-3 space-y-1">
          <Link
            to="/"
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/"
                ? "text-white bg-white/10"
                : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
          >
            Home
          </Link>

          {user ? (
            <>
              <div className="px-4 py-3 text-sm text-slate-400">
                Signed in as <span className="text-brand-300 font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-accent-rose hover:bg-accent-rose/10 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/login"
                  ? "text-white bg-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="relative mt-20">
            {/* Gradient top accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

            <div className="bg-surface-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Link to="/" className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white font-bold font-[Outfit]">
                                    S
                                </div>
                                <span className="text-lg font-bold font-[Outfit] text-white">
                                    Shop<span className="gradient-text">Verse</span>
                                </span>
                            </Link>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                                Your premium destination for quality products. We serve for you, not for us.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                                Quick Links
                            </h4>
                            <ul className="space-y-2.5">
                                {[
                                    { to: "/", label: "Home" },
                                    { to: "/login", label: "My Account" },
                                ].map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-slate-500 hover:text-brand-400 transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                                Support
                            </h4>
                            <ul className="space-y-2.5">
                                {["FAQ", "Shipping", "Returns", "Contact Us"].map((item) => (
                                    <li key={item}>
                                        <span className="text-sm text-slate-500 hover:text-brand-400 transition-colors duration-200 cursor-pointer">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                                Connect
                            </h4>
                            <div className="flex gap-3">
                                {["X", "IG", "GH", "YT"].map((icon) => (
                                    <div
                                        key={icon}
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white hover:bg-brand-500/20 hover:border-brand-500/40 transition-all duration-200 cursor-pointer"
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-xs text-slate-600">
                            © 2026 ShopVerse. All rights reserved.
                        </p>
                        <p className="text-xs text-slate-600">
                            Built with ❤️ by{" "}
                            <span className="text-brand-400">Team ShopVerse</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

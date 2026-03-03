import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

/* Skeleton card for loading state */
function SkeletonCard() {
  return (
    <div className="bg-surface-700/50 rounded-2xl overflow-hidden border border-white/5">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton w-3/4" />
        <div className="h-3 skeleton w-1/2" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-5 skeleton w-20" />
          <div className="h-7 skeleton w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product/getproducts");
      setProducts(response.data.products);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-60 h-60 bg-accent-cyan/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-accent-emerald rounded-full animate-pulse" />
            Now open for shopping
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-[Outfit] leading-tight tracking-tight animate-slide-up">
            Discover{" "}
            <span className="gradient-text">Premium</span>
            <br />
            Products
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.15s" }}>
            We serve for you, not for us. Browse our curated collection and find exactly what you need.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <a href="#products" className="btn-primary text-center w-full sm:w-auto">
              Browse Products
            </a>
            {!user && (
              <Link to="/login" className="btn-outline text-center w-full sm:w-auto">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCTS SECTION ==================== */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-[Outfit] text-white">
              All Products
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} available`}
            </p>
          </div>
          <div className="h-px sm:hidden bg-white/5 mt-2" />
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-accent-rose/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-accent-rose font-medium">{error}</p>
            <button
              onClick={() => { setLoading(true); setError(""); fetchProducts(); }}
              className="mt-4 btn-outline text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-white">No products yet</h3>
            <p className="text-sm text-slate-500 mt-1">
              Check back soon — products are being added!
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {products.map((product, index) => (
              <div key={product._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.08}s` }}>
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
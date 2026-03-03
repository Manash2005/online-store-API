import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product/getproducts/${id}`);
      setProduct(response.data.product);
    } catch (err) {
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  /* Loading skeleton */
  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 skeleton w-24 mb-8" />
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-square skeleton rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 skeleton w-3/4" />
              <div className="h-4 skeleton w-full" />
              <div className="h-4 skeleton w-2/3" />
              <div className="h-10 skeleton w-32 mt-6" />
              <div className="h-12 skeleton w-48 mt-4 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-accent-rose/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-accent-rose font-medium">{error}</p>
          <Link to="/" className="mt-4 inline-block btn-outline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  /* Not found */
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-white">Product not found</h2>
          <Link to="/" className="mt-4 inline-block btn-outline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Background gradient orbs */}
      <div className="fixed top-32 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-20 left-0 w-60 h-60 bg-accent-cyan/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-400 transition-colors mb-8 animate-fade-in"
        >
          <span>←</span>
          <span>Back to Products</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 animate-slide-up">
          {/* Image */}
          <div className="relative group">
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-700/50">
              <img
                src={product.productImage}
                alt={product.title}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-brand-500/5 rounded-3xl blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-[Outfit] text-white leading-tight">
              {product.title}
            </h1>

            <p className="mt-4 text-slate-400 leading-relaxed text-base">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8">
              <div className="inline-flex items-baseline gap-2">
                <span className="text-4xl font-extrabold gradient-text">
                  ₹{product.price?.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-center flex-1 sm:flex-none">
                🛒 Add to Cart
              </button>
              <Link to="/" className="btn-outline text-center flex-1 sm:flex-none">
                Continue Shopping
              </Link>
            </div>

            {/* Meta info */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="w-2 h-2 bg-accent-emerald rounded-full" />
                  In Stock
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="w-2 h-2 bg-accent-cyan rounded-full" />
                  Free Delivery
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="w-2 h-2 bg-accent-amber rounded-full" />
                  Genuine Product
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
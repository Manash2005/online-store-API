import { Link } from "react-router-dom";

function ProductCard({ product, index = 0 }) {
  return (
    <Link
      to={`/product/getproducts/${product._id}`}
      className="group block"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative bg-surface-700/50 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={product.productImage}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-surface-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-sm font-bold text-accent-emerald">
              ₹{product.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-white truncate group-hover:text-brand-300 transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-1">
            {product.description}
          </p>

          {/* View button */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold gradient-text">
              ₹{product.price?.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-brand-400 bg-brand-500/10 px-3 py-1.5 rounded-full group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
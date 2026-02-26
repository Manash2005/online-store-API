import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      
      <img
        src={product.productImage}
        alt={product.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h2>

        <p className="text-indigo-600 font-bold mt-2">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="inline-block mt-3 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
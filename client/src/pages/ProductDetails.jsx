import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (loading) return <div className="p-6">Loading product...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* Image */}
        <img
          src={product.productImage}
          alt={product.title}
          className="w-full h-96 object-cover rounded-xl shadow-md"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {product.title}
          </h1>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-indigo-600 mt-6">
            ₹{product.price}
          </p>

          <button className="mt-6 bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
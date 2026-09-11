import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../api/productApi";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Backend ke search & pagination features yahan call ho rahe hain
      const res = await fetchProducts({ search });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search]); // Search input change hote hi backend filter run karega

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts(); // Table reload
    }
  };

  return (
    <div className="p-6 text-white bg-slate-900 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products Inventory</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none"
        />
      </div>

      {loading ? (
        <p>Loading products from backend...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Price</th>
              <th className="py-2">Stock</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-b border-slate-800/50">
                <td className="py-2">
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:5000${item.image}`
                    }
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="py-2 font-medium">{item.name}</td>
                <td className="py-2 text-slate-400">
                  {item.category?.name || "General"}
                </td>
                <td className="py-2">${item.price}</td>
                <td className="py-2">{item.stock}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsTable;

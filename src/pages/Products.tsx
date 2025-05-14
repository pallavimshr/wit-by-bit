import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addCategory } from "../store/slices/categorySlice";
import { useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories,
  );
  const products = useSelector(
    (state: RootState) => state.product.ProductState,
  );
  const navigate = useNavigate();

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      dispatch(
        addCategory({ id: Date.now().toString(), name: categoryName.trim() }),
      );
      setCategoryName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-black font-worksans">
          Products
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-light-gray text-brand-blue px-7 py-3 rounded-lg font-semibold font-worksans"
          >
            Add a Category
          </button>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-brand-blue text-white px-7 py-3 rounded-lg font-semibold font-worksans"
          >
            Add a Product
          </button>
        </div>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const productsInCategory = products.filter(
            (product) => product.category === cat.name,
          );

          return (
            <div
              key={cat.id}
              className="border rounded-[10px] p-4 bg-custom-gray h-[750px]"
            >
              <h2 className="text-base font-medium text-black mb-4 font-worksans">
                {cat.name}
              </h2>

              {productsInCategory.length > 0 ? (
                <div className="space-y-3">
                  {productsInCategory.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded shadow font-worksans flex items-center gap-4"
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm"></div>
                      )}

                      <div className="flex flex-col">
                        <h3 className="text-base font-medium text-black font-worksans">
                          {product.name}
                        </h3>
                        <p className="text-sm text-black font-normal mt-1 font-worksans">
                          ₹{product.priceInr}
                        </p>
                        <p className="text-sm text-brand-blue bg-sky-light p-0.5 text-center rounded-md mt-1 font-worksans">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm font-worksans">
                  No products yet
                </p>
              )}
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-black font-worksans">
              Add Category
            </h2>
            <label className="block text-sm text-black font-normal mb-1 font-worksans">
              Category Name *
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none "
              placeholder="Enter category name"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-7 py-2 rounded-lg text-base font-semibold border bg-light-gray text-brand-blue font-worksans"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-7 py-2 font-semibold bg-brand-blue text-white rounded-lg font-worksans"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

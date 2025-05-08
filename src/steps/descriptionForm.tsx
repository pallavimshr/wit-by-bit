import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../store/slices/productSlice';
import { RootState } from '../store';

const DescriptionForm: React.FC = () => {
  const dispatch = useDispatch();
  const { name, category, brand, image } = useSelector((state: RootState) => state.product);
  const categories = useSelector((state: RootState) => state.category.categories); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(updateProduct({ image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      
      <div>
        <label className="font-medium">Product Name *</label>
        <input
          className="w-full border p-2 rounded mt-1"
          value={name}
          onChange={(e) => dispatch(updateProduct({ name: e.target.value }))}
        />
      </div>

     
      <div>
        <label className="font-medium">Category *</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={category}
          onChange={(e) => dispatch(updateProduct({ category: e.target.value }))}
        >
          <option value="">Select</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      
      <div>
        <label className="font-medium">Brand *</label>
        <input
          className="w-full border p-2 rounded mt-1"
          value={brand}
          onChange={(e) => dispatch(updateProduct({ brand: e.target.value }))}
        />
      </div>

      
      <div>
        <label className="font-medium">Product Image</label>
        <div className="mt-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-brand-blue text-white px-4 py-2 rounded-md font-medium"
          >
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        {image && (
          <div className="mt-3">
            <img src={image} alt="Uploaded preview" className="w-32 h-32 object-cover rounded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionForm;

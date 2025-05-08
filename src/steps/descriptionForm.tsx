import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProductForm } from '../store/slices/formSlice';
import ImageUploading from 'react-images-uploading';
import { ChevronDown, Image as ImageIcon } from 'lucide-react';

const DescriptionForm: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const product = useSelector((state: RootState) => state.form.product);
  const { name, category, brand, image } = product;

  const [images, setImages] = useState([{ data_url: image }]); 

  const onChange = (imageList: any) => {
    setImages(imageList);
    if (imageList.length > 0) {
      dispatch(setProductForm({ image: imageList[0].data_url }));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="font-medium font-worksans">Product Name *</label>
        <input
          className="w-full border p-2 rounded mt-1"
          value={name}
          onChange={(e) => dispatch(setProductForm({ name: e.target.value }))}
        />
      </div>

      <div className="relative">
  <label className="font-medium font-worksans">Category *</label>
  <select
    className="w-full border p-2 bg-white rounded mt-1 cursor-pointer appearance-none pr-10"
    value={category}
    onChange={(e) => dispatch(setProductForm({ category: e.target.value }))}
  >
    <option value=""></option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.name}>
        {cat.name}
      </option>
    ))}
  </select>

  
  <div className="pointer-events-none absolute right-4 top-[40px] text-brand-blue">
    <ChevronDown size={18} />
  </div>
</div>

      <div>
        <label className="font-medium font-worksans">Brand *</label>
        <input
          className="w-full border p-2 rounded mt-1"
          value={brand}
          onChange={(e) => dispatch(setProductForm({ brand: e.target.value }))}
        />
      </div>

      <div>
        
        <ImageUploading
          value={images}
          onChange={onChange}
          dataURLKey="data_url"
          acceptType={['jpg', 'png', 'jpeg']}
        >
          {({ onImageUpload }) => (
            <div>
              <button
  onClick={onImageUpload}
  className="text-brand-blue bg-white px-4 py-2 rounded-md border border-brand-blue font-medium flex items-center gap-2"
>
  <ImageIcon size={16} />
  Upload Image
</button>
              
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};

export default DescriptionForm;

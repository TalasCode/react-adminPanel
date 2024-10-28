import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        price: "",
        description: "",
        brandId: 0,
        categoryId: 0, // Changed to categoryId
         // Changed to brandId
        stock: 0,
        picture: ""
       // Added stock field
        
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
     const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchCategoriesAndBrands = async () => {
            try {
                console.log(token);
                const headers = {
                    Authorization: `Bearer ${token}`, // Ensure token is defined and valid
                };
                
                const categoriesResponse = await axios.get(`https://localhost:7274/api/Category/getAll`, { headers });
                const brandsResponse = await axios.get(`https://localhost:7274/api/Brand/getAll`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  console.log(categoriesResponse);
                setCategories(categoriesResponse.data.$values);
                setBrands(brandsResponse.data.$values);
            } catch (error) {
                console.error('Error fetching categories or brands:', error);
                toast.error('Failed to load categories or brands.');
            }
        };

        fetchCategoriesAndBrands();
    }, [url]);
    const onImageUpload = (imageUrl) => {
        setData(prevData => ({ ...prevData, picture: imageUrl }));
        setImagePreview(imageUrl);
    };
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'stock' ? Number(value) : value; // Ensure stock is a number
        setData((prevData) => ({ ...prevData, [name]: newValue }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        //data.picture= image;
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", Number(data.price));
        formData.append("description", data.description);
        formData.append("brandId", data.brandId); // Use brandId
        formData.append("categoryId", data.categoryId); // Use categoryId
        formData.append("stock", data.stock); 
        formData.append("image",image)
        

        try {
            console.log(data);
            data.picture = "..\\..\\..\\public\\picture_ecommerce\\" + image.name;
            const response = await axios.post(`https://localhost:7274/api/Item/add`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response)
            if (response.data) {
                setData({
                    name: "",
                    price: "",
                    description: "",
                    brandId: 0,
                    categoryId: 0, // Reset categoryId
                     // Reset brandId
                    stock: 0,
                    picture: null// Reset stock
                });
                setImage(null); // Reset image
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding food item:', error);
            toast.error('Failed to add item.');
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                    <img className='image' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price ">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select className='selectt' onChange={onChangeHandler} name="categoryId" value={data.categoryId}>
                            <option value={0}>Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="add-brand flex-col">
                        <p>Product Brand</p>
                        <select className='selectt' onChange={onChangeHandler} name="brandId" value={data.brandId}>
                            <option value={0}>Select Brand</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input className='inputclasa' onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' required />
                    </div>
                    <div className="add-stock flex-col">
                        <p>Product Stock</p>
                        <input className='inputclasa' onChange={onChangeHandler} value={data.stock} type="number" name='stock' placeholder='Enter stock quantity' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
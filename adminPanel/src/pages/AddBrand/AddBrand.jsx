import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddBrand.css';
const token = localStorage.getItem("token");

const AddBrand = ({ url }) => {
    const [image , setImage] = useState('');
    const [data, setData] = useState({
        name: "",
        picture: null
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onImageUpload = (event) => {
        const file = event.target.files[0];

        setImage(file);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        const formData = new FormData();
        formData.append("name", data.name);
        
        if (image) {
            formData.append("picture", image);
        } else {
            toast.error('Please upload an image.');
            return;
        }
console.log(data);
data.picture ="..\\..\\..\\public\\picture_ecommerce\\" + image.name;
        try {
            const response = await axios.post(`https://localhost:7274/api/Brand/add`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                setData({ name: "", picture: null });
                setImage(null)
                toast.success('Brand added successfully!');
            } else {
                toast.error('Failed to add Brand.');
            }
        } catch (error) {
            console.error('Error adding Brand:', error.response ? error.response.data : error.message);
            toast.error('Failed to add Brand.');
        }
    };

    return (
        <div className='add-category'>
            <form onSubmit={onSubmitHandler}>
                <div className="image-upload">
                    <label htmlFor="picture">
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="Category" />
                        ) : (
                            <div className="upload-area">Upload Image</div>
                        )}
                    </label>
                    <input type="file" id="picture" onChange={onImageUpload} hidden required />
                </div>
                <div>
                    <label>Brand Name</label>
                    <input type="text" name='name' value={data.name} onChange={onChangeHandler} placeholder='Type Brand name' required />
                </div>
                <button type='submit'>Add Brand</button>
            </form>
        </div>
    );
};

export default AddBrand;
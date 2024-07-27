import './addform.scss'
import React, { useState } from 'react';
import axiosInstance from '../../config/axiosconfig'


const AddUserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        password: '',
        mobileNo: '',
        email: '',
        packageName: 'Basic',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                ...formData,
                image: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/v1/admin/addmember', formData);
            console.log(response.data);
            alert("User registered successfully!")
            setFormData({
                username: '',
                fullName: '',
                password: '',
                mobileNo: '',
                email: '',
                package: 'Basic',
                image: ''
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="add-user-form">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mobileNo">Mobile No</label>
                    <input
                        type="tel"
                        id="mobileNo"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="package">Package</label>
                    <select
                        id="package"
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                    >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                    </select>

                </div>

                <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUserForm;

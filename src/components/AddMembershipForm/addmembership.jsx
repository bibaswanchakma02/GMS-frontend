
import React, { useState } from 'react';
import axiosInstance from '../../config/axiosconfig';
import './AddMembershipForm.scss';

const AddMembershipForm = () => {
    const [formData, setFormData] = useState({
        packageName: '',
        price: '',
        duration: '',
        benefits: {
            accessToAllFacilities: false,
            freePersonalTrainerSessions: '',
            freeGroupClasses: false,
            nutritionPlan: false,
            guestPasses: '',
            merchandiseDiscount: '',
            lockerServices: false,
            parking: false,
            other: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.benefits) {
            setFormData({
                ...formData,
                benefits: {
                    ...formData.benefits,
                    [name]: name === 'accessToAllFacilities' || name === 'nutritionPlan' || name === 'lockerServices' || name === 'parking' ? value === 'true' : value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/admin/addmembership', formData);
            if (response.status === 200) {
                alert('Membership added successfully');
                setFormData({
                    packageName: '',
                    price: '',
                    duration: '',
                    benefits: {
                        accessToAllFacilities: false,
                        freePersonalTrainerSessions: '',
                        freeGroupClasses: false,
                        nutritionPlan: false,
                        guestPasses: '',
                        merchandiseDiscount: '',
                        lockerServices: false,
                        parking: false,
                        other: ''
                    }
                });
            }
        } catch (error) {
            console.error('Error adding membership:', error);
            alert('Failed to add membership. Please try again.');
        }
    };

    return (
        <form className="add-membership-form-custom" onSubmit={handleSubmit}>
            <h2>Add New Membership</h2>
            <div className="form-section-custom">
                <h3>Membership Details</h3>
                <div className="form-group-custom">
                    <label>Package Name</label>
                    <input type="text" name="packageName" value={formData.packageName} onChange={handleChange} required />
                </div>
                <div className="form-group-custom">
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />
                </div>
                <div className="form-group-custom">
                    <label>Duration (days)</label>
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="0" required />
                </div>
            </div>
            <div className="form-section-custom">
                <h3>Benefits</h3>
                <div className="form-group-custom">
                    <label>Access to All Facilities</label>
                    <select name="accessToAllFacilities" value={formData.benefits.accessToAllFacilities} onChange={handleChange} required>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group-custom">
                    <label>Free Personal Trainer Sessions</label>
                    <input type="number" name="freePersonalTrainerSessions" value={formData.benefits.freePersonalTrainerSessions} onChange={handleChange} min="0" />
                </div>
                <div className="form-group-custom">
                <label>Free froup classes</label>
                    <select name="freeGroupClasses" value={formData.benefits.freeGroupClasses} onChange={handleChange} required>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group-custom">
                    <label>Nutrition Plan</label>
                    <select name="nutritionPlan" value={formData.benefits.nutritionPlan} onChange={handleChange} required>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group-custom">
                    <label>Guest Passes</label>
                    <input type="number" name="guestPasses" value={formData.benefits.guestPasses} onChange={handleChange} min="0" />
                </div>
                <div className="form-group-custom">
                    <label>Merchandise Discount (%)</label>
                    <input type="number" name="merchandiseDiscount" value={formData.benefits.merchandiseDiscount} onChange={handleChange} min="0" />
                </div>
                <div className="form-group-custom">
                    <label>Locker Services</label>
                    <select name="lockerServices" value={formData.benefits.lockerServices} onChange={handleChange} required>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group-custom">
                    <label>Parking</label>
                    <select name="parking" value={formData.benefits.parking} onChange={handleChange} required>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group-custom">
                    <label>Other Benefits</label>
                    <input type="text" name="other" value={formData.benefits.other} onChange={handleChange} />
                </div>
            </div>
            <button type="submit">Add Membership</button>
        </form>
    );
};

export default AddMembershipForm;

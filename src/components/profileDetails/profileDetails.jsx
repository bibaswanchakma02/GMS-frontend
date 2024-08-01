// ProfileDetails.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosconfig';  
import { useAuth } from '../../context/AuthContext';
import './profileDetails.scss';
import Loader from '../loader/loader';

const ProfileDetails = () => {
    const { auth } = useAuth();
    const [profile, setProfile] = useState(null);
    const [membershipExpanded, setMembershipExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updatedProfile, setUpdatedProfile] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/profile');
                setProfile(response.data);
                setUpdatedProfile({
                    username: response.data.username || '',
                    email: response.data.email || ''
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }finally{
                setLoading(false);
            }
        };
        fetchProfile();
    }, [auth.token]);

    const handleMembershipToggle = () => {
        setMembershipExpanded(!membershipExpanded);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await axiosInstance.put('/profile', updatedProfile, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setProfile(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

   if(loading){
    return <Loader/>
   }

    const {
        username,
        fullName,
        mobileNo,
        email,
        image,
        assignedTrainer,
        membership
    } = profile;

    return (
        <div className="profile-details-card">
            <div className="profile-header">
                {image ? <img src={image} alt="Profile" className="profile-image" /> : <div className="profile-placeholder">No Image</div>}
                <div className="profile-info">
                    {isEditing ? (
                        <>
                            <div className="edit-field">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={updatedProfile.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-field">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={updatedProfile.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>{username}</h2>
                            {fullName && <p>Full Name: {fullName}</p>}
                            <p>Mobile No: {mobileNo}</p>
                            <p>Email: {email}</p>
                        </>
                    )}
                    {assignedTrainer && <p>Assigned Trainer: {assignedTrainer}</p>}
                </div>
            </div>
            <button className="edit-button" onClick={handleEditToggle}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && <button className="save-button" onClick={handleSave}>Save</button>}
            {(auth.role === 'USER' || auth.role === 'TRAINER') && membership && (
                <div className="membership-section">
                    <div className="membership-header" onClick={handleMembershipToggle}>
                        <h3>Membership Package: {membership.packageName}</h3>
                        <button>{membershipExpanded ? 'Hide Details' : 'Show Details'}</button>
                    </div>
                    {membershipExpanded && (
                        <div className="membership-details">
                            <p>Price: ₹ {membership.price}</p>
                            <p>Payment Status: {membership.paymentStatus ? 'Paid' : 'Pending'}</p>
                            <p>Renewal Status: {membership.renewalStatus ? 'Renewed' : 'Not Renewed'}</p>
                            <p>Duration: {membership.duration} days</p>
                            <p>Start Date: {new Date(membership.membershipStartDate).toLocaleDateString()}</p>
                            <p>Expiry Date: {new Date(membership.membershipExpiryDate).toLocaleDateString()}</p>
                            <p>Status: {membership.status}</p>
                            <p>Payment Method: {membership.paymentMethod}</p>
                            <p>Notes: {membership.notes}</p>
                            <h4>Benefits:</h4>
                            <ul>
                                {membership.benefits.accessToAllFacilities && <li>Access to All Facilities</li>}
                                {membership.benefits.freePersonalTrainerSessions > 0 && <li>{membership.benefits.freePersonalTrainerSessions} Free Personal Trainer Sessions</li>}
                                {membership.benefits.freeGroupClasses && <li>Free Group Classes</li>}
                                {membership.benefits.nutritionPlan && <li>Nutrition Plan</li>}
                                {membership.benefits.guestPasses > 0 && <li>{membership.benefits.guestPasses} Guest Passes</li>}
                                {membership.benefits.merchandiseDiscount > 0 && <li>{membership.benefits.merchandiseDiscount}% Merchandise Discount</li>}
                                {membership.benefits.lockerServices && <li>Locker Services</li>}
                                {membership.benefits.parking && <li>Parking</li>}
                                {membership.benefits.other && <li>{membership.benefits.other}</li>}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;

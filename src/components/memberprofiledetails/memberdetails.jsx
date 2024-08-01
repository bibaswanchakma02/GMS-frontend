import './memberdetails.scss'
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosconfig'
import Loader from '../loader/loader';

const MemberProfileDetails = ({ username, onBack }) => {
    const [member, setMember] = useState(null);
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleRemoveUser = async () => {
        try {
            await axiosInstance.delete(`/admin/deletemember/${username}`);
            alert('User removed successfully');
            onBack();
        } catch (error) {
            console.error('Error removing user:', error);
            setError('Failed to remove user. Please try again.');
        }
    };


    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                const response = await axiosInstance.get(`/admin/getmember/${username}`);
                setMember(response.data);
            } catch (error) {
                console.error('Error fetching member details:', error);
                setError('Failed to fetch member details. Please try again.');
            }finally{
                setLoading(false);
            }
        };

        fetchMemberDetails();
    }, [username]);
    if(loading){
        return <Loader/>
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div className="member-profile-details">
            <div className="profile-card">
                <img src={member.image || 'default-profile.png'} alt={`${member.username}'s profile`} />
                <div className="profile-info">
                    <h2>{member.fullName || member.username}</h2>
                    <p><strong>Username:</strong> {member.username}</p>
                    <p><strong>Mobile No:</strong> {member.mobileNo}</p>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Assigned Trainer:</strong> {member.assignedTrainer ? member.assignedTrainer : 'N/A'}</p>
                </div>
            </div>
            {member.membership && (
                <div className="membership-details">
                    <h3>Membership Details</h3>
                    <p><strong>Package Name:</strong> {member.membership.packageName}</p>
                    <details>
                        <summary>More Details</summary>
                        <p><strong>Price:</strong> ₹ {member.membership.price}</p>
                        <p><strong>Payment Status:</strong> {member.membership.paymentStatus ? 'Paid' : 'Unpaid'}</p>
                        <p><strong>Renewal Status:</strong> {member.membership.renewalStatus ? 'Renewed' : 'Not Renewed'}</p>
                        <p><strong>Duration:</strong> {member.membership.duration} days</p>
                        <p><strong>Start Date:</strong> {new Date(member.membership.membershipStartDate).toLocaleDateString()}</p>
                        <p><strong>Expiry Date:</strong> {new Date(member.membership.membershipExpiryDate).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {member.membership.status}</p>
                        <p><strong>Payment Method:</strong> {member.membership.paymentMethod}</p>
                        <p><strong>Notes:</strong> {member.membership.notes}</p>
                    </details>
                </div>
            )}
            <button className="remove-user-button" onClick={() => setShowDialog(true)}>Remove User</button>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <p>Are you sure you want to remove this user?</p>
                        <button className="confirm-button" onClick={handleRemoveUser}>Yes</button>
                        <button className="cancel-button" onClick={() => setShowDialog(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberProfileDetails;
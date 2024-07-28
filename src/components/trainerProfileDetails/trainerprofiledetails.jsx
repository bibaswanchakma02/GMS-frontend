import './trainerprofiledetails.scss'
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosconfig';

const TrainerProfileDetails = ({ username, onBack }) => {
    const [trainer, setTrainer] = useState(null);
    const [error, setError] = useState('');
    const [showDialog, setShowDialog] = useState(false);

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
        const fetchTrainer = async () => {
            try {
                const response = await axiosInstance.get(`/admin/getmember/${username}`);
                setTrainer(response.data);
            } catch (error) {
                console.error('Error fetching trainer details:', error);
                setError('Failed to fetch trainer details. Please try again.');
            }
        };

        fetchTrainer();
    }, [username]);

    if (!trainer) {
        return (
            <div className="trainer-profile-details">
                {error && <p className="error">{error}</p>}
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="trainer-profile-details">
            
            <div className="trainer-info">
                <img src={trainer.image || 'default-profile.png'} alt={`${trainer.username}'s profile`} />
                <h2>{trainer.fullName || 'N/A'}</h2>
                <p>Username: {trainer.username}</p>
                <p>Email: {trainer.email}</p>
                <p>Phone: {trainer.phone}</p>
            </div>
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
            <button onClick={onBack}>Back to Trainers</button>
        </div>
    );
};

export default TrainerProfileDetails;

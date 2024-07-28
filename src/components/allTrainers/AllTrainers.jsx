import './alltrainers.scss'
import axiosInstance from '../../config/axiosconfig'
import { useEffect, useState } from 'react';

const AllTrainers = ({ onSelectTrainer }) => {
    const [trainers, setTrainers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axiosInstance.get('/admin/getallmembers');
                const users = response.data.filter(member => member.authorities.some(auth => auth.authority === 'TRAINER'));
                setTrainers(users);
            } catch (error) {
                console.error('Error fetching trainers:', error);
                setError('Failed to fetch trainers. Please try again.');
            }
        };

        fetchTrainers();
    }, []);

    return (
        <div className="all-trainers">
            <h2>All Trainers</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {trainers.map(trainer => (
                    <li key={trainer.id} onClick={() => onSelectTrainer(trainer.username)}>
                        <div className="trainer-card">
                            <img src={trainer.image || 'default-profile.png'} alt={`${trainer.username}'s profile`} />
                            <div>
                                <h3>{trainer.fullName || 'N/A'}</h3>
                                <p>{trainer.username}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllTrainers;

import './allMembers.scss'
import axiosInstance from '../../config/axiosconfig'
import { useEffect, useState } from 'react';


const AllMembers = ({ onSelectMember }) => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axiosInstance.get('/admin/getallmembers');
                const users = response.data.filter(member => member.authorities.some(auth => auth.authority === 'USER'));
                setMembers(users);
            } catch (error) {
                console.error('Error fetching members:', error);
                setError('Failed to fetch members. Please try again.');
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="all-members">
            <h2>All Members</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {members.map(member => (
                    <li key={member.id} onClick={() => onSelectMember(member.username)}>
                        <div className="member-card">
                            <img src={member.image || 'default-profile.png'} alt={`${member.username}'s profile`} />
                            <div>
                                <h3>{member.fullName || 'N/A'}</h3>
                                <p>{member.username}</p>
                            </div>
                            <div className={`membership-status ${member.membership.status.toLowerCase()}`}>
                            {member.membership.status}
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllMembers;
import './home.scss'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import ProfileDetails from '../../components/profileDetails/profileDetails';
import AddUserForm from '../../components/AddUserForm/addform';

const Home = () => {
    const { auth, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }
    const handleCardClick = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }


    return (
        <div className='home-container'>
            <div className="left-section">
                <ul>
                    <li
                        className={activeTab === 'home' ? 'active' : ''}
                        onClick={() => handleTabClick('home')}
                    >
                        Home
                    </li>
                    <li
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => handleTabClick('profile')}
                    >
                        My profile
                    </li>
                    {auth.role === 'USER' && (
                        <li
                            className={activeTab === 'viewTrainers' ? 'active' : ''}
                            onClick={() => handleTabClick('viewTrainers')}
                        >
                            View Trainers
                        </li>
                    )}
                    {auth.role === 'ADMIN' && (
                        <>
                            <li
                                className={activeTab === 'allMembers' ? 'active' : ''}
                                onClick={() => handleTabClick('allMembers')}
                            >
                                All Members
                            </li>
                            <li
                                className={activeTab === 'allTrainers' ? 'active' : ''}
                                onClick={() => handleTabClick('allTrainers')}
                            >
                                All Trainers
                            </li>
                            <li
                                className={activeTab === 'addMember' ? 'active' : ''}
                                onClick={() => handleTabClick('addMember')}
                            >
                                Add New Member
                            </li>
                            <li
                                className={activeTab === 'addMembership' ? 'active' : ''}
                                onClick={() => handleTabClick('addMembership')}
                            >
                                Add New Membership Package
                            </li>
                            <li
                                className={activeTab === 'viewPackages' ? 'active' : ''}
                                onClick={() => handleTabClick('viewPackages')}
                            >
                                View All Membership Packages
                            </li>
                        </>
                    )}
                    {auth.role === 'TRAINER' && (
                        <>
                            <li
                                className={activeTab === 'assignedMembers' ? 'active' : ''}
                                onClick={() => handleTabClick('assignedMembers')}
                            >
                                Assigned Members
                            </li>
                            <li
                                className={activeTab === 'newRequests' ? 'active' : ''}
                                onClick={() => handleTabClick('newRequests')}
                            >
                                New Requests
                            </li>
                        </>
                    )}
                    <li onClick={handleLogout}>Log out</li>
                </ul>
            </div>
            <div className="right-section">
            {activeTab === 'home' && (
                    <div className="cards-container">
                        <h2>Get started...</h2>
                        <div className="cards">
                            
                            <Card color="light-blue" onClick={() => handleCardClick('profile')}>
                                My Profile
                            </Card>
                            {auth.role === 'USER' && (
                                <Card color="light-yellow" onClick={() => handleCardClick('viewTrainers')}>
                                    View Trainers
                                </Card>
                            )}
                            {auth.role === 'ADMIN' && (
                                <>
                                    <Card color="light-green" onClick={() => handleCardClick('allMembers')}>
                                        All Members
                                    </Card>
                                    <Card color="light-pink" onClick={() => handleCardClick('allTrainers')}>
                                        All Trainers
                                    </Card>
                                    <Card color="light-purple" onClick={() => handleCardClick('addMember')}>
                                        Add New Member
                                    </Card>
                                    <Card color="light-red" onClick={() => handleCardClick('addMembership')}>
                                        Add New Membership Package
                                    </Card>
                                    <Card color="light-teal" onClick={() => handleCardClick('viewPackages')}>
                                        View All Membership Packages
                                    </Card>
                                </>
                            )}
                            {auth.role === 'TRAINER' && (
                                <>
                                    <Card color="light-brown" onClick={() => handleCardClick('assignedMembers')}>
                                        Assigned Members
                                    </Card>
                                    <Card color="light-gray" onClick={() => handleCardClick('newRequests')}>
                                        New Requests
                                    </Card>
                                </>
                            )}
                        </div>
                    </div>
                )}
                
                {activeTab === 'profile' && <ProfileDetails/>}
                {activeTab === 'viewTrainers' && <div>View Trainers</div>}
                {activeTab === 'allMembers' && <div>All Members</div>}
                {activeTab === 'allTrainers' && <div>All Trainers</div>}
                {activeTab === 'addMember' && <AddUserForm/>}
                {activeTab === 'addMembership' && <div>Add New Membership Package</div>}
                {activeTab === 'viewPackages' && <div>View All Membership Packages</div>}
                {activeTab === 'assignedMembers' && <div>Assigned Members</div>}
                {activeTab === 'newRequests' && <div>New Requests</div>}
            </div>
        </div>
    )
}

export default Home
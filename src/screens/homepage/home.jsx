import './home.scss'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import ProfileDetails from '../../components/profileDetails/profileDetails';
import AddUserForm from '../../components/AddUserForm/addform';
import AllMembers from '../../components/allMembers/AllMembers';
import MemberProfileDetails from '../../components/memberprofiledetails/memberdetails';
import AllTrainers from '../../components/allTrainers/AllTrainers';
import TrainerProfileDetails from '../../components/trainerProfileDetails/trainerprofiledetails';
import ViewAllMemberships from '../../components/Allmemberships/allmemberships';
import AddMembershipForm from '../../components/AddMembershipForm/addmembership';


const Home = () => {
    const { auth, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const [selectedMemberUsername, setSelectedMemberUsername] = useState(null);
    const [selectedTrainerUsername, setSelectedTrainerUsername] = useState(null);

    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);

    }

    const handleCardClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSelectMember = (username) => {
        setSelectedMemberUsername(username);
        setActiveTab('memberProfileDetails');
    };

    const handleSelectTrainer = (username) => {
        setSelectedTrainerUsername(username);
        setActiveTab('trainerProfileDetails');
    };


    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleBackToMembers = () => {
        setActiveTab('allMembers');
        setSelectedMemberUsername(null);
    };

    const handleBackToTrainers = () => {
        setActiveTab('allTrainers');
        setSelectedTrainerUsername(null);
    };



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
                        <>
                            <li
                                className={activeTab === 'viewTrainers' ? 'active' : ''}
                                onClick={() => handleTabClick('allTrainers')}
                            >
                                View Trainers
                            </li>
                            <li
                                className={activeTab === 'renewMembership' ? 'active' : ''}
                                onClick={() => handleTabClick('renewMembership')}
                            >
                                Renew Membership
                            </li>
                        </>

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
                                <>
                                    <Card color="light-yellow" onClick={() => handleCardClick('allTrainers')}>
                                        View Trainers
                                    </Card>
                                    <Card color="light-green" onClick={() => handleCardClick('renewMembership')}>
                                        Renew Membership
                                    </Card>
                                </>
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

                {activeTab === 'profile' && <ProfileDetails />}
                {activeTab === 'viewTrainers' && <AllTrainers onSelectTrainer={handleSelectTrainer} />}
                {activeTab === 'allMembers' && <AllMembers onSelectMember={handleSelectMember} />}
                {activeTab === 'allTrainers' && <AllTrainers onSelectTrainer={handleSelectTrainer} />}
                {activeTab === 'addMember' && <AddUserForm />}
                {activeTab === 'addMembership' && <AddMembershipForm />}
                {activeTab === 'viewPackages' && <ViewAllMemberships />}
                {activeTab === 'renewMembership' && <ViewAllMemberships isRenewal={true} />}
                {activeTab === 'assignedMembers' && <div>Assigned Members</div>}
                {activeTab === 'newRequests' && <div>New Requests</div>}
                {activeTab === 'memberProfileDetails' && selectedMemberUsername && (
                    <MemberProfileDetails username={selectedMemberUsername} onBack={handleBackToMembers} />
                )}
                {activeTab === 'trainerProfileDetails' && selectedTrainerUsername && (
                    <TrainerProfileDetails username={selectedTrainerUsername} onBack={handleBackToTrainers} />
                )}


            </div>
        </div>
    )
}

export default Home
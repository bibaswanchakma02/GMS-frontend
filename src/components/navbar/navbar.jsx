import { useAuth } from '../../context/AuthContext';
import './navbar.scss'

const Navbar = () => {

    const {auth, logout} = useAuth;

    return (
        <nav>
            <div className='navbar'>
                <h1><span>Gym Management System</span></h1>
            </div>
        </nav>
    )
}

export default Navbar
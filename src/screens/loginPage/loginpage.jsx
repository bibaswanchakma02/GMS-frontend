import { useState } from 'react'
import './loginpage.scss'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axiosconfig';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../components/loader/loader';

const Loginpage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/auth/login', { username, password });

            if (response.status === 200) {
                const { responseString: token } = response.data;

                const decodedToken = jwtDecode(token);
                const role = decodedToken.roles ? decodedToken.roles[0] : 'USER';
                const passwordResetRequired = decodedToken.passwordResetRequired || false;


                login(token, role);
                if (passwordResetRequired) {
                    navigate("/password/reset");
                } else {
                    navigate('/main');
                }

            }

        } catch (error) {
            console.error('Login failed', error);
            alert("Login failed. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            {loading ? (
                <Loader /> // Show loader if loading
            ) : (

                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="input-group">

                        <input
                            type="text"
                            value={username}
                            placeholder='username'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    )
}

export default Loginpage
import { useState } from 'react'
import './loginpage.scss'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axiosconfig';
import { jwtDecode } from 'jwt-decode';

const Loginpage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/auth/login', { username, password });

            if (response.status === 200) {
                const { responseString: token } = response.data;

                const decodedToken = jwtDecode(token);
                const role = decodedToken.roles ? decodedToken.roles[0] : 'USER';

                login(token, role);
                navigate('/main');

            }

        } catch (error) {
            console.error('Login failed', error);
            alert("Login failed. Please try again");
        }
    }

    return (
        <div className="login-container">
           
            
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
        </div>
    )
}

export default Loginpage
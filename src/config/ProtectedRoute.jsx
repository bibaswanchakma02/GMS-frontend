import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element }) => {
    const { auth } = useAuth();

    if (!auth.token || auth.isTokenExpired) {
        return <Navigate to="/" />
    }
    return element;
}

export default ProtectedRoute
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('https://localhost:7274/api/Login/login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response?.data?.token;
            if (token) {
                localStorage.setItem('token', token);
                axios.defaults.headers.common["Authorization"] = token;
                const res = await axios.get(`https://localhost:7274/api/User/getByUsername/${username}`,{headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
                console.log(res.data.roleId);
                localStorage.setItem('UserId',res.data.id);
                localStorage.setItem('RoleId',res.data.roleId);
               
                return { success: true };
                
            } else {
                return { success: false, message: 'Login failed: No token received.' };
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return { success: false, message: 'Invalid username or password. Please try again.' };
            } else {
                return { success: false, message: 'An error occurred while logging in. Please try again later.' };
            }
        }
    };

    const handleLoginIntern = async () => {
        const result = await handleLogin(username, password);
        console.log(result);
        if (result && result.success) {
            navigate(`/list`);
        } else {
            setError("Login failed. Please check your username and password and try again."); 
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={handleLoginIntern} className="login-button">Login</button>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
            </div>
        </div>
    );
};

export default Login;
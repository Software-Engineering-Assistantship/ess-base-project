import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import '../style/Users.css';
import logo from "../assets/logo.svg";

const API_BASE = "http://localhost:3001";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE}/users`);
                setUsers(response.data);
                setError('');
            } catch (error) {
                if (error.response) {
                    console.error('Error fetching users:', error.response.data);
                    setError('Failed to fetch users: ' + error.response.data.message);
                } else if (error.request) {
                    console.error('Error fetching users:', error.request);
                    setError('No response received.');
                } else {
                    console.error('Error message:', error.message);
                    setError('Error: ' + error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>  
            <div className="headerinicial">
                <img src={logo} alt="logo" className="logo4" />
            </div>
            <div className="users-page">
                <h1>Users List</h1>
                {loading && <div className="loading">Loading users...</div>}
                {error && <div className="error-message">{error}</div>}
                <ul className='alluserinfo'>
                    {users.map(user => (
                        <li key={user._id} className='infouser'>
                            <div className="user-details">
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                                {/* Other user details can go here */}
                            </div>
                            <Link to={`/users/${user._id}`} className='buttonuserpage'>View Profile</Link> {/* Updated line */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Users;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Users.css';
import logo from "../assets/logo.svg";

const API_BASE = "http://localhost:3001";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
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

    // Filter users based on the search term
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>  
            <div className="users-page">
                <h1 className='nameuserlist2'>Lista de Usuários</h1>
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="search-bar"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} // Update search term based on user input
                />
                {loading && <div className="loading">Carregando Usuários...</div>}
                {error && <div className="error-message">{error}</div>}
                <ul className='alluserinfo'>
                    {filteredUsers.map(user => ( // Use filteredUsers here
                        <li key={user._id} className='infouser'>
                            <div className="user-details">
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                            </div>
                            <Link to={`/users/${user._id}`} className='buttonuserpage'>Ver Perfil</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Users;

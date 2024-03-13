import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Users.css'; 
import noprofileimage from '../assets/noprofileimage.png'; 
const API_BASE = "http://localhost:3001";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE}/users`);
                setUsers(response.data); // Assuming response.data is an array of user objects
                setError('');
            } catch (error) {
                // Handle error
                console.error('Error fetching users:', error);
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
                    onChange={e => setSearchTerm(e.target.value)}
                />
                {loading && <div className="loading">Carregando Usuários...</div>}
                {error && <div className="error-message">{error}</div>}
                <ul className='alluserinfo'>
                    {filteredUsers.map(user => (
                    <li key={user._id} className='infouser'>
                    <div className="user-image-container">
                        <img 
                            src={user.profileImage ? `${API_BASE}/${user.profileImage}` : noprofileimage} 
                            alt={`${user.name}'s profile`} 
                            className="user-image"
                        />
                    </div>
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

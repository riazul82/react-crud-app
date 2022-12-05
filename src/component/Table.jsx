import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Table = ({searchData}) => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteStatus, setDeleteStatus] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    const url = 'https://crud-app-rest-api-production.up.railway.app/users';
    
    const getUsers = useCallback(() => {
        fetch(url)
        .then((res) => {
            if(!res.ok){
                throw new Error(`Error!`);
            }
            return res.json();
        })
        .then((data) => {
            setUsers(data.users);
        })
        .catch((err) => {
            console.log(err.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [url]);

    const handleDeleteLoading = (msg) => {
        setDeleteStatus(msg);
        setTimeout(() => {
            setDeleteLoading(false);
        }, 5000);
    }

    const handleDelete = (id) => {
        setDeleteLoading(true);
        setDeleteStatus('deleting...');

        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then((res) => {
            if(!res.ok){
                throw new Error('An error caught!');
            }
            getUsers();
            handleDeleteLoading('deleted!');
        })
        .catch((err) => {
            handleDeleteLoading(err.message);
        });
    }

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr><td style={{padding: '0.6rem 0', border: 'none', textAlign: 'left'}}>loading...</td></tr>}
                    {   
                        !loading && (!users.length ? <tr><td style={{padding: '0.6rem 0.2rem', border: 'none', textAlign: 'left'}}>No user found!</td></tr> : users.filter((user) => {
                            if (searchData === '') {
                                return user;
                            } else if (user.username.toLowerCase().includes(searchData.toLowerCase())) {
                                return user;
                            } else if (user.email.toLowerCase().includes(searchData.toLowerCase())) {
                                return user;
                            } else if (user.phone.toString().includes(searchData.toString())) {
                                return user;
                            } else {
                                return null;
                            }
                        }).map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <Link to='/form' className="updateBtn" state={{type: 'update', id: user._id, username: user.username, email: user.email, phone: user.phone}}><FontAwesomeIcon style={{color: '#333', fontSize: '1.2rem'}} icon={faPenToSquare} /></Link>
                                        <button className="deleteBtn" onClick={() => handleDelete(user._id)}><FontAwesomeIcon style={{color: '#333', fontSize: '1.2rem'}} icon={faTrash} /></button>
                                    </td>
                                </tr>
                            );
                        }))
                    }
                </tbody>
            </table>
            {deleteLoading && <p style={(deleteStatus === 'deleting...') ? {backgroundColor: 'crimson'} : {backgroundColor: 'red'}} className="delete-status">{deleteStatus}</p>}
        </>
        
    );
}

export default Table;
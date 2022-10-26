import React from 'react';
import { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Table = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = 'https://crud-app-rest-api.herokuapp.com/users';
    
    const getUsers = useCallback(() => {
        fetch(url)
        .then((res) => {
            if(!res.ok){
                throw new Error(`Error!`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setUsers(data.users);
        })
        .catch((err) => {
            console.log(err.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [url]);

    const handleDelete = (id) => {
        fetch(url + `/${id}`, {
            method: 'DELETE'
        })
        .then((res) => {
            if(!res.ok){
                throw new Error('An error caught!');
            }
            getUsers();
            console.log(res.status);
            console.log('user deleted!');
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
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
                {loading && <p style={{padding: '0.4rem 0'}}>loading...</p>}
                {
                    !loading && users.map((user, index) => {
                        return (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Link to='/form' className="updateBtn" state={{type: 'update', id: user._id, username: user.username, email: user.email, phone: user.phone}}>Update</Link>
                                    <button className="deleteBtn" onClick={() => handleDelete(user._id)}>delete</button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export default Table;
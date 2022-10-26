import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Form = () => {
    const [user, setUser] = useState({username: '', email: '', phone: ''});
    const { username, email, phone } = user;

    const location = useLocation();
    const url = 'https://crud-app-rest-api.herokuapp.com/users';

    useEffect(() => {
        if (location.state.type === 'update') {
            setUser({
                username: location.state.username,
                email: location.state.email,
                phone: location.state.phone
            });
        }
    }, [location.state.type, location.state.username, location.state.email, location.state.phone]);
    
    const createUser = (url, data) => {
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.status !== 201) {
                console.log(res)
                throw new Error('Could not create user!');
            }
            console.log(res.status);
            console.log('user created!');
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location.state.type === 'create') {
            if (user.phone.length !== 10) {
                return alert('Phone must be 10 digits!');
            }
            createUser(url, user);
            setUser({username: '', email: '', phone: ''});
        }
        if (location.state.type === 'update') {

        }
    }

    return (
        <div className="form-container">
            <div className="title">
                <h1>{location.state.type} User</h1>
            </div>
            <form action="/" onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type="text" name="username" onChange={handleChange} value={username} placeholder="Username" required />
                </div>
                <div className="input-field">
                    <input type="email" name="email" onChange={handleChange} value={email} placeholder="Email" required />
                </div>
                <div className="input-field">
                    <input type="number" name="phone" onChange={handleChange} value={phone} placeholder="Phone" required />
                </div>
                <div className="button-field">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Form;

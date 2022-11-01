import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Form = () => {
    const [user, setUser] = useState({username: '', email: '', phone: ''});
    const { username, email, phone } = user;

    const location = useLocation();
    const url = 'https://user-crud-aaap.herokuapp.com/users';

    useEffect(() => {
        if (location.state.type === 'update') {
            setUser({
                username: location.state.username,
                email: location.state.email,
                phone: location.state.phone
            });
        }
    }, [location.state.type, location.state.username, location.state.email, location.state.phone]);
    
    const createUser = (data) => {
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.status === 403) {
                throw new Error('user already exist!');
            } else if (res.status !== 201) {
                throw new Error('could not create user!');
            } 
            console.log('user created!');
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const updateUser = (data) => {
        fetch(`${url}/${location.state.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if(!res.ok){
                throw new Error('Failed To Update!');
            }
            console.log('user updated!');
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
            createUser(user);
            setUser({username: '', email: '', phone: ''});
        }
        if (location.state.type === 'update') {
            if (user.phone.length !== 10) {
                return alert('Phone must be 10 digits!');
            }
            updateUser(user);
            setUser({username: '', email: '', phone: ''});
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
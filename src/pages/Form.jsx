import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Form = () => {
    const [user, setUser] = useState({username: '', email: '', phone: ''});
    const [loadingMessage, setLoadingMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingFlag, setLoadingFlag] = useState(false);
    const [successFlag, setSuccessFlag] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const { username, email, phone } = user;

    const navigate = useNavigate();
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
    
    const handleLoadingMessage = (msg) => {
        setLoadingMessage(msg);
        setLoadingFlag(true);
    }

    const handleSuccessMessages = (msg) => {
        setSuccessMessage(msg);
        setSuccessFlag(true);
        setTimeout(() => {
            setSuccessFlag(false);
        }, 5000);
    }

    const handleErrorMessage = (msg) => {
        setErrorMessage(msg);
        setErrorFlag(true);
        setTimeout(() => {
            setErrorFlag(false);
        }, 5000);
    }

    const createUser = (data) => {
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.status === 201) {
                handleSuccessMessages('user created!');
                setUser({username: '', email: '', phone: ''});
                setLoadingFlag(false);
            } else if (res.status === 403) {
                return res.json();
            } else {
                throw new Error('could not create user!');
            }
        })
        .then((body) => {
            if (body !== undefined) {
                handleErrorMessage(body.message);
                setLoadingFlag(false);
            }
        })
        .catch((err) => {
            handleErrorMessage(err.message);
            setLoadingFlag(false);
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
            if (res.status === 200) {
                handleSuccessMessages('user updated!');
                setUser({username: '', email: '', phone: ''});
                setLoadingFlag(false);
            } else if (res.status === 403) {
                return res.json();
            } else {
                throw new Error('could not update user!');
            }
        })
        .then((body) => {
            if (body !== undefined) {
                handleErrorMessage(body.message);
                setLoadingFlag(false);
            }
        })
        .catch((err) => {
            handleErrorMessage(err.message);
            setLoadingFlag(false);
        });
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location.state.type === 'create') {
            if (user.username.includes(' ')) {
                return alert('Username cannot contain spaces!');
            }
            if (user.phone.toString().length !== 10) {
                return alert('Phone must be 10 digits!');
            }
            createUser(user);
            handleLoadingMessage('creating...');
        }

        if (location.state.type === 'update') {
            if (user.username.includes(' ')) {
                return alert('Username cannot contain spaces!');
            }
            if (user.phone.toString().length !== 10) {
                return alert('Phone must be 10 digits!');
            }
            updateUser(user);
            handleLoadingMessage('updating...');
        }
    }

    return (
        <div className="form-container">
            {loadingFlag && <div className="status-box">
                <p className="loading">{loadingMessage}</p>
            </div>}
            {successFlag && <div className="status-box">
                <p className="success">{successMessage}</p>
            </div>}
            {errorFlag && <div className="status-box">
                <p className="error">{errorMessage}</p>
            </div>}
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

            <div className="redirect-btn-box">
                <button onClick={() => navigate('/')} className="redirect-btn">Back to Home</button>
            </div>
        </div>
    );
}

export default Form;
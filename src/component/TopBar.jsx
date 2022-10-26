import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className="topBar">
            <div className="btnTopbar">
                <Link to='/form' state={{type: 'create'}} className="crete-user-btn">Create User</Link>
            </div>
            <div className="searchBox">
                <input type="text" placeholder="Search..." />
            </div>
        </div>
    );
}

export default TopBar;
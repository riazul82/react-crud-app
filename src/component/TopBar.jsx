import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({searchText}) => {
    const [searchData, setSearchData] = useState('');

    useEffect(() => {
        searchText(searchData);
    }, [searchData, searchText]);

    const handleSearch = (e) => {
        setSearchData(e.target.value);
    }

    return (
        <div className="topBar">
            <div className="btnTopbar">
                <Link to='/form' state={{type: 'create'}} className="crete-user-btn">Create User</Link>
            </div>
            <div className="searchBox">
                <input type="text" onChange={handleSearch} placeholder="Search..." />
            </div>
        </div>
    );
}

export default TopBar;
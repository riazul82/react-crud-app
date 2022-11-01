import React, { useState } from 'react';
import Table from '../component/Table';
import TopBar from '../component/TopBar';

const Home = () => {
    const [searchData, setSearchData] = useState('');

    const getSearchData = (data) => {
        setSearchData(data);
    }

    return (
        <div className='container'>
            <TopBar searchText={getSearchData} />
            <Table searchData={searchData} />
        </div>
    );
}

export default Home;

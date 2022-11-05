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
            <div className="topbarArea">
                <TopBar searchText={getSearchData} />
            </div>
            <div className="tableArea">
                <Table searchData={searchData} />
            </div>
        </div>
    );
}

export default Home;

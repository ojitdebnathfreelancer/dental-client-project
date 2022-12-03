import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Sheared/Footer/Footer';
import Navbar from '../Sheared/Navbar/Navbar';

const Main = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;
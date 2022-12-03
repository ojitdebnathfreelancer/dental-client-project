import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthProvider';

const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        userLogout()
            .then(() => {
                localStorage.clear();
                navigate('/signin');
            })
            .catch(error => console.error(error))
    };
    // logout handel 

    const menuItmes = <>
        <li className='ml-3'><Link to="/">Home</Link></li>
        <li className='ml-3'><Link to="/appointment">Doctor appointment</Link></li>
        {
            user?.uid ?
                <>
                    <li className='ml-3'><Link to="/deshboard">Deshboard</Link></li>
                    <button onClick={logout} className='btn btn-secondary text-white ml-3'>
                        Sign Out
                    </button>
                </>
                :
                <Link to="/signin">
                    <button className='btn btn-secondary text-white ml-3'>
                        Login
                    </button>
                </Link>


        }
        <li className='ml-3'>{user?.displayName}</li>
    </>
    return (
        <div className="navbar bg-base-100 flex justify-between lg:justify-around">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={1} className="btn btn-ghost lg:hidden">
                        <FaBars size={20} />
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItmes}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Dental Health</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 items-center">
                    {menuItmes}
                </ul>
            </div>
            <label htmlFor="appointment-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                Deshboard
            </label>
        </div>
    );
};

export default Navbar;
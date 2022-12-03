import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import UseAdmin from '../../Hooks/UseAdmin';
import Navbar from '../../Sheared/Navbar/Navbar';

const DeshboardLayout = () => {
    
    const { user } = useContext(AuthContext);
    const [isAdmin] = UseAdmin(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="appointment-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="appointment-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        <li><Link to='/deshboard'>My Appointment</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/deshboard/allusers'>All Users</Link></li>
                                <li><Link to='/deshboard/adddoctor'>Add A Doctor</Link></li>
                                <li><Link to='/deshboard/managedoctors'>Manage Doctors</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DeshboardLayout;
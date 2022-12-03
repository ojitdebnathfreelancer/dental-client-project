import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AllModal from '../../../Sheared/Modal/AllModal';
import Moda from '../../../Sheared/Modal/Moda';

const AllUsers = () => {
    const [deleteUser, setDeleteUser] = useState(null);
    // delete user 
    const closeModal = () => {
        setDeleteUser(null);
    };
    // close modal 

    const { data: users = [], refetch } = useQuery({
        queryKey: ["allusers"],
        queryFn: async () => {
            const res = await fetch('https://doctor-portal-server-smoky.vercel.app/allusers', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    // get all users 

    const handelMakeAdmin = id => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Make admin sucessful")
                    refetch();
                }
            })
    }
    // make admin funtion 

    const handelDelete = user => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/users/${user._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Deleted Successfull")
                    refetch();
                }
            })
    };
    // delete user 

    const [allDelete, setAllDelete] = useState(false);

    const closeAllModal = () => {
        setAllDelete(false);
    };
    const handelDeleteAll = () => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/useralldelete`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Deleted All Successfull Not Admins")
                    refetch();
                }
            })
    };
    // delete all users 

    return (
        <div>
            {
                users &&
                <>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th className='text-center'>
                                        <label htmlFor="allModal" onClick={() => setAllDelete(true)} className='btn btn-accent btn-sm'>Delete All</label>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className='text-center'>
                                            {
                                                user.role !== 'admin' &&
                                                <button onClick={() => handelMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>
                                            }
                                        </td>
                                        <td className='text-center'>
                                            <label onClick={() => setDeleteUser(user)} htmlFor="modal" className='btn btn-xs btn-accent'>Delete</label>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        {
                            deleteUser &&
                            <Moda
                                title={`Are you sure you want to delete?`}
                                message={`If you delete ${deleteUser.name}. it cannot be undone`}
                                closeModal={closeModal}
                                succesAction={handelDelete}
                                modalData={deleteUser}
                            >
                            </Moda>
                        }
                        {
                            allDelete &&
                            <AllModal
                                setAllDelete={setAllDelete}
                                closeAllModal={closeAllModal}
                                allsuccesAction={handelDeleteAll}
                                allmessage={'Are you want to delete all users?'}
                            >

                            </AllModal>
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default AllUsers;
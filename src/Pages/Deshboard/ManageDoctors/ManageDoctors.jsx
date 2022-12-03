import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../Sheared/Loading/Loading';
import AllModal from '../../../Sheared/Modal/AllModal';
import Moda from '../../../Sheared/Modal/Moda';
import Doctor from './Doctor/Doctor';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);

    const closeModal = () => {
        setDeleteDoctor(null);
    };
    // close modal 

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctor-portal-server-smoky.vercel.app/doctors', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });
    // doctors all data loading from db

    const handelDelDoctor = doctor => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success('Delete Successful');
                }
            })
    };
    // doctor delete 

    const [allDelete, setAllDelete] = useState(false);

    const closeAllModal = () => {
        setAllDelete(false);
    };
    const handelDeleteAll = () => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/alldeletedoctors`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Deleted All Successfull")
                    refetch();
                }
            })
    };
    // delete all users

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            {
                doctors ?
                    <div className='mt-5'>
                        <h2 className='text-3xl text-center mb-5'>Total Doctors {doctors.length}</h2>
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th>Speciality</th>
                                        <th className='text-center'>
                                            <label>
                                                <label htmlFor="allModal" onClick={() => setAllDelete(true)} className='btn btn-accent btn-sm capitalize'>Delete All</label>
                                            </label>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        doctors.map((doctor, index) => <Doctor key={doctor._id} doctor={doctor} index={index} setDeleteDoctor={setDeleteDoctor}></Doctor>)
                                    }
                                </tbody>

                            </table>
                        </div>
                        {
                            deleteDoctor &&
                            <Moda
                                title={`Are you sure you want to delete?`}
                                message={`If you delete ${deleteDoctor.name}. it cannot be undone`}
                                closeModal={closeModal}
                                succesAction={handelDelDoctor}
                                modalData={deleteDoctor}
                            >
                            </Moda>
                        }
                        {
                            allDelete &&
                            <AllModal
                                setAllDelete={setAllDelete}
                                closeAllModal={closeAllModal}
                                allsuccesAction={handelDeleteAll}
                                allmessage={'Are you want to delete all doctors?'}
                            >

                            </AllModal>
                        }
                    </div>
                    :
                    <p className='text-3xl text-center mt-5'>No Data Aivalable</p>
            }
        </div>
    );
};

export default ManageDoctors;
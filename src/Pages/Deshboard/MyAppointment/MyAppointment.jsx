import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import AllModal from '../../../Sheared/Modal/AllModal';
import Moda from '../../../Sheared/Modal/Moda';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const [showCalender, setShowCalender] = useState(false);

    const [showDate, setShowDate] = useState(new Date());
    const [changeDate, setChangeDate] = useState('');

    const allBooking = () => {
        setChangeDate('');
    }

    const newDate = date => {
        if (!date) {
            return;
        }
        setShowDate(date);
    };
    // for calander error handel

    const [deleteBook, setDeleteBook] = useState(null);
    const closeModal = () => {
        setDeleteBook(null);
    };
    // close modal 

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ["bookings", user, changeDate],
        queryFn: async () => {
            let query
            if (!changeDate) {
                query = changeDate;
            }
            else {
                query = format(showDate, 'PP');
            }

            const res = await fetch(`https://doctor-portal-server-smoky.vercel.app/bookings?email=${user?.email}&date=${query}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    // booking data load 

    const handelDelete = book => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/bookdelete/${book._id}?email=${user.email}`, {
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
    // delete book 

    const [allDelete, setAllDelete] = useState(false);

    const closeAllModal = () => {
        setAllDelete(false);
    };
    const handelDeleteAll = () => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/bookalldelete?email=${user.email}`, {
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
    // delete all book 

    return (
        <div className='mt-10'>
            <div className='flex justify-between mb-5 relative'>
                <h3 className='text-2xl'>My Appointment</h3>
                <div>
                    <button onClick={allBooking} className='btn btn-outline btn-secondary mr-2'>All Booked</button>
                    <button className='btn btn-outline btn-secondary' onClick={() => setShowCalender(!showCalender)}>{format(showDate, 'PP')}</button>
                </div>
                <div className={`${showCalender ? 'block' : 'hidden'} bg-slate-100 absolute right-5 top-14 z-10 rounded-lg`}>
                    <DayPicker
                        mode="single"
                        selected={showDate}
                        onSelect={newDate}
                        onDayClick={setChangeDate}
                    />
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Treatment</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Payment</th>
                                <th className='text-center'>
                                    <label htmlFor="allModal" onClick={() => setAllDelete(true)} className='btn btn-accent btn-sm'>Delete All</label>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.status === 0 ? null :
                                    bookings.map((book, index) => <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{book.patientName}</td>
                                        <td>{book.treatment}</td>
                                        <td>{book.appointmentDate}</td>
                                        <td>{book.slot}</td>
                                        <td className='text-center'>
                                            {
                                                !book.paid &&
                                                <Link to={`/deshboard/payment/${book._id}`}>
                                                    <button className='btn btn-primary btn-sm'>Pay</button>
                                                </Link>
                                            }
                                            {
                                                book.paid &&
                                                <>
                                                    <button className='text-green-500 btn-sm font-bold'>Paid</button>
                                                    <Link to='/deshboard/join'>
                                                        <button className='btn text-green-500 btn-sm'>Join</button>
                                                    </Link>
                                                </>
                                            }
                                        </td>
                                        <td className='text-center'>
                                            <label onClick={() => setDeleteBook(book)} htmlFor="modal" className='btn btn-accent btn-sm'>Delete</label>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                    {
                        deleteBook &&
                        <Moda
                            title={`Are you sure you want to delete?`}
                            message={`If you delete ${deleteBook.treatment}. it cannot be undone`}
                            closeModal={closeModal}
                            succesAction={handelDelete}
                            modalData={deleteBook}
                        >
                        </Moda>
                    }
                    {
                        allDelete &&
                        <AllModal
                            setAllDelete={setAllDelete}
                            closeAllModal={closeAllModal}
                            allsuccesAction={handelDeleteAll}
                            allmessage={'Are you want to delete all booking?'}
                        >

                        </AllModal>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyAppointment;
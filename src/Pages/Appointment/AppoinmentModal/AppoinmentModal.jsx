import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import toast from 'react-hot-toast'

const AppoinmentModal = ({ selected, selectedServies, setSelectedServies, refetch }) => {

    const { user } = useContext(AuthContext);

    const { name, price, slots } = selectedServies;

    const date = format(selected, "PP");

    const handelSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const patientName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;

        const booking = {
            treatment: name,
            appointmentDate: date,
            slot,
            patientName,
            email,
            phone,
            price
        }

        fetch(`https://doctor-portal-server-smoky.vercel.app/bookings?email=${user?.email}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setSelectedServies(null);
                    toast.success("Your appointment confirm");
                    refetch();
                }
                else{
                    toast.error(data.message);
                }
            });
    };

    return (
        <div>
            {
                selectedServies &&
                <>
                    <input type="checkbox" id="appointModal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="appointModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold mb-10">{name}</h3>
                            <form onSubmit={(e) => handelSubmit(e)} className='grid grid-cols-1 gap-5'>
                                <input type="text" placeholder="Date"
                                    disabled
                                    value={date} className="input input-bordered w-full" />
                                <select name='slot' className="select input-bordered w-full">
                                    {
                                        slots && slots.map((slot, index) => <option key={index}>{slot}</option>)
                                    }
                                </select>
                                <input type="text" placeholder="Full Name"
                                    name="name"
                                    defaultValue={user?.displayName} required
                                    disabled className="input input-bordered w-full" />
                                <input type="text" required placeholder="Phone Number"
                                    name="phone" className="input input-bordered w-full" />
                                <input type="email"
                                    name="email"
                                    disabled
                                    defaultValue={user?.email} placeholder="Email" required className="input input-bordered w-full" />
                                <button className='btn w-full'>Submit</button>
                            </form>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default AppoinmentModal;
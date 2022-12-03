import React from 'react';

const Doctor = ({ doctor, index, setDeleteDoctor }) => {

    const { name, email, image, speciality, } = doctor;
    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="doctor" />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{name}</div>
                    <div className="text-sm opacity-50">{email}</div>
                </div>
            </td>
            <td>
                {speciality}
            </td>
            <th className='text-center'>
                <label onClick={()=> setDeleteDoctor(doctor)} htmlFor="modal" className="btn btn-accent btn-sm text-white capitalize">Delete</label>
            </th>
        </tr>
    );
};

export default Doctor;
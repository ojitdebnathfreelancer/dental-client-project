import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Sheared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const hostImgKey = process.env.REACT_APP_imgdb_key;

    const navigate = useNavigate();

    const handelAddDoctor = data => {
        const photo = data.photo[0];
        const formData = new FormData();
        formData.append('image', photo);

        const url = `https://api.imgbb.com/1/upload?key=${hostImgKey}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const doctor = {
                    name: data.name,
                    email: data.email,
                    speciality: data.speciality,
                    image: imgData.data.url
                };

                fetch('https://doctor-portal-server-smoky.vercel.app/doctors', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(doctor)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success(`${data.name} is added successful`);
                            navigate('/deshboard/managedoctors');
                        }
                    })
            })
    };

    const { data: speciality = [], isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch('https://doctor-portal-server-smoky.vercel.app/servicesSpeciality', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='h-full lg:flex justify-center items-center px-3'>
            <div className='max-w-lg bg-slate-100 p-3 rounded-lg'>
                <form onSubmit={handleSubmit(handelAddDoctor)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Name</span>
                        </label>
                        <input type="text" className="input input-bordered" {...register("name", { required: "Please type your name" })} />
                        {
                            errors.name && <p className='text-red-500'>{errors.name.message}</p>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email" className="input input-bordered" {...register("email", { required: "Please type a valid email" })} />
                        {
                            errors.email && <p className='text-red-500'>{errors.email.message}</p>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Speciality</span>
                        </label>
                        <select
                            {
                            ...register('speciality')
                            }
                            className="select select-bordered w-full">
                            {
                                speciality.map(spc => <option key={spc._id} value={spc.name}>{spc.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Photo</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" {...register("photo", { required: "Please put a photo" })} />
                        {
                            errors.photo && <p className='text-red-500'>{errors.photo.message}</p>
                        }
                    </div>
                    <div className="form-control mt-5">
                        <button className="btn btn-accent">Add Doctor</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
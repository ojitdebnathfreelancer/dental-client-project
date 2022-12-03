import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/UseToken';

const Signup = () => {
    const { createUser, userUpdate, createGoogleUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [createdEmail, setCreatedEmail] = useState('');
    const [token] = useToken(createdEmail);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handelSignup = data => {
        setError('');
        createUser(data.email, data.password)
            .then(() => {
                updatedUser(data.name);
                toast('User created successfully');
            })
            .catch(error => setError(error.message));
        // create user 

        const updatedUser = (name) => {
            const profile = {
                displayName: name,
                photoURL: ''
            };

            userUpdate(profile)
                .then(() => {
                    saveUser(name, data.email)
                })
                .catch(error => setError(error.message));
        };
        // user update 
    };
    // sign up user 

    const handelGoogle = () => {
        createGoogleUser()
            .then((result) => {
                const user = result.user;
                saveUser(user.displayName, user.email);
                setCreatedEmail(user.email);
            })
            .catch(error => setError(error.message))
    };
    // create user by google 


    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('https://doctor-portal-server-smoky.vercel.app/users', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setCreatedEmail(email);
                }
            })
    };
    // user save fnu

    return (
        <div className='py-5'>
            <div className="hero-content mx-auto">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <p className='text-center text-3xl mt-10'>Sign Up</p>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handelSignup)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" className="input input-bordered" {...register("name", { required: "Please type your name" })} />
                                {
                                    errors.name && <p className='text-red-500'>{errors.name.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" className="input input-bordered" {...register("email", { required: "Please type a valid email" })} />
                                {
                                    errors.email && <p className='text-red-500'>{errors.email.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    className="input input-bordered"
                                    {...register("password",
                                        {
                                            required: "Please type a password",
                                            minLength: { value: 8, message: "Password must be 8 characters or longer" },
                                            pattern: { value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/, message: "Password must be strong" }
                                        })
                                    }
                                />
                                {
                                    errors.password && <p className='text-red-500'>{errors.password.message}</p>
                                }
                            </div>
                            <p className='text-center text-red-500 mt-2'>{error}</p>
                            <div className="form-control mt-5">
                                <button className="btn btn-accent">Sign Up</button>
                            </div>
                        </form>
                        <p className='text-center'>You have alredy and accoutn <Link className='text-primary' to="/signin">Please sign in</Link></p>
                        <div className="divider">OR</div>
                        <button onClick={handelGoogle} className='btn btn-outline'>continue with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/UseToken';

const Signin = () => {
    const { loginUser, createGoogleUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const [CreatedEmail, setCreatedEmail] = useState('');
    const [token] = useToken(CreatedEmail);
    
    if (token) {
        navigate(from, { replace: true })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const hanelUserLogin = (data) => {

        setError("");

        loginUser(data.email, data.password)
            .then(() => {
                setCreatedEmail(data.email);
            })
            .catch(error => setError(error.message));
    };
    // user singin 

    const handelgoogle = () => {
        createGoogleUser()
            .then((result) => {
                const user = result.user;
                saveUser(user.displayName, user.email);
                setCreatedEmail(user.email);
            })
            .catch(error => setError(error.message));
    };

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

    return (
        <div className='py-10'>
            <div className="hero-content mx-auto">
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <p className='text-center text-3xl mt-10'>Login</p>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(hanelUserLogin)}>
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
                                <input type="password" className="input input-bordered" {...register("password", { required: "Type a password " })} />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                                <label className="label">
                                    <Link to="/" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <p className='text-center text-red-500'>{error}</p>
                            <div className="form-control mt-3">
                                <button className="btn btn-accent">Login</button>
                            </div>
                        </form>
                        <p className='text-center'>You have alredy an acount <Link className='text-primary' to="/signup">Create new account</Link></p>
                        <div className="divider">OR</div>
                        <button onClick={handelgoogle} className='btn btn-outline'>continue with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
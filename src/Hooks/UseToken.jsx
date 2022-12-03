import { useEffect, useState } from "react";

const useToken = email => {

    const [token, setToken] = useState('');

    useEffect(() => {
        if(!email) return;
        fetch(`https://doctor-portal-server-smoky.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                }
            })
    }, [email])
    return [token];
}

export default useToken;
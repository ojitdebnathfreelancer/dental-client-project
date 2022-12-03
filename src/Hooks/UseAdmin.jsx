import { useEffect, useState } from "react"

const UseAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        fetch(`https://doctor-portal-server-smoky.vercel.app/users/admin/${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
            })
    }, [email])

    return [isAdmin, isAdminLoading];
}

export default UseAdmin;
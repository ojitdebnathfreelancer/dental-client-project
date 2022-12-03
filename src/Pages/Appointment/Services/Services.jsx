import { format } from 'date-fns';
import Servies from '../Servies/Servies';
import { useQuery } from '@tanstack/react-query';
import AppoinmentModal from '../AppoinmentModal/AppoinmentModal';
import { useState } from 'react';
import Loading from '../../../Sheared/Loading/Loading';

const Services = ({ selected }) => {

    const [selectedServies, setSelectedServies] = useState(null);

    const handelSelectServies = (servies) => {
        setSelectedServies(servies);
    };

    const date = format(selected, "PP");

    const { data: services = [], isLoading, refetch } = useQuery({
        queryKey: ['services', date],
        queryFn: () => fetch(`https://doctor-portal-server-smoky.vercel.app/services?date=${date}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mt-10 px-8'>
            <div>
                <p className='text-secondary font-bold text-center'>Available Appointments on {format(selected, "PP")}</p>
            </div>
            <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:my-20'>
                {
                    services.map(servies => <Servies key={servies._id} servies={servies} handelSelectServies={handelSelectServies}></Servies>)
                }
                {
                    selectedServies &&
                    <AppoinmentModal selected={selected} selectedServies={selectedServies}
                        setSelectedServies={setSelectedServies} refetch={refetch}></AppoinmentModal>
                }
            </div>
        </div>
    );
};

export default Services;
import { createBrowserRouter } from "react-router-dom";
import DeshboardLayout from "../Layout/DeshboardLayout/DeshboardLayout";
import Main from "../Layout/Main";
import Appointment from "../Pages/Appointment/Appointment";
import AddDoctor from "../Pages/Deshboard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/Deshboard/AllUsers/AllUsers";
import Join from "../Pages/Deshboard/Join/Join";
import ManageDoctors from "../Pages/Deshboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../Pages/Deshboard/MyAppointment/MyAppointment";
import Payment from "../Pages/Deshboard/Payment/Payment";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import ErrorPage from "../Sheared/ErrorPage/ErrorPage";
import Adminroute from "./AdminRoute/AdminRoute";
import PrivetRoute from "./PrivetRoute/PrivetRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/appointment",
                element: <Appointment></Appointment>
            },
            {
                path: "/signin",
                element: <Signin></Signin>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            }
        ],
    },
    {
        path: '/deshboard',
        element: <PrivetRoute><DeshboardLayout></DeshboardLayout></PrivetRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/deshboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/deshboard/allusers',
                element: <Adminroute><AllUsers></AllUsers></Adminroute>
            },
            {
                path: '/deshboard/adddoctor',
                element: <Adminroute><AddDoctor></AddDoctor></Adminroute>
            },
            {
                path: '/deshboard/managedoctors',
                element: <Adminroute><ManageDoctors></ManageDoctors></Adminroute>
            },
            {
                path: '/deshboard/payment/:id',
                loader: ({ params }) => fetch(`https://doctor-portal-server-smoky.vercel.app/bookings/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }),
                element: <Payment></Payment>
            },
            {
                path:'/deshboard/join',
                element:<Join></Join>
            }
        ]
    }
]);
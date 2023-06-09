import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData.js";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


const Dashboard = () => {
    // ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
    );

    const dispatch = useDispatch();


    const { products, allproduct } = useSelector((state) => state.products);
    const { orders, totalorders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);



    let outOfStock = 0;
    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });



    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [10, 500],
            },
        ],
    };

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>500</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>5</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart w-[100%] pt-[50px] items-center flex justify-center ">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart w-[100%] pt-[70px] items-center flex justify-center ">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
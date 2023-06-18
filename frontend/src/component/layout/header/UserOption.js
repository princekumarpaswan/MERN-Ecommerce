import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction"
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"


const UserOptions = ({ user }) => {
    const navigator = useNavigate()
    const { cartItems } = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
                <ShoppingCartIcon
                    style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
            ),
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];


    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigator("/admin/dashboard")
    }

    function orders() {
        navigator("/orders")
    }
    function account() {
        navigator("/account")
    }
    function cart() {
        navigator("/cart")
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }



    return (
        <>
            <div className="absolute ml-[87%] mt-[-4.2rem] h-[50px] " >
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    style={{ zIndex: "11" }}
                    open={open}
                    direction="down"
                    className="speedDial"
                    icon={
                        <img
                            className="speedDialIcon rounded-[50%] w-[50px] h-[50px]"
                            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                            alt="Profile"
                        />
                    }
                >
                    {options.map((item) => (
                        <SpeedDialAction
                            key={item.name}
                            icon={item.icon}
                            tooltipTitle={item.name}
                            onClick={item.func}
                            tooltipOpen={window.innerWidth <= 600 ? true : false}
                        />
                    ))}
                </SpeedDial>
            </div>
        </>
    )
}


export default UserOptions
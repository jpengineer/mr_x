import { Outlet } from 'react-router-dom';
import React from "react";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col max-w-[2000px] mx-auto cursor-[url('/src/assets/img/cursor.png'),auto]">
            <Outlet/>
        </div>
    );
};

export default Layout;
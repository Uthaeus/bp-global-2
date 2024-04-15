import { Outlet } from "react-router";

import MainNavigation from "../main-navigation";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <MainNavigation />
            <Outlet />
        </div>
    );
}
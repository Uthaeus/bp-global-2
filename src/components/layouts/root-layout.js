import { Outlet } from "react-router";

import MainNavigation from "../main-navigation";
import MainFooter from "../footer/main-footer";
import Copyright from "../footer/copyright";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <MainNavigation />
            <Outlet />
            <MainFooter />
            <Copyright />
        </div>
    );
}
import { Outlet } from "react-router-dom";
import Header from "./components/Common/Header.jsx";
import Footer from "./components/Common/Fotter.jsx";

function Layout(){

    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}

export default Layout
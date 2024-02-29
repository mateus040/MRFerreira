import React, { useEffect } from "react";
import Sidebar from "../../../components/Sidebar";

const HomePrivate = () => {

    useEffect(() => {
        document.title = 'Tela Administrativa';
    }, [])

    return (
        <div className="home-private">
            <Sidebar />
        </div>
    )
}

export default HomePrivate;
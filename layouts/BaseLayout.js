import React, {useEffect, useRef, useState} from 'react';
import Head from "next/head";
import $ from "jquery";
import NavbarSide from "../components/Navbar/NavbarSide";
import NavbarTop from "../components/Navbar/NavbarTop";
import Footer from "../components/Footer";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const BaseLayout = (props) => {
    const {children} = props;

    const [navState, setNavState] = useState({
        isMobile: false, isCollapsed: true, isLocked: false, screenSize: null
    });

    const navbar = useRef(null);

    useEffect(() => {
        // Initialize Screen Size
        $(document).ready(function () {
            setNavState({...navState, screenSize: document.body.clientWidth});
        });

        // Record Screen size when changed
        $(window).off().on("resize", (e) => {
            setNavState({...navState, screenSize: document.body.clientWidth});
        });

        // Close SideNavbar when user is on mobile screen and click outside the navbar
        $(document).off().on("click", (e) => {
            if (navState.isMobile && e.target.id !== "toggleButton") {
                setNavState({...navState, isCollapsed: true});
            }
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (navState.screenSize > 1023) {
            setNavState({...navState, isMobile: false});
        } else {
            setNavState({...navState, isMobile: true});
        }
        // eslint-disable-next-line
    }, [navState.screenSize]);

    const navLinks = [{Title: "Home", Path: "/", Icon: HomeOutlinedIcon}, {
        Title: "Profile", Path: "/profile", Icon: EventNoteOutlinedIcon
    }, {Title: "Password", Path: "/password", Icon: PeopleAltOutlinedIcon}, {
        Title: "Logout", Path: "/logout", Icon: PeopleAltOutlinedIcon
    }]

    return (<div className={"min-h-screen relative"}>
        <Head>
            <title>Dashboard</title>
        </Head>

        <NavbarSide navLinks={navLinks} navState={navState} setNavState={setNavState}/>

        <div
            className={`${navState.isMobile ? "w-full ml-0" : navState.isCollapsed ? "w-[calc(100%-5rem)] ml-20" : "w-[calc(100%-16rem)] ml-64"} duration-500`}>
            <NavbarTop navState={navState} setNavState={setNavState}/>

            <div className={"m-4 p-4 shadow rounded-lg scrollbar bg-white"}>
                <div className={"min-h-[calc(100vh-210px)]"}>
                    {children}
                </div>
            </div>

            <Footer/>
        </div>
    </div>);
};

export default BaseLayout;

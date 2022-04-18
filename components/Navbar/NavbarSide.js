import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const NavbarSide = (props) => {
    const router = useRouter();

    const {navState, setNavState, navLinks} = props;

    const toggleNavLock = () => {
        setNavState({...navState, isLocked: !navState.isLocked})
    };

    const collapseNavbar = () => {
        setNavState({...navState, isCollapsed: true})
    };

    const onMouseEnter = () => {
        setNavState({...navState, isCollapsed: false});
    };

    const collapse = () => {
        if (navState.isMobile) {
            setNavState({...navState, isCollapsed: true});
        }
    };

    const navClicked = () => {
        if (navState.isMobile) {
            setNavState({...navState, isCollapsed: true});
        }
    };

    const onMouseLeave = () => {
        if (navState.isLocked === false && navState.isMobile === false) {
            setNavState({...navState, isCollapsed: true});
        }
    };

    return (<div
        className={`z-10 bg-white shadow-lg ${navState.isMobile && navState.isCollapsed && "-translate-x-64"} ${navState.isCollapsed && !navState.isMobile ? "w-20" : "w-64"} flex flex-col duration-500 content-center fixed top-0 left-0 max-h-screen min-h-screen`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onBlur={collapse}
        onClick={navClicked}>

        {/*Firm Logo and Name*/}
        <div className={"flex cursor-pointer items-center h-[70px] m-2 rounded overflow-hidden p-1"}>
            <div className={"shrink-0 rounded flex items-center justify-center p-1 ml-0.5"}>
                <Image
                    src="/favicon.ico"
                    alt="Profile Image"
                    width={45}
                    height={40}
                />
            </div>
            <span
                className={`shrink-0 mr-2.5 ml-2 text-2xl font-semibold uppercase w-[8.5rem] truncate text-center `}>SEDC</span>
            {!navState.isMobile ? navState.isLocked ? <RadioButtonCheckedOutlinedIcon className={`text-indigo-500`}
                                                                                      onClick={toggleNavLock}
                                                                                      titleAccess={"Unlock"}/> :
                    <RadioButtonUncheckedOutlinedIcon className={`text-indigo-500`}
                                                      onClick={toggleNavLock} titleAccess={"Lock"}/> :
                <CloseOutlinedIcon className={"text-blue-900"} onClick={collapseNavbar}/>}
        </div>

        {/*Navigation*/}
        <div
            className={`px-2 overflow-auto scrollbar ${navState.isCollapsed && !navState.isMobile && "overflow-x-hidden"}`}>
            {navLinks.map((navLink) => {
                return <div
                    className={`my-2 rounded hover:bg-indigo-100 ${router.asPath === navLink.Path ? "bg-indigo-100" : ""}`}
                    key={navLink.Path}>
                    <Link href={navLink.Path}>
                        <a className={"group w-full flex items-center p-2 text-lg overflow-hidden"}>
                            <div
                                className="w-10 h-10 ml-[3px] shrink-0 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 text-2xl">
                                <navLink.Icon/>
                            </div>
                            <span
                                className={`ml-4 group-hover:translate-x-1.5 font-sans font-medium duration-300 whitespace-nowrap`}>{navLink.Title}</span>
                        </a>
                    </Link>
                </div>
            })}
        </div>
    </div>);
};

export default NavbarSide;

import React from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const NavbarTop = (props) => {
    const {navState, setNavState} = props;
    const toggle = () => {
        setNavState({...navState, isCollapsed: !navState.isCollapsed});
    }
    return (<div className={"sticky top-0 p-4 pb-0 bg-[#F8F8F8]"}>
        <div className={"shadow bg-white mx-auto rounded-lg p-4 flex items-center"}>
            {navState.isMobile &&
                <DensityMediumIcon id="toggleButton" className={"h-5 cursor-pointer mr-2"} onClick={toggle}/>}
            Top Navbar
        </div>
    </div>);
};

export default NavbarTop;

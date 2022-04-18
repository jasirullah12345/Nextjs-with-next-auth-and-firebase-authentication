import React from 'react';

const Footer = () => {
    return (<div className={"p-4 pt-0 mt-3 pb-3 bg-[#F8F8F8]"}>
        <div className={"shadow bg-white text-right mx-auto rounded-lg p-4"}>
            Developed by : <span className={"text-indigo-500"}>Jasir Ullah Khan</span> &nbsp;
            <a href="https://web.whatsapp.com/send?phone=923207308040" target="_blank" rel="noreferrer"
               className={"underline font-bold"}>Whatsapp</a>
        </div>
    </div>);
};

export default Footer;

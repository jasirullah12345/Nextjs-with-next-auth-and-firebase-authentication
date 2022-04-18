import React from 'react';
import {signIn, signOut} from "next-auth/react";
import {Auth} from "../core/Auth";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import Card from "../components/Card";

const Index = ({user}) => {
    return (user.id && <>
        User Dashboard
        {user ? (<>
            <br/><br/>Role : {user.role} <br/><br/>
            <button className={"bg-red-800 rounded py-2 px-4 text-white"} onClick={() => signOut()}>Sign out</button>
            <div className={"flex flex-wrap gap-3 justify-center"}>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                    <Card title="Total Events" Icon={EventNoteOutlinedIcon} value={23} path={"/event"}/>
                </div>
        </>) : (<>
            <button className={"bg-blue-800 rounded py-2 px-4 text-white"} onClick={() => signIn()}>Sign in</button>
        </>)}
    </>);
};

export async function getServerSideProps(context) {
    // User Authentication
    const auth = new Auth()
    const res = await auth.isUserAuthenticated(context)
    if (!res.success) return res.returnProps

    return {
        props: {user: auth.user},
    }
}

export default Index;

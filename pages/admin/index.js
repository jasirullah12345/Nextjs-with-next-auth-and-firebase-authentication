import React from 'react';
import {getSession, signIn, signOut} from "next-auth/react";
import {Auth} from "../../core/Auth";
import AdminLayout from "../../layouts/AdminLayout";

const Index = ({user}) => {

    return (user.id && <>
        Admin Dashboard
        {user ? (<>
            <button className={"bg-red-800 rounded py-2 px-4 text-white"} onClick={() => signOut()}>Sign out</button>
        </>) : (<>
            <button className={"bg-blue-800 rounded py-2 px-4 text-white"} onClick={() => signIn()}>Sign in</button>
        </>)}
    </>);
};

export async function getServerSideProps(context) {
    // Super User Authentication
    const auth = new Auth()
    const res = await auth.isSuperUserAuthenticated(context)
    if (!res.success) return res.returnProps

    return {
        props: {user: auth.user},
    }
}

export default Index;

// Custom Layout
Index.getLayout = function getLayout(page) {
    return (<AdminLayout>{page}</AdminLayout>)
}
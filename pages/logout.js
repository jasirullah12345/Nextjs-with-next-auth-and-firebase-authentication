import React, {useEffect} from 'react';
import {Auth} from "../core/Auth";
import {signOut} from "next-auth/react";
import Head from "next/head";

const Logout = () => {

    const signOutUser = async () => {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        await signOut({
            callbackUrl: BASE_URL
        })
    }

    useEffect(() => {
        signOutUser()
    }, []);

    return (<>
        <Head>
            <title>Logout</title>
        </Head>
        <div className={"w-full h-screen flex justify-center items-center"}>
            <div className={"w-screen max-w-[450px] bg-white flex flex-col p-12 shadow-lg rounded"}>
                <h2 className={"text-3xl font-semibold text-center mt-3 mb-5"}>Logged Out</h2>
            </div>
        </div>
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

export default Logout;


// Custom Layout
Logout.getLayout = function getLayout(page) {
    return (<>{page}</>)
}
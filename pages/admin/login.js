import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Head from "next/head";
import {useRouter} from 'next/router'
import {getProviders} from "next-auth/react";
import {getCsrfToken} from "next-auth/react"

const Login = ({providers, csrfToken}) => {
    const provider = providers["superuser-login"];
    const router = useRouter()
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (router.query.error && router.query.error === "CredentialsSignin") {
            setError(true)
            setErrorMsg("Username or password must be wrong!")
        } else {
            setError(false)
            setErrorMsg("")
        }
    }, [router.query]);

    return (<>
        <Head>
            <title>mStalls-Login</title>
        </Head>
        <div className={"w-full h-screen flex justify-center items-center"}>
            <div className={"w-screen max-w-[450px] bg-white flex flex-col p-12 shadow-lg rounded"}>
                <h2 className={"text-3xl font-semibold text-center mt-3 mb-5"}>Admin - Login</h2>
                <form className={"flex flex-col w-full"} method="post" action={provider.callbackUrl}>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                    <TextField
                        className={"my-5"}
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                    />
                    <TextField
                        className={"my-5"}
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <button type={"submit"}
                            className={"bg-blue-600 text-xl text-white w-fit px-8 py-2 rounded m-auto mt-5 flex items-center"}>
                        <LockOutlinedIcon/> &nbsp; Login
                    </button>
                    {error &&
                        <div className={"text-center mt-5 -mb-3 text-sm text-red-600"}>{errorMsg}</div>}
                </form>
            </div>
        </div>
    </>);
};

export async function getServerSideProps(context) {
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
        props: {
            providers, csrfToken
        },
    }
}

export default Login;

// Custom Layout
Login.getLayout = function getLayout(page) {
    return (<>{page}</>)
}

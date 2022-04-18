import React from 'react';

const Signin = () => {
    return (<>
        Sign In
    </>)
};

export default Signin;

export async function getServerSideProps(context) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const callbackUrl = context.query.callbackUrl
    const error = context.query.error
    let destination;
    if (callbackUrl) {
        const callbackPath = callbackUrl.split(process.env.NEXT_PUBLIC_BASE_URL)[1];
        if (isAdminRoute(callbackPath)) {
            // If route is an admin than redirect to admin login
            destination = `${BASE_URL}/admin/login`
        } else {
            destination = `${BASE_URL}/login`
        }
    }

    return {
        redirect: {
            permanent: false, destination: `${destination}?callbackUrl=${callbackUrl}${error ? "&error=" + error : ""}`,
        }, props: {},
    }
}

const isAdminRoute = (callbackPath) => {
    return callbackPath.split('/')[1] === "admin";
}
import React from 'react';
import {Auth} from "../core/Auth";

const Password = ({user}) => {
    return (
        <>
            User Change Password
        </>
    );
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

export default Password;

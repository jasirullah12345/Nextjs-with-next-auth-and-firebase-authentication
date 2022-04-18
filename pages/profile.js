import React from 'react';
import {Auth} from "../core/Auth";

const Profile = ({user}) => {
    return (
        <>
            User Profile
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

export default Profile;

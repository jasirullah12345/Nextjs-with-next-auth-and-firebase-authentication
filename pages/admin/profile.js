import React from 'react';
import AdminLayout from "../../layouts/AdminLayout";
import {Auth} from "../../core/Auth";

const Profile = ({user}) => {
    return (
        <>
            Admin Profile
        </>
    );
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


export default Profile;

// Custom Layout
Profile.getLayout = function getLayout(page) {
    return (<AdminLayout>{page}</AdminLayout>)
}

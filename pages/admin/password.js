import React from 'react';
import AdminLayout from "../../layouts/AdminLayout";
import {Auth} from "../../core/Auth";

const Password = ({user}) => {
    return (<>
        Admin Change Password
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

export default Password;

// Custom Layout
Password.getLayout = function getLayout(page) {
    return (<AdminLayout>{page}</AdminLayout>)
}

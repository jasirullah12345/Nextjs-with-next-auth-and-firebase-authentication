import {getSession} from "next-auth/react";

export class Auth {
    constructor() {
        this.user = null;
        this.superUser = false;
        this.role = null;
    }

    async isSuperUserAuthenticated(context) {
        // Super User Authentication
        const session = await getSession(context);
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const callbackUrl = context.resolvedUrl;
        if (!session) {
            return {
                success: false, returnProps: {
                    redirect: {
                        permanent: false,
                        destination: `${BASE_URL}/api/auth/signin?callbackUrl=${BASE_URL + callbackUrl}`,
                    }
                }
            }
        } else if (!session.user.superUser) {
            return {
                success: false, returnProps: {
                    redirect: {
                        permanent: false, destination: BASE_URL,
                    }
                }
            }
        }
        this.user = session.user;
        this.superUser = true;
        return {
            success: true, returnProps: {}
        }
    }

    async isUserAuthenticated(context) {
        // User Authentication
        const session = await getSession(context);
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const callbackUrl = context.resolvedUrl;
        if (!session) {
            return {
                success: false, returnProps: {
                    redirect: {
                        permanent: false,
                        destination: `${BASE_URL}/api/auth/signin?callbackUrl=${BASE_URL + callbackUrl}`,
                    }
                }
            }
        } else if (session.user.superUser) {
            return {
                success: false, returnProps: {
                    redirect: {
                        permanent: false, destination: BASE_URL + "/admin",
                    }
                }
            }
        }

        this.user = session.user;
        this.role = session.user.role;
        return {
            success: true, returnProps: {}
        }
    }


}
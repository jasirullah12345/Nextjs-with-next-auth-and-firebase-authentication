import '../styles/globals.css'
import BaseLayout from "../layouts/BaseLayout";
import Head from 'next/head'
import {SessionProvider} from "next-auth/react"

export default function MyApp({Component, pageProps: {session, ...pageProps}}) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => <BaseLayout>{page}</BaseLayout>)

    return getLayout(<>
        <SessionProvider session={session}
            // Re-fetch session every 5 minutes
                         refetchInterval={5 * 60}
            // Re-fetches session when window is focused
                         refetchOnWindowFocus={true}>
            <Component {...pageProps} >
                <Head>
                    <title>mStalls</title>
                </Head>
            </Component>
        </SessionProvider>
    </>)
}
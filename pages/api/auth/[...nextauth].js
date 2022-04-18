import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {collection, getDocs, query, where, setDoc, serverTimestamp, doc} from "firebase/firestore";
import {db} from "../../../firebase";


export default NextAuth({
    providers: [CredentialsProvider({
        id: "superuser-login", name: "Super-user Authentication", credentials: {
            email: {label: "Email", type: "text", placeholder: "Enter your email"},
            password: {label: "Password", type: "password", placeholder: "Enter your password"}
        }, async authorize(credentials, req) {
            let usersSnap = await getDocs(query(collection(db, "super_users"), where("email", "==", credentials.email)));
            if (usersSnap.docs.length > 0) {
                // Prepare User Details
                let user = {
                    id: usersSnap?.docs?.[0].id, ...usersSnap?.docs?.[0]?.data()
                }

                const bcrypt = require('bcryptjs');
                const passwordMatched = bcrypt.compareSync(credentials?.password, user.password)

                if (passwordMatched) {

                    // Update lastLogin
                    let data = await setDoc(doc(db, "super_users", user.id), {
                        lastLogin: serverTimestamp()
                    }, {merge: true})

                    // Set user as a Super User
                    user = {...user, superUser: true}

                    // Remove password attribute from user details
                    return Object.keys(user)
                        .filter(key => key !== "password")
                        .reduce((obj, key) => {
                            obj[key] = user[key];
                            return obj;
                        }, {})
                }
            }
            return null
        }
    }), CredentialsProvider({
        id: "user-login", name: "User Authentication", credentials: {
            email: {label: "Email", type: "text", placeholder: "Enter your email"},
            password: {label: "Password", type: "password", placeholder: "Enter your password"}
        }, async authorize(credentials, req) {
            let usersSnap = await getDocs(query(collection(db, "users"), where("email", "==", credentials.email)));
            if (usersSnap.docs.length > 0) {
                // Prepare User Details
                let user = {
                    id: usersSnap?.docs?.[0].id, ...usersSnap?.docs?.[0]?.data()
                }

                const bcrypt = require('bcryptjs');
                const passwordMatched = bcrypt.compareSync(credentials?.password, user.password)

                if (passwordMatched) {

                    // Update lastLogin
                    await setDoc(doc(db, "users", user.id), {
                        lastLogin: serverTimestamp()
                    }, {merge: true})

                    // Remove password attribute from user details
                    return Object.keys(user)
                        .filter(key => key !== "password")
                        .reduce((obj, key) => {
                            obj[key] = user[key];
                            return obj;
                        }, {})
                }
            }
            return null
        }
    })], pages: {
        // Sign-In Page
        signIn: '/auth/signin'
    }, secret: process.env.JWT_SECRET, callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            // Allow which attributes are passed to the session
            if (user) {
                token.id = user.id
                token.user = user
            }
            return token
        }, async session({session, token, user}) {
            session.user = token?.user
            return session
        }
    }
})
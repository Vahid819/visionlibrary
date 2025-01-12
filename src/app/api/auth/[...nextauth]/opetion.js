import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/lib/dbConection'
import bcrypt from "bcryptjs";
import User from '@/model/User'


export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email", placeholder: "Enter your email Id" },
                password: { label: "password", type: "password", placeholder: "Please enter your password" }
            },
            async authorize(credentials) {
                await dbConnect();
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("No use found this email")
                    }

                    const passwordcompare = await bcrypt.compare(credentials.password, user.password);

                    if (passwordcompare) {
                        return user
                    } {
                        throw new Error("Incorrect Password")
                    }


                } catch (error) {
                    throw new Error("error", error);
                }
            }
        })
    ],
    callback: {
        async jwt({ token, user,}) {
            if(user){
                token._id = user._id?.toString()
                token.username = user.username;
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
            }
            return session
        },
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import psql from "../../../server/psql/psql";
import { LoginWithEmail } from "../../../server/psql/queries";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string
		})
	],
	theme: {
		colorScheme: "auto"
	},

	callbacks: {
		async signIn({ user, }) {
			if (!user.email)
				return false;
			const emp = await LoginWithEmail(psql, user.email)
			if (!emp)
				return false;

			return true;
		},

		async jwt({ token, user }) {
			if (!user?.email)
				return token;

			const emp = await LoginWithEmail(psql, user.email);
			if (!emp)
				return token;
			token.isManager = emp.isManager;
			token.empid = emp.employeeID;
			return token;
		},

		async session({ session, user, token }) {
			session.user.empid = token.empid;
			session.user.isManager = token.isManager;
			return session;
		}

	}
}


export default NextAuth(authOptions);

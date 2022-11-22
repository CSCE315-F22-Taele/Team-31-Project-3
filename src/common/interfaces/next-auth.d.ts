import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { number } from "zod";

declare module "next-auth" {
	interface Session {
		user: {
			empid: number,
			isManager: boolean,
		} & DefaultSession["user"]
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		empid: number,
		isManager: boolean
	}
}


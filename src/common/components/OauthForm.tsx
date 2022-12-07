import { useSession, signIn, signOut } from "next-auth/react";


 /**
   * 
   * Sub-component that allows manager to create a new ingredient
   * 
   * @returns 
   *
   */
export default function Component() {
	const { data } = useSession()
	if (data)
		return (
			<>
				<p>signed in as {data.user?.name} with {data.user?.email} + {data.user?.empid}</p>
				<p>{JSON.stringify(data.user)}</p>
				<button onClick={() => signOut()}>SignOut</button>
			</>
		)
	return (
		<>

			<p>sign in!!!</p>
			<button onClick={() => signIn()}>SignIn</button>
		</>
	)
}

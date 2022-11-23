import * as React from 'react';

import Link from "next/link";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSession, signIn, signOut } from "next-auth/react";

function RevsHeader() {

	const { data } = useSession()

	let AuthButton;

	if (!data) {
		AuthButton = <Button className="custom-btn" onClick={() => signIn()}>LOGIN</Button>;
	} else {
		AuthButton = <Button className="custom-btn" onClick={() => signOut()}>LOGOUT</Button>
	}

	return (
		<div className="RevsHeader">
			<Navbar collapseOnSelect expand="sm" variant="dark" sticky="top">
				<Container style={{
					justifyContent: "right",
					alignItems: "right"
				}}>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse className="right-aligned" id="responsive-navbar-nav">
						<Nav className="justify-content-end">
							<Button className="custom-btn" href="/">MENU</Button>
							{data?.user.isManager &&
								<Button className="custom-btn" href="/manager">MANAGER</Button>
							}
							{AuthButton}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default RevsHeader;

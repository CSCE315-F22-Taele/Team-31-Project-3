import { type NextPage } from "next";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { trpc } from "../common/utils/trpc";
import RevsHeader from "../common/components/RevsHeader";
import bg from "../common/components/images/revs.png";
import logo from "../common/components/images/logo.svg";

const Landing: NextPage = () => {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    return (
        <>
            <RevsHeader />
            <div className="PageWrapper" style={{backgroundImage:'url(${bg.src})', width:'100%', height:'100%'}}>
                <img src={logo} id="landingLogo" alt="Rev's American Grill Logo" />
                
            </div>
        </>
    )
}
export default Landing;
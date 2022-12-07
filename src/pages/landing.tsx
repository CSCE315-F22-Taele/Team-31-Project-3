import { type NextPage } from "next";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { trpc } from "../common/utils/trpc";
import RevsHeader from "../common/components/RevsHeader";
import bg from "../common/images/revs.png";
import Image from "next/image";
import logo from "../common/images/logo.png";

const Landing: NextPage = () => {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    return (
        <>
            <RevsHeader />
            <div className="PageWrapper" style={{backgroundImage:'url(${bg.src})', width:'100%', height:'100%', position:'absolute',}}>
                <div style={{display:"flex", justifyContent:"center",}}>
                    <Image src={logo} width={719} height={352} alt="Rev's American Grill Logo" />
                </div>
                <div style={{paddingTop:"50px",}}>
                    <h2>
                        One of the best reasons to visit College Station is to experience Rev's American Grill. We offer a great time for people everywhere and our food keeps people coming back for more.
                    </h2>
                </div>
                <div style={{paddingTop:"30px", display:"flex", justifyContent:"center",}}>
                    <Button className="custom-btn-landing" href="/">Order Now</Button>
                </div>
            </div>
        </>
    )
}
export default Landing;
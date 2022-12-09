import { type NextPage } from "next";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
// import { trpc } from "../common/utils/trpc";
import RevsHeader from "../common/components/RevsHeader";
import Image from "next/image";
import logo from "../common/images/logo.png";
import background from "../common/images/revs-edited.png";

import GoogleMaps from "../common/components/GoogleMaps";

/**
   * 
   * This is the website's landing page
   * 
   * @returns a Page component
   *
   */
const Landing: NextPage = () => {

  return (
    <>
      <RevsHeader />
      <div className="PageWrapper" id="landingPage" >
        <Image style={{objectFit: 'cover'}}
          src={background}
          className="landingImage"
          alt="Picture of Revs American Grill"
          fill
        />
        <div style={{ display: "flex", justifyContent: "center", }}>
          <Image alt="Rev's American Grill Logo" style={{height: 'auto', maxWidth: '700px'}} src={logo} width={719} height={352} />
        </div>
        <div style={{ paddingTop: "70px", }}>
          <h2 className="landing">
            One of the best reasons to visit College Station is to experience Rev&apos;s American Grill. We offer a great time for people everywhere and our food keeps people coming back for more.
          </h2>
        </div>
        <div style={{ paddingTop: "50px", display: "flex", justifyContent: "center", }}>
          <Button className="custom-btn-landing" href="/customer">Order Now</Button>
        </div>
        <div className="PageWrapper" id="googleMaps">
          <h2 className="mapsHeader" style={{ display: "flex", justifyContent: "center", }}>
            Find Us Here!
          </h2>



          <GoogleMaps />
        </div>
      </div>
    </>
  )
}
export default Landing;

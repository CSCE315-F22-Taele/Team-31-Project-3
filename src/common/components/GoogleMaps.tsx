import { useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, LoadScript } from "@react-google-maps/api";
import { Loader } from '@googlemaps/js-api-loader';
import React from 'react'

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 30.61272105279779,
  lng: -96.34070951544554
};

function GoogleMaps() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAvMFjsWEHwpCVwBTOquMTfnUAoDijQy6g"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}


export default GoogleMaps;

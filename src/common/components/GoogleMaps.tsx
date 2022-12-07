import { useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, LoadScript, MarkerF } from "@react-google-maps/api";
import { Loader } from '@googlemaps/js-api-loader';
import React from 'react'

const containerStyle = {
  width: '100%',
  height: '500px',
  display: 'flex',
  margin: 'auto'
};

const center = {
  lat: 30.61272105279779,
  lng: -96.34070951544554
};



 /**
   * Google Maps widget
   * 
   * @returns GoogleMaps component
   *
   */

function GoogleMaps() {


  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAvMFjsWEHwpCVwBTOquMTfnUAoDijQy6g"

    >

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}

      >
        <MarkerF
          visible={true}
          position={center}
        />


      </GoogleMap>

    </LoadScript>
  )
}


export default GoogleMaps;

import React, { useState, useEffect } from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import placesData from "./data/places.json";
import mapstyle from "./mapstyle";

function Map() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return(
    <GoogleMap 
      defaultZoom={10} 
      defaultCenter={{ lat: 20.593683, lng: 78.962883 }} 
      defaultOptions={{styles: mapstyle}}
    >
      {placesData.map((place)=>(
        <Marker 
          key={place.city} 
          position={{ lat: parseFloat(place.lat), lng: parseFloat(place.lng) }}
          onClick={()=>{
            setSelectedPlace(place);
          }}
        />
      ))}
      {selectedPlace && (
        <InfoWindow 
        position={{ 
          lat: parseFloat(selectedPlace.lat), 
          lng: parseFloat(selectedPlace.lng) }}
          onCloseClick={()=>{
            setSelectedPlace(null);
          }}          
        >
            <div>
              <h2>{selectedPlace.city}</h2>
              <p> State situated in: {selectedPlace.admin_name}</p>
              <p> population: {selectedPlace.population}</p>
            
            </div>
            
        
        </InfoWindow>
      )}

    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

function App() {
  return (
    <div style={{width:"100vw",height:"100vh" }}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          "AIzaSyCuvWvPUREuRMETvD59I3ZgN4XvwjLtrzY"
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;

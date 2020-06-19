import React, { Component } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker } from '@react-google-maps/api';
import CoordinatesList from './api';

const options = {
  disableDefaultUI: true,
  zoomControl: true
}

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -29.167391,
  lng: -51.180061
};

export default function Map()  {

  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: " insira a chave aqui"
  });

  
  const [markers, setMarkers] = React.useState([]);

  if(loadError) return "Erro ao carregar mapa";
  if(!isLoaded) return "Carregando mapas";

  return (
      <div>
        <CoordinatesList />
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={options}
        onClick={(event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()        
          }])
        }}
      >
        {markers.map(marker => (<Marker 
        key={marker.time.toISOString()} 
        position={{lat: marker.lat, lng: marker.lng}}
        /> 
        ))}
      </GoogleMap>
      </div>
  )
}
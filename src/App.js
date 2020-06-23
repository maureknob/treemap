import React, {useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import api from './api';

//desabilita UI do google maps deixando apenas o zoom
const options = {
  disableDefaultUI: true,
  zoomControl: true
}

//define o tamanho do mapa na tela
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

//posição central do mapa ao inicializar
const center = {
  lat: -29.167391,
  lng: -51.180061
};


export default function Map() {

  //pega retorno da api e coloca valor em coodinates formando um array de objetos
  const [coordinates, setCoordinates] = useState();

  useEffect(()=> {
    api.get()
      .then(res => {setCoordinates(res.data)} );
      
  }, []);


  //TODO trazer a chae da api do google pelo .env
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "Incluir chave aqui"
  });

  
  const [markers, setMarkers] = useState([]);

  if (loadError) return "Erro ao carregar mapa";
  if (!isLoaded) return "Carregando mapas";
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={options}
        onClick={(event) => {
          //adiciona novas posições ao state quando o usuário clica no mapa
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
          }])
        }}
      >
        { /* inclui no mapa marcadores quando usuário clica no mapa  */}
        {markers.map(marker => (<Marker
          key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }}
        />

        // TODO ... incluir marcadores no mapa pegando os valores de lat e lng armazenados em coordinates 
        // TODO ... enviar novos marcadores para o banco utilizando os valores capturados no hook setMarkers
        ))}
      </GoogleMap>
    </div>
  )
}
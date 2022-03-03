import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';

const center = {
  lat: 55.744,
  lng: 37.61,
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [branchesArray, setBranchesArray] = useState<any>(null);
  useEffect(() => {
    async function getBranch() {
      let response = await fetch(
        'https://caselab-group-1.herokuapp.com/getFilials'
      );
      response = await response.json();
      setBranchesArray(response);
    }
    getBranch();
  }, []);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDVnFA8gRaGwjISvlDMRVXKifeqp1ycTiI',
  });

  return isLoaded ? (
    <GoogleMap
      onClick={() => setActiveMarker(null)}
      center={center}
      zoom={12}
      mapContainerStyle={containerStyle}
    >
      {branchesArray ? (
        branchesArray.map(
          //@ts-expect-error
          ({ idFilial, filialTitle, adress, lat, lon, phone }) => (
            <Marker
              key={idFilial}
              position={{ lat: Number(lat), lng: Number(lon) }}
              onClick={() => handleActiveMarker(idFilial)}
            >
              {activeMarker === idFilial ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <p>
                      <b>{filialTitle}</b>
                    </p>
                    <p>{adress}</p>
                    <p>{phone}</p>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          )
        )
      ) : (
        <></>
      )}
    </GoogleMap>
  ) : (
    <div>Map cannot be loaded right now, sorry.</div>
  );
}

export default Map;

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {

  const [logEntries, setLogEntries] = useState([]);

  const [showPopup, setShowPopup] = useState({});

  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 23.259933,
    longitude: 77.412613,
    zoom: 3
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);


  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    });
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiaGFyc2hzaGVsYXIyMiIsImEiOiJjazd1NTFmaXkwNXV5M2xtN2puaWllOGgwIn0.c0N2LRfn9TvjCT1emjbzfg"
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick={() => setShowPopup({
                  //...showPopup,
                  [entry._id]: true
                })}
              >
                <img
                  className="marker"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`
                  }}
                  src="https://lh3.googleusercontent.com/proxy/U2n9KJOLUCxuQh3nSrH7jKUGQZd8vVboF2Bp5D1HESLW9YNEa2jQxyiUWZbGqZeZI1fFydfuKaHfOWJEl8cWicIVpOvkLsIdolyZVJQoITrrP8GSk9Tx28dVR37zvSYkEykljyE8_mHM"
                  alt="marker" />
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >

              <img
                className="marker"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`
                }}
                src="https://lh3.googleusercontent.com/proxy/U2n9KJOLUCxuQh3nSrH7jKUGQZd8vVboF2Bp5D1HESLW9YNEa2jQxyiUWZbGqZeZI1fFydfuKaHfOWJEl8cWicIVpOvkLsIdolyZVJQoITrrP8GSk9Tx28dVR37zvSYkEykljyE8_mHM"
                alt="marker" />

            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div>
                <LogEntryForm
                  onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation}
                />
              </div>
            </Popup>
          </>
        ) : null
      }

    </ReactMapGL >
  );

}
export default App;

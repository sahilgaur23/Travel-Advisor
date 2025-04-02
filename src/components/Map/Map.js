import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coords, places, setCoords, setBounds, weatherData }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const [mapError, setMapError] = useState(null);

  const handleApiLoaded = (map, maps) => {
    // Map loaded successfully
    console.log('Google Maps loaded successfully');
  };

  const handleError = (error) => {
    console.error('Google Maps Error:', error);
    setMapError(error);
  };

  if (mapError) {
    return (
      <div className={classes.mapContainer}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Error loading Google Maps. Please make sure you have enabled billing in your Google Cloud Console.
          </Typography>
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        yesIWantToUseGoogleMapApiInternals
        onError={handleError}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
            style={{ cursor: 'pointer' }}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper 
                  elevation={3} 
                  className={classes.paper}
                >
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div 
            key={i} 
            lat={data.coord.lat} 
            lng={data.coord.lon}
            style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}
          >
            <img 
              src={`https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-sun-weather-justicon-flat-justicon-1.png`} 
              height="70px" 
              alt="weather icon"
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

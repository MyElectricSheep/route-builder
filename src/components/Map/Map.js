import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Map.module.css";
// eslint-disable-next-line import/no-unresolved
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const {
  REACT_APP_MAP_DEFAULT_LONGITUDE: lng,
  REACT_APP_MAP_DEFAULT_LATITUDE: lat,
  REACT_APP_MAP_DEFAULT_ZOOM: zoom,
} = process.env;

const Map = ({ waypoints }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom,
    });

    map.current.on("click", (e) => {
      console.log(e);
    });

    map.current.on("touchstart", (e) => {
      console.log(e);
    });

    const createMarkerAndPopup = (feature) => {
      const el = document.createElement("div");
      el.textContent = feature.properties.id;
      el.className = styles.marker;

      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
          )
        )
        .addTo(map.current);
    };

    waypoints.features.forEach(createMarkerAndPopup);
  });

  return (
    <div>
      <div ref={mapContainer} className={styles.container} />
    </div>
  );
};

export default Map;

Map.propTypes = {
  waypoints: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        geometry: PropTypes.shape({
          type: PropTypes.string,
          coordinates: PropTypes.arrayOf(PropTypes.number),
        }),
        properties: PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          description: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

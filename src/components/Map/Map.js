import React, { useRef, useEffect, useCallback } from "react";
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

const Map = ({ waypoints, onAddWaypoint, activeMarkers, setActiveMarkers }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const createMarkerAndPopup = useCallback(
    (feature) => {
      if (!activeMarkers.find((m) => m.id === feature.properties.id)) {
        const el = document.createElement("div");
        el.textContent = feature.properties.id;
        el.className = styles.marker;

        const newMarker = new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
          );
        newMarker.addTo(map.current);
        setActiveMarkers((prevMarkers) => [
          ...prevMarkers,
          { id: feature.properties.id, marker: newMarker },
        ]);
      }
    },
    [activeMarkers, setActiveMarkers]
  );

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: [lng, lat],
        zoom,
      });

      map.current.on("click", onAddWaypoint);
      // map.current.on("touchstart", onAddWaypoint);
    }

    waypoints.features.forEach(createMarkerAndPopup);
  }, [waypoints, onAddWaypoint, createMarkerAndPopup]);

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
  onAddWaypoint: PropTypes.func.isRequired,

  activeMarkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      // eslint-disable-next-line react/forbid-prop-types
      marker: PropTypes.any,
    })
  ).isRequired,
  setActiveMarkers: PropTypes.func.isRequired,
};

import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { waypointPropType } from "../../propTypes/commonPropTypes";
import styles from "./Map.module.css";
// eslint-disable-next-line import/no-unresolved
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ waypoints, onAddWaypoint, setWaypoints, lng, lat, zoom }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const createMarkerAndPopup = useCallback(
    (feature) => {
      const targetWayPoint = waypoints.features.find(
        (m) => m.properties.id === feature.properties.id
      );
      if (!targetWayPoint.properties.marker) {
        // Create the mapbox marker instance and add it to the DOM
        const el = document.createElement("div");
        el.textContent = feature.properties.id;
        el.className = styles.marker;

        const newMarker = new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${feature.properties.title} ${feature.properties.id}</h3><p>${feature.properties.description}</p>`
            )
          );
        newMarker.addTo(map.current);

        // Prevents adding a waypoint if a marker is clicked
        newMarker.getElement().addEventListener(
          "click",
          (e) => {
            newMarker.togglePopup();
            e.stopPropagation();
          },
          false
        );

        // Attach the mapbox marker instance to the waypoint's properties in the state
        setWaypoints((prevWayPoints) => {
          return {
            ...prevWayPoints,
            features: [
              ...prevWayPoints.features.filter(
                (f) => f.properties.id !== targetWayPoint.properties.id
              ),
              {
                ...targetWayPoint,
                properties: { ...targetWayPoint.properties, marker: newMarker },
              },
            ],
          };
        });
      }
    },
    [waypoints, setWaypoints]
  );

  const initializeLines = useCallback((wayPointsCoordinates) => {
    map.current.addSource("wayPointsCoordinates", wayPointsCoordinates);

    map.current.addLayer({
      id: "wayPointLines",
      type: "line",
      source: "wayPointsCoordinates",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3c86e1",
        "line-width": 11,
      },
    });
  }, []);

  useEffect(() => {
    const wayPointsCoordinates = {
      type: "geojson",
      data: waypoints.features.find((f) => f.geometry.type === "LineString"),
    };

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: [lng, lat],
        zoom,
      });

      map.current.once("load", () => {
        initializeLines(wayPointsCoordinates);
      });

      map.current.on("click", onAddWaypoint);
    }

    waypoints.features
      .filter((f) => f.geometry.type === "Point")
      .forEach(createMarkerAndPopup);

    const source = map.current.getSource("wayPointsCoordinates");
    if (source) {
      source.setData(wayPointsCoordinates.data.geometry);
    }
  }, [
    waypoints,
    onAddWaypoint,
    createMarkerAndPopup,
    initializeLines,
    lng,
    lat,
    zoom,
  ]);

  return (
    <div>
      <div ref={mapContainer} className={styles.container} />
    </div>
  );
};

export default Map;

Map.propTypes = {
  waypoints: waypointPropType.isRequired,
  onAddWaypoint: PropTypes.func.isRequired,
  setWaypoints: PropTypes.func.isRequired,
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
};

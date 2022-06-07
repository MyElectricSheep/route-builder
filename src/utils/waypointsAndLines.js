import loremGenerator from "./loremGenerator";

const handleAddWaypoint = (e, setWaypoints, idCounter, refreshLines) => {
  const newWayPoint = {
    type: "Feature",
    geometry: {
      type: "Point",
    },
    properties: {
      title: "Waypoint",
      description: loremGenerator(),
    },
  };

  if (e.type === "click") {
    setWaypoints((prevWayPoints) => {
      newWayPoint.geometry.coordinates = [e.lngLat.lng, e.lngLat.lat];
      newWayPoint.properties.id = idCounter.current;
      idCounter.current += 1;

      return {
        ...prevWayPoints,
        features: [...prevWayPoints.features, newWayPoint],
      };
    });
    refreshLines(setWaypoints);
  }
};

const handleDeleteWaypoint = (id, waypoints, setWaypoints, refreshLines) => {
  // Remove the waypoint's marker from the DOM through the Mapbox instance
  waypoints.features
    .find((w) => w.properties.id === id)
    .properties.marker.remove();

  // Remove the waypoint from the state
  const filteredWaypoints = waypoints.features.filter(
    (f) => f.properties.id !== id
  );

  const newWayPoints = {
    ...waypoints,
    features: [...filteredWaypoints],
  };

  setWaypoints(newWayPoints);
  refreshLines(setWaypoints);
};

const refreshLines = (setWaypoints) => {
  setWaypoints((prevWayPoints) => {
    const filteredWaypoints = prevWayPoints.features.filter(
      (f) => f.geometry.type !== "LineString"
    );
    return {
      ...prevWayPoints,
      features: [
        ...filteredWaypoints,
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: filteredWaypoints.map((w) => w.geometry.coordinates),
          },
          properties: {},
        },
      ],
    };
  });
};

export { handleAddWaypoint, handleDeleteWaypoint, refreshLines };

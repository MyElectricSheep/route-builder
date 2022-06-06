const initialState = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.833336142138522, 46.33481536389189],
      },
      properties: {
        id: 1,
        title: "Waypoint",
        description: "Ogradi Mountain",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.828701284871647, 46.33417830233513],
      },
      properties: {
        id: 2,
        title: "Waypoint",
        description: "Triglav National Park",
      },
    },
  ],
};

export default initialState;

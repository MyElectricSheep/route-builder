const initialState = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.856227868118225, 46.331806805841325],
      },
      properties: {
        id: 1,
        title: "Waypoint",
        description: "Some description",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.832905385512959, 46.36177826091725],
      },
      properties: {
        id: 2,
        title: "Waypoint",
        description: "Some description",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.802577379423752, 46.379397414815344],
      },
      properties: {
        id: 3,
        title: "Waypoint",
        description: "Some description",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.796401069800936, 46.36839425036953],
      },
      properties: {
        id: 4,
        title: "Waypoint",
        description: "Some description",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [13.856227868118225, 46.331806805841325],
          [13.832905385512959, 46.36177826091725],
          [13.802577379423752, 46.379397414815344],
          [13.796401069800936, 46.36839425036953],
        ],
      },
      properties: {},
    },
  ],
};

export default initialState;

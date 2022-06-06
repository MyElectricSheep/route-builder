const initialState = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.810853581255078, 46.36068035157949],
      },
      properties: {
        id: 1,
        title: "Waypoint",
        description: "Kanjavec Mountain",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.806761808795669, 46.373399966373725],
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

import loremGenerator from "../utils/loremGenerator";

const seedData = () => {
  const initialData = {};

  const data = [
    // Slovenia, Triglav National Park
    {
      lng: 13.832905385512959,
      lat: 46.36177826091725,
      zoom: 12,
      places: [
        [13.856227868118225, 46.331806805841325],
        [13.832905385512959, 46.36177826091725],
        [13.802577379423752, 46.379397414815344],
        [13.796401069800936, 46.36839425036953],
      ],
    },
    // New Caledonia, Parc Provincial de la Riviere Bleue
    {
      lng: 166.51347523649622,
      lat: -22.16249224058201,
      zoom: 11,
      places: [
        [166.51347523649622, -22.16249224058201],
        [166.55159970162651, -22.10693617264988],
        [166.5850748417409, -22.0922898412135],
        [166.65527964948143, -22.115120225004105],
      ],
    },
    // Portugal, Sintra National Park
    {
      lng: -9.426480196314856,
      lat: 38.79402631129983,
      zoom: 12,
      places: [
        [-9.39557192846192, 38.79569306992707],
        [-9.425392896126539, 38.781594058978555],
        [-9.454358344226847, 38.79540730685258],
        [-9.43192309103705, 38.804931726583874],
      ],
    },
    // Bolivia, Parque Nacional Cotapata
    {
      lng: -67.96296394299226,
      lat: -16.365243860528366,
      zoom: 10,
      places: [
        [-68.07963926750601, -16.297963376891886],
        [-68.03317890029577, -16.176886931811566],
        [-67.83202082687986, -16.153839668543824],
        [-67.72991012971455, -16.188654710163362],
      ],
    },
    // Brazil, Jericoacoara National Park
    {
      lng: -40.49932930832361,
      lat: -2.8163757035098484,
      zoom: 12,
      places: [
        [-40.54101045881606, -2.8310786715877043],
        [-40.503390729643655, -2.8410620090662775],
        [-40.456865847187686, -2.819915383276154],
        [-40.488851703876264, -2.7941395773141124],
      ],
    },
  ];

  const randomPlace = Math.floor(Math.random() * data.length);

  const initialState = {
    type: "FeatureCollection",
    features: [
      ...data[randomPlace].places.map((place, index) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: place,
        },
        properties: {
          id: index + 1,
          title: "Waypoint",
          description: loremGenerator(),
        },
      })),
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [...data[randomPlace].places.map((p) => p)],
        },
        properties: {},
      },
    ],
  };

  initialData.state = initialState;
  initialData.lng = data[randomPlace].lng;
  initialData.lat = data[randomPlace].lat;
  initialData.zoom = data[randomPlace].zoom;

  return initialData;
};

export default seedData;

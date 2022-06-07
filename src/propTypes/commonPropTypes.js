import PropTypes from "prop-types";

const waypointPropType = PropTypes.shape({
  type: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      geometry: PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.number),
          PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        ]),
      }),
      properties: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    })
  ),
});

export { waypointPropType };

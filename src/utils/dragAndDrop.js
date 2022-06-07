const handleDragStart = (draggedWaypoint, position) => {
  draggedWaypoint.current = position;
};

const handleDragEnter = (
  e,
  position,
  draggedWaypoint,
  dragOverWaypoint,
  waypoints,
  setWaypoints,
  refreshLines
) => {
  if (e.target.tagName === "path" || e.target.tagName === "svg") {
    return;
  }

  dragOverWaypoint.current = position;

  const waypointsCopy = [
    ...waypoints.features.filter((f) => f.geometry.type === "Point"),
  ];

  const draggedWaypointContent = waypointsCopy[draggedWaypoint.current];

  waypointsCopy.splice(draggedWaypoint.current, 1);
  waypointsCopy.splice(dragOverWaypoint.current, 0, draggedWaypointContent);

  draggedWaypoint.current = dragOverWaypoint.current;
  dragOverWaypoint.current = null;

  setWaypoints((prevWayPoints) => ({
    ...prevWayPoints,
    features: waypointsCopy,
  }));

  refreshLines(setWaypoints);
};

export { handleDragStart, handleDragEnter };

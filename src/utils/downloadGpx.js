import togpx from "togpx";

const handleDownloadFile = (waypoints) => {
  const element = document.createElement("a");

  const gpx = togpx(waypoints);

  const file = new Blob([gpx], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(file);

  element.href = url;
  element.download = "route.gpx";
  document.body.appendChild(element);
  element.click();
  element.remove();

  URL.revokeObjectURL(url);
};

export default handleDownloadFile;

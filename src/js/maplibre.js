const carte = new maplibregl.Map({
  container: "carte",
  style: "https://api.maptiler.com/maps/dataviz-v4-dark/style.json?key=swdStOplG8uYmZLdNTqx",
  center: [-73.1155325, 46.0362929],
  zoom: 11,
  attributionControl: false,
});
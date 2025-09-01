
      


// const MAPTILER_KEY = mapToken;

// const map = new maplibregl.Map({
//   container: 'map',
//   style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
//   center: coordinates,
//   zoom: 9
// });

// map.addControl(new maplibregl.NavigationControl());

// new maplibregl.Marker({ color: "red" })
//   .setLngLat(coordinates)
//   .setPopup(
//     new maplibregl.Popup({ offset: 25 })
//       .setHTML(`<h4>${listingTitle}</h4><p>${listingLocation}</p>`)
//   )
//   .addTo(map);

const MAPTILER_KEY = mapToken;

const map = new maplibregl.Map({
  container: 'map',
  style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
  center: coordinates,
  zoom: 9
});

map.addControl(new maplibregl.NavigationControl());

new maplibregl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(
    new maplibregl.Popup({ offset: 25 })
      .setHTML(`
        <h4>${listingTitle}</h4>
        <p>Exact location will be provided after booking</p>
      `)
  )
  .addTo(map);


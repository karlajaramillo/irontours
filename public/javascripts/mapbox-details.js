console.log(
  JSON.parse(document.querySelector('.map-wrapper').dataset.locations)
);
const mapJSON = JSON.parse(
  document.querySelector('.map-wrapper').dataset.locations
);

const createMap = () => {
  if (!mapJSON.locations[0]) {
    document.querySelector('.map-wrapper').style.height = 0;
    return
  }

  mapboxgl.accessToken =
  'pk.eyJ1Ijoia2F2YWphZ2EiLCJhIjoiY2t4M3Nud3N0MHoxcTMwdXFuaDQxenFuOSJ9.v3tfGQnVF20m543RqwLWlA';

  const map = new mapboxgl.Map({
    container: 'map',
    //style: 'mapbox://styles/mapbox/light-v10',
    style: 'mapbox://styles/mapbox/streets-v11',
    //center: [13.4105300,  52.5243700], // starting position
    zoom: 9,
    //scrollZoom: false,
  });
  // disable map zoom when using scroll
  //map.scrollZoom.disable();

  const bounds = new mapboxgl.LngLatBounds();

  mapJSON.locations.forEach(function (marker) {
    // create the popup
    // const newMarker = marker.mapData || marker;
    const popup = new mapboxgl.Popup({
      offset: 10,
      //closeOnClick: false
    }).setLngLat(marker.coordinates).setHTML(`
          <p class="popup-name-details">${marker.description}</p> 
          `);

    // create the DOM element for the marker
    const el = document.createElement('div');
    el.className = 'marker';
    // create the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(marker.coordinates)
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);

    bounds.extend(marker.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 50,
      bottom: 50,
      left: 20,
      right: 20,
    },
  });

}

createMap();




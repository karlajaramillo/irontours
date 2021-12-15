console.log(
  JSON.parse(document.querySelector('.map-wrapper').dataset.locations)
);


const mapJSONAll = JSON.parse(
  document.querySelector('.map-wrapper').dataset.locations
);

const mapJSON = mapJSONAll.filter(item => item.mapData.coordinates[0]);
console.log(mapJSON)

mapboxgl.accessToken =
  'pk.eyJ1Ijoia2F2YWphZ2EiLCJhIjoiY2t4M3Nud3N0MHoxcTMwdXFuaDQxenFuOSJ9.v3tfGQnVF20m543RqwLWlA';

// set the bounds of the map
// const geojson = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.349014, 48.864716],
//       },
//       properties: {
//         description: 'Paris, France',
//         message:
//           'You will discover everything you need in this charming with our breathtaking Tour guide, prepare for the best pizza too!',
//         tourGuide: 'Imane',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638946888/tour-project/mnuiyfrtzi1mb7reocir.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-8.632848877366976, 41.20141934195041],
//       },
//       properties: {
//         description: 'Oporto, Portugal',
//         message:
//           'You will love to meet this city with our kind and friendly Tour guide! It will be an unforgettable experience!',
//         tourGuide: 'Joana',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638947518/tour-project/ppuwturojzolnfujolrd.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-6.28830420868073, 36.529762436178004],
//       },
//       properties: {
//         description: 'Cadiz, Spain',
//         message:
//           'You will want to live here!!! Our colombian Tour guide will show your the best beaches at the south of Spain!',
//         tourGuide: 'Karla',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638947873/tour-project/b6zzwwkqubyofo7bgliw.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [13.41053, 52.52437],
//       },
//       properties: {
//         description: 'Berlin, Germany',
//         message:
//           'You will be amazed with our witty and passionate Tour guide, prepare for the best experience!',
//         tourGuide: 'Michael',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638948217/tour-project/ujcnohtycdco0qvpcke1.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.162152849391072, 41.49141063473779],
//       },
//       properties: {
//         description: 'Barcelona, Spain',
//         message:
//           'Our generous argentine Tour guide will show you the most secret places in this amazing city',
//         tourGuide: 'Tomas',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638966845/tour-project/ixpgf03dazpjws079nin.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [12.37129, 51.33962],
//       },
//       properties: {
//         description: 'Leipzig, Germany',
//         message:
//           'Be totally hooked with this city with our unique Tour guide, and prepare for the best Music too!',
//         tourGuide: 'Phillip',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638967396/tour-project/zqlx7oqn5p23hdijxmft.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [10.21076, 56.15674],
//       },
//       properties: {
//         description: 'Aarhus, Denmark',
//         message:
//           'Are you looking for new adventures? You are in the right city, our courageous Tour guide will show you the best!',
//         tourGuide: 'Brigi',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638968567/tour-project/rzoekwmvg7cxspyapgjj.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-5.778204868283153, 43.251327057586984],
//       },
//       properties: {
//         description: 'Mieres, Spain',
//         message:
//           'Meet the beauty of Asturias with our American and pretty lively Tour guide!',
//         tourGuide: 'Lilli',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638969018/tour-project/c9fhvg0c5pzyzib34oab.jpg',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         message:
//           "You won't be able to escape of this city, our passionate Tour guide will help you to find out why!",
//         coordinates: [19.091819287085524, 47.55506932957828],
//       },
//       properties: {
//         description: 'Budapest, Hungary',
//         tourGuide: 'Brigi',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         message:
//           'If you think that you know everything about this city, prepare for the best!',
//         coordinates: [-75.07961245713203, 39.99374438675624],
//       },
//       properties: {
//         description: 'Philadelphia, USA',
//         message:
//           'Maybe you wonder why this city is so amazing, our passionate Tour guide will help you to find out!',
//         tourGuide: 'Lilli',
//         image:
//           'https://res.cloudinary.com/dijmqauxw/image/upload/v1638968095/tour-project/rx0xj9grz3v868faojgf.jpg',
//       },
//     },
//   ],
// };

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  //center: [13.4105300,  52.5243700], // starting position
  zoom: 9,
  scrollZoom: false,
});
// disable map zoom when using scroll
//map.scrollZoom.disable();

const bounds = new mapboxgl.LngLatBounds();

mapJSON.forEach(function (marker) {
  // console.log('mapbox 185');
  // create the popup
  // const newMarker = marker.mapData || marker;
  const popup = new mapboxgl.Popup({
    offset: 10,
    //closeOnClick: false
  }).setLngLat(marker.mapData.coordinates).setHTML(`
         <p class="popup-name">${marker.name}</p> 
         <p class="popup-msg">${marker.description.slice(0, 100)}...</p>
         <div class="tourGuideInfo">
            <img
              src=${marker.tourGuide.image}
              alt='profile image'
              class='main-profile-image'
            />
            <p class="popup-tourGuide">${marker.tourGuide.name}<span> • Tour guide</span></p>
          </div>
  
         <div class="popup-img"><img class="popup-img"src=${marker.image} alt="${marker.name}"></div>
         `);

  // create the DOM element for the marker
  const el = document.createElement('div');
  el.className = 'marker';
  // create the marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(marker.mapData.coordinates)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);

  bounds.extend(marker.mapData.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 50,
    bottom: 200,
    left: 20,
    right: 20,
  },
});

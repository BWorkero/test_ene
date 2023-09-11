import datas from './static/data.json';
console.log(datas)
//                              GET REALTIME INFO
// const mysql = require('mysql')

// const db = mysql.createPool({
//   host: 'localhost',
//   user:   'root',
//   password: 'password',
//   database: 'Dataset',
// });

// const sqlSelect = 'select x,y,z from three_floor where floor_id = 10 and obj_type = 1'
// db.query(sqlSelect,(err,result)=>{
//     if (err){console.log(err);}
//     else{
//         res.send(result);
//         console.log(result)}
// });

let bounds = [
    [0, 0], // padding
    [1165, 1211], // image dimensions
  ];
  
  let map = L.map("map", {
    crs: L.CRS.Simple,
    maxZoom: 0,
    minZoom: 0,
    // zoomSnap: 0.25,
    // maxBounds: bounds,
  }).setView([0,0],1);
  
  L.imageOverlay("static/floor.png",bounds).addTo(map);
  map.fitBounds(bounds);

  // map.on("click",function(e){
  //   var marker = new L.marker([e.latlng.lat, e.latlng.lng], {
  //     icon: active,
  //     rotationAngle: 45
  //   }).addTo(map);
  //   console.log(e.latlng.lat,e.latlng.lng)
  // })
  // latldeo = {lat: 380.0000625009766, lng: 
  //   67.49959193876876}
  // latldeo = {lat: -380.5, lng: 96.50027204082082}

const active = L.icon({
  iconUrl: "https://backendwms.workero.com/react/supplier/dashboard/images/desk-active.svg",
  iconSize: [20, 20], // size of the icon
  // iconAnchor: [0, 300], // changed marker icon position
  popupAnchor: [0, -60]
})

const inactive = L.icon({
  iconUrl: "https://backendwms.workero.com/images/supplier/desk-inactive.svg",
  iconSize: [20, 20], // size of the icon
  // iconAnchor: [0, 300], // changed marker icon position
  popupAnchor: [0, -60]
})

const notyet = L.icon({
  iconUrl: "https://backendwms.workero.com/react/supplier/dashboard/images/desk-booked.svg",
  iconSize: [20, 20], // size of the icon
  // iconAnchor: [0, 300], // changed marker icon position
  popupAnchor: [0, -60]
})
//   L.marker([-latldeo.lat+415,-13+ latldeo.lng], {
//     icon: active,
//     rotationAngle: 90
// }).addTo(map)

const correction = {
  0:{lat:1162,lng:0},
  45:{lat:1168,lng:-5},
  90:{lat:1175,lng:-10},
  135:{lat:1182,lng:-4},
  180:{lat:1184,lng:1},
  225:{lat:1182,lng:10},
  270:{lat:1173,lng:13},
  315:{lat:1165,lng:8},
}


// specify popup options
const customOptions = {
  minWidth: "300", // set max-width
  // keepInView: true, // Set it to true if you want to prevent users from panning the popup off of the screen while it is open.
};
for (let i = 0; i < datas.data.length; i++) {
  const lat = datas.data[i].position.lat 
  const lng = datas.data[i].position.lng
  const rot = datas.data[i].orientation
  const product_name = datas.data[i].product_name
  const hero = datas.data[i].hero_id
  const time = datas.data[i]['time(bd.checkin_time)']
  if (hero && time){
    const marker = new L.marker(
      [correction[rot].lat+lat, 
      correction[rot].lng+lng],{
                  icon :active,
                  rotationAngle: rot
    })
    .bindPopup(`<div class="customPopup">
    <ul class="tabs-example" data-tabs>
      <li><a data-tabby-default href="#sukiennice">Occupation today</a></li>
      <li><a href="#town-hall-tower">Occupation rate</a></li>
    </ul>
    <div id="sukiennice">
      <h2>${product_name}</h2>
      <div>Occupy by ${hero}</div>
      <div>Arrived at ${time}</div>
    </div>
    <div id="town-hall-tower">
    <h2>Occupancy rate for ${product_name}</h2>
    <h1>${(Math.random() * (80 - 50) + 50).toFixed(2)}%</h1>
      </div>
  </div>`
      , customOptions).on("click", runTabs)
    .addTo(map);
  }else if (hero){
    const marker = new L.marker(
      [correction[rot].lat+lat, 
      correction[rot].lng+lng],{
                  icon :notyet,
                  rotationAngle: rot
    })
    .bindPopup(`<div class="customPopup">
    <ul class="tabs-example" data-tabs>
      <li><a data-tabby-default href="#sukiennice">Occupation today</a></li>
      <li><a href="#town-hall-tower">Occupation rate</a></li>
    </ul>
    <div id="sukiennice">
      <h2>${product_name}</h2>
      <div>Occupy by ${hero}</div>
      Not yet arrived
    </div>
    <div id="town-hall-tower">
    <h1>${(Math.random() * (80 - 50) + 50).toFixed(2)}%</h1>
    <div style="text-align:center;">Occupancy rate for ${product_name}</div>
    </div>
  </div>`
      , customOptions).on("click", runTabs)
    .addTo(map);
  }else{
    const marker = new L.marker(
      [correction[rot].lat+lat, 
      correction[rot].lng+lng],{
                  icon :inactive,
                  rotationAngle: rot
    })
    .bindPopup(`<div class="customPopup">
    <ul class="tabs-example" data-tabs>
      <li><a data-tabby-default href="#sukiennice">Occupation today</a></li>
      <li><a href="#town-hall-tower">Occupation rate</a></li>
    </ul>
    <div id="sukiennice">
      <h2>${product_name}</h2>
      <div>Not occupy</div>
    </div>
    <div id="town-hall-tower">
      <h2>Occupancy rate for ${product_name}</h2>
      <h1>${(Math.random() * (80 - 50) + 50).toFixed(2)}%</h1>
    </div>
  </div>`
      , customOptions).on("click", runTabs)
    .addTo(map);
  }


  // if (rot == 0) {
  //   const marker = new L.marker([1162+lat, lng],{
  //     icon :active,
  //   }).addTo(map);
  // }
  // if (rot == 45) {
  //   const marker = new L.marker([1168+lat, -5+lng],{
  //     icon :active,
  //     rotationAngle: rot
  //   }).addTo(map);
  // }
  // if (rot == 90) {
  //   const marker = new L.marker([1175+lat, -10+lng],{
  //     icon :active,
  //     rotationAngle: rot
  //   }).addTo(map);
  // }
  // if (rot == 135) {
  //   const marker = new L.marker([1182+lat, -4+lng],{
  //     icon :active,
  //     rotationAngle: rot
  //   }).addTo(map);
  // }

  // if (rot == 180) {
  //   const marker = new L.marker([1184+lat, 1+lng],{
  //     icon :active,
  //     rotationAngle: rot
  //   }).addTo(map);
  // }
  // if (rot == 225) {
  //   const marker = new L.marker([1182+lat, 10+lng],{
  //     icon :active,
  //     rotationAngle: rot
  //   }).addTo(map);
  // }
  // if (rot == 270) {
  //   const marker = new L.marker([1173+lat, 13+lng],{
  //     icon :active,
  //     rotationAngle: rot
  //   }).addTo(map);
  // }
  // if (rot == 315) {
  //   const marker = new L.marker([1165+lat, 8+lng],{
  //     icon :active,
  //     rotationAngle: rot
  //   }).addTo(map);
  // }

}
function runTabs() {
  const tabs = new Tabby("[data-tabs]");
}
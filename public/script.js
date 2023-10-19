import datas from './static/data.json';



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


const active = L.icon({
  iconUrl: "https://backendwms.workero.com/react/supplier/dashboard/images/desk-active.svg",
  iconSize: [20, 20], // size of the icon
  // iconAnchor: [0, 300], // changed marker icon position
  popupAnchor: [0, -60]
})






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

  const marker = new L.marker(
    [lat, 
    lng],{
                icon :active,
                rotationAngle: rot
  })
  .bindPopup(`<div class="customPopup">
  <ul class="tabs-example" data-tabs>
    <li><a data-tabby-default href="#sukiennice">Automatic settings</a></li>
    <li><a href="#town-hall-tower">Manual settings</a></li>
  </ul>
  <div style="text-align:center;"id="sukiennice">
    <label class="switch">
    <input type="checkbox">
    <span class="slider round"> </span>
    </label>
    <div class="auto"> Temperature based on occupancy </div>
  </div>
  <div id="town-hall-tower">

  <input id="slide" type="range" min="15" max="25"  value="18">
  <output id="output">18°</output>
  
    <button class="btn">Confirm</button>
  </div>`
    , customOptions).on("click", runTabs)
  .addTo(map);
  
}


function runTabs() {
  const tabs = new Tabby("[data-tabs]");
  document.getElementById("slide").oninput = function() {
    myFunction()
};

function myFunction() {
   var val = document.getElementById("slide").value //gets the oninput value
   document.getElementById('output').innerHTML = val+"°" //displays this value to the html page
   console.log(val+"°")
}
}
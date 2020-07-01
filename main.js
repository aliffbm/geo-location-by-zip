
// grab button
let button = document.querySelector('header button');
// declare global map variable to store map object
var map; 
// add event listener to search button
button.addEventListener('click', function (e) {
    // grab the value from input
    let zip = document.querySelector('header input').value;
    // create a regular expression to test the input. 
    var regex = /^\d{5}$/
    
    if(regex.test(zip)) { // fetch the geo info from geocoding api
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=API_KEY`)
        .then(response => response.json()) 
        .then(data => {
            // grab all the pertinent data
            let results = data.results[0];
            let geoLocation = results.geometry.location;
            let lat = geoLocation.lat;
            let lng = geoLocation.lng;
            console.log(data)
            // call make map, which uses the google object from the cdn loaded in html
            makeMap(lat, lng);
            // create a marker and place it on the map		
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: map
            });
        })
    } else {
        console.log("zip should be five bunmber")
    }
    

})
function makeMap(lat, lng) {
    map = new google.maps.Map(document.getElementById("map-container"), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 8
    });
}


// global var declaration -: -->

let currentmarker




// Adding a local log of lat long and timestamp provided by geolocation --> 

function logLocation(lat, long, accuracy) {
    // Get existing logs from localStorage
    let logs = JSON.parse(localStorage.getItem("geolocationLogs")) || [];

    // Add new log entry
    logs.push({
        timestamp: Date.now(),
        lat,
        long,
        accuracy
    });

    // Save back to localStorage
    localStorage.setItem("geolocationLogs", JSON.stringify(logs));
}

// Adding a local log of lat long and timestamp provided by geolocation --



// setting default veiw of map and getting accurate user location --> 

let curr_lat = 20
let curr_long = 78
let accuracy = 0

var map = L.map('map').setView([curr_lat,curr_long],5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

function getaccuratelocation(maxRetries = 10){



navigator.geolocation.getCurrentPosition((pos) => {

        

        
        accuracy = pos.coords.accuracy 
        curr_lat = pos.coords.latitude;
        curr_long = pos.coords.longitude;

        console.log(curr_lat,curr_long,accuracy)

        logLocation(curr_lat,curr_long,accuracy)

        if(accuracy > 100 && maxRetries > 0) {

            console.log("Accuracy too low, retrying...", accuracy )

            setTimeout(() => getaccuratelocation(maxRetries - 1), 50);
                return;
        }

        map.setView([curr_lat,curr_long],13)


        localStorage.setItem("lat" , curr_lat)
        localStorage.setItem("long" , curr_long)
        localStorage.setItem("accuracy" , pos.coords.accuracy)
        localStorage.setItem("timestamp" , Date.now())

        if(accuracy > 100 ) {

            alert("accuracy is VERY LOW , PIN your location manually!")
        }
      
},(err) => {
    console.error("Error getting location:", err);
},
/// configuring accuraccy through passing the 3rd paameter in the geolocation function -->
{ enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0}
/// configuring accuraccy through passing the 3rd paameter in the geolocation function --

)
}

getaccuratelocation();





// setting default veiw of map and getting accurate user location --


// function PIN MY LOCATION -->

function pin_mylocation() {

var marker1 = L.marker([curr_lat, curr_long]).addTo(map);
currentmarker = marker1

// form content -->

const popupcontent = `<section class="bg-amber-300 text-xl font-bold max-h-140  rounded-3xl shadow-amber-200 shadow-2xl">

    <form id="myform" class="p-4">

        <label for="location">Your Location:</label><br>
        <input type="text" id="location" name="location" placeholder="..." required class="border-1 border-black w-60 p-2 rounded-2xl mt-2"><br><br>

        <label for="image" class="">Upload Image:</label><br>
        <input type="file" id="image" name="image" class="cursor-pointer border-1 border-black w-60 p-2 rounded-2xl mt-2" accept="image/*" required  ><br><br>

        <label for="description">Description:</label><br>
        <textarea id="description" name="description" rows="4" cols="40" placeholder="Write a short description..." class="border-1 border-black w-60 h-17 p-2 rounded-2xl mt-2" required></textarea><br><br>

        
        
        <button id="submit_button" type="button" onclick = "submitForm()" class="bg-red-600 p-4 rounded-3xl max-w-30 ml-[35%] cursor-pointer hover:scale-110 hover:brightness-105 hover:shadow-md hover:shadow-yellow-200 duration-400 flex items-center justify-center">Submit</button>

         
    </form>


  </section>`

// form content --

currentmarker.bindPopup(popupcontent).openPopup()

}

// function PIN MY LOCATION ---

// Adding on click functionalitiy on submit button in the added form in the popup ->

function submitForm() {

    console.log("Button clicked!");
    
    // Get the form data
    const location_data = document.querySelector("#location").value;
    const description_data = document.querySelector("#description").value;
    
    console.log("Location:", location_data);
    console.log("Description:", description_data);
    
    // Find which marker has the open popup and change its content
    currentmarker.setPopupContent(`
    <div class="bg-amber-300 text-xl font-bold min-h-30 rounded-3xl shadow-amber-200 shadow-2xl flex items-center justify-center p-4">
        Thanks for submitting! We'll verify your request on location ${location_data} and get back to you soon!
    </div>
`).openPopup();
     


    
}


// Adding on click functionalitiy on submit button in dynamically added form in the popup --



// click on map configured here --> 
 
// map.off("click" , pin_on_click)

// click on map configured here --


function pin_on_click (e){

    const pos = e

    const clicked_lat = pos.latlng.lat
    const clicked_long = pos.latlng.lng

    const newmarker = L.marker([clicked_lat,clicked_long]).addTo(map)

    newmarker.bindPopup("Want to add something here??").openPopup()


      


}

function pin_on_map () {



    const popup = document.getElementById("pin_on_map_popup")
    popup.classList.remove("hidden")

     map.on("click" , pin_on_click)

    

     setTimeout(() => {
        
        popup.classList.add("hidden")
        map.off("click" , pin_on_click)} , 8000 )

   

}







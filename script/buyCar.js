 //retriving some data from loacalstorage  vsuerDataList


 var currentSigninUser = sessionStorage.getItem("currentSigninUser") || "";
 console.log(currentSigninUser);

 if (currentSigninUser==""){
    document.getElementById("userLogo").style.display="none";
    document.getElementById("ads").style.display="block";
}
 document.getElementById("userLogoName").innerHTML = currentSigninUser + ",   &#128075;&#x1F604;";        //signin user


 var allAddedVehicles = JSON.parse(localStorage.getItem("vuserDataList"));

 var buyVehicleIndex;

 function showPaymentInterface(index) {
     const paymentInterface = document.getElementById('paymentInterface');
    if(currentSigninUser) {
        
    paymentInterface.style.display = 'block';
     buyVehicleIndex = index;
     console.log(buyVehicleIndex);}
     else{
        alert("you need to be log in first");
     }

 }




 function closePopup(){
    // alert("working");
    document.getElementById("loginPopup").style.display = "none";
}

function showLoginPopup(){
    if(!currentSigninUser){
        document.getElementById("loginPopup").style.display="block";
    }
}

//logout functionality in nav
function logout() {
    if (currentSigninUser) {
        var msg = confirm("Are you sure you want to logout");
        console.log(msg);
        if (msg==true) {
            let currentSigninUser = "";
            sessionStorage.setItem("currentSigninUser", currentSigninUser);
        }else{
            alert("thanks to stay here");
        }
    }
    else {
        alert("you are already logged out");
    }
}


function redirectToLogin(){
    window.location.href="signin.html";
}

function redirectToRegister(){
    window.location.href="register.html";
}

 function removePurchasedVehicle() {
     // Retrieve the vehicle data from local storage
     let vuserDataList = JSON.parse(localStorage.getItem('vuserDataList')) || [];


     // Get the details of the purchased car before removing it
     const purchasedCar = vuserDataList[buyVehicleIndex];


     // Remove the vehicle at the given index
     vuserDataList.splice(buyVehicleIndex, 1);

     // Update the local storage with the modified vehicle data
     localStorage.setItem('vuserDataList', JSON.stringify(vuserDataList));


     // Optional: You can also remove the vehicle card from the UI if needed
     const vehicleCardToRemove = document.getElementById('vehicleGrid').children[buyVehicleIndex];
     if (vehicleCardToRemove) {
         vehicleCardToRemove.remove();
     }

     document.getElementById("paymentInterface").style.display = "none";
     alert("you have Successfully perchacsed a Car");

     const indianTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
     const d = new Date(indianTime).toLocaleString();

     // Create an object containing details of the purchased car and the current signed-in user
     const purchasedCarDetails = {
         user: currentSigninUser,
         car: purchasedCar,// Details of the purchased car
         date: d
     };

     // Retrieve the existing successful purchases from local storage or create an empty array
     let successfulPurchases = JSON.parse(localStorage.getItem('successfulPurchases')) || [];

     // Add the new purchase to the array
     successfulPurchases.unshift(purchasedCarDetails);

     // Store the updated array back in local storage
     localStorage.setItem('successfulPurchases', JSON.stringify(successfulPurchases));

     alert(successfulPurchases);

 }


 const carModels = {
     "Maruti Suzuki Alto":"",
     "Maruti Suzuki Beleno":"../images/tatanano.jpg",
     "Maruti Suzuki Dzire":"../images/tatanano.jpg",
     "Maruti Suzuki Fronx":"../images/tatanano.jpg",
     "Maruti Suzuki Grand Vitara":"../images/tatanano.jpg",
     "Maruti Suzuki Ertiga":"../images/tatanano.jpg",
     "Maruti Suzuki Brezza":"../images/tatanano.jpg",

     "Hyundai Grand i10 Nios":"../images/.jpg",
     "Hyundai Grand i10 Venue":"../images/.jpg",
     "Hyundai Grand i10 Verna":"../images/.jpg",
     "Hyundai Grand i10 Creta":"../images/.jpg",


     "Tata Altroz":"../images/.jpg",
     "Tata Tigor":"../images/.jpg",
     "Tata Tiago":"../images/.jpg",
     "Tata Safari":"../images/.jpg",
     "Tata Punch":"../images/.jpg",


     "Honda City":"../images/.jpg",

     "Mahindra Bolero":"../images/.jpg",
     "Mahindra XUV 700":"../images/.jpg",
     "Mahindra Thar":"../images/mahindra thar.avif",
     "Mahindra Scorpio":"../images/scorpio.jpg",

     "Toyota Fortuner":"../images/.jpg",
     "Toyota Innova Crysta":"../images/.jpg",
     "Toyota Glanza":"../images/.jpg",
     
     "MG Hector":"../images/.jpg",
     "MG Gloster":"../images/.jpg",

     "KIA Carnival":"../images/.jpg",

     "Nissan Magnite":"../images/.jpg",

     
     
      "Tata nano": "../images/tatanano.jpg",
     "enova": "../images/enova.jpg",
     "scorpio": "../images/scorpio.jpg",
     "swift": "../images/swift.jpg",
     "jaguar I pace": "../images/jaguarIpace.jpg",
     "jaguar E pace": "../images/jaguarEpace.jpg",
     "audi": "../images/Audi.avif",
     "vagnar": "../images/vaganar.jpg",
     "Thar": "../images/mahindra thar.avif",
     "maruti800": "../images/maruti800.jpg"



     // Add more model names and image URLs here...
 };

 function findMatchingModel(model) {
     // Convert the model name to lowercase and remove spaces
     const normalizedModel = model.toLowerCase().replace(/\s/g, '');
     // Iterate over the keys in the carModels object
     for (const key in carModels) {
         // Convert the current key to lowercase and remove spaces
         const normalizedKey = key.toLowerCase().replace(/\s/g, '');
         // Check if the normalized key contains the normalized model
         if (normalizedKey.includes(normalizedModel)) {
             // Return the URL associated with the matching key
             return carModels[key];
         }
     }
 }



 document.addEventListener('DOMContentLoaded', function () {
     const vuserDataList = JSON.parse(localStorage.getItem('vuserDataList')) || [];
     console.log(vuserDataList);
     // Separate array containing model names and image URLs
     const carModels = {
         "Audi A3": "https://source.unsplash.com/1600x720/?car,audi",
         "Mercedes": "https://source.unsplash.com/1600x720/?car,mercedes",
         "Lamborgini": "https://source.unsplash.com/1600x720/?car,lamborgini",
         "Tesla": "https://source.unsplash.com/1600x720/?car,tesla",
         "Mastang gt": "https://source.unsplash.com/1600x720/?car",
         "Tata nano": "../images/tatanano.jpg",
         "enova": "../images/enova.jpg",
         "scorpio": "../images/scorpio.jpg",
         "swift": "../images/swift.jpg"

         // Add more model names and image URLs here...
     };

     for (let i=(vuserDataList.length-1); i>=0; i--) {
         const { owner, model, running, price } = vuserDataList[i];

         const imageUrl = findMatchingModel(model);




         //the above second line is similar to this
         //const owner = vehicleData.owner;
         // const model = vehicleData.model;
         // const running = vehicleData.running;
         // const price = vehicleData.price;



         const vehicleCard = document.createElement('div');    //i have created a div here
         vehicleCard.classList.add('vehicle-card');

         const image = document.createElement('img');
         image.src = imageUrl || "https://source.unsplash.com/1600x720/?car";
         image.alt = `${model} image`;
         image.style.height = "200px";
         vehicleCard.appendChild(image);

         const ownerNameElement = document.createElement('p');
         ownerNameElement.textContent = `Owner: ${owner}`;
         vehicleCard.appendChild(ownerNameElement);

         const modelElement = document.createElement('p');
         modelElement.textContent = `Model: ${model}`;
         vehicleCard.appendChild(modelElement);

         const runningElement = document.createElement('p');
         runningElement.textContent = `Running: ${running}`;
         vehicleCard.appendChild(runningElement);

         const pricingElement = document.createElement('p');
         pricingElement.textContent = `Ask Price: ${price} ₹`;
         pricingElement.style.backgroundColor = 'gray';
         vehicleCard.appendChild(pricingElement);

         const buybtn = document.createElement('button');

         buybtn.textContent = 'buy now';
         vehicleCard.append(buybtn);
         buybtn.classList.add("buybtn");
         buybtn.style.backgroundColor = "gold";
         if(currentSigninUser){
         buybtn.addEventListener('click', function () {
            
            showPaymentInterface(i);

         })};

         if(!currentSigninUser){
            buybtn.addEventListener('click', function () {
               showLoginPopup() ;
                })};

         document.getElementById('vehicleGrid').appendChild(vehicleCard);


     };





 });






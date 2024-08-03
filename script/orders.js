var currentSigninUser = sessionStorage.getItem("currentSigninUser") || "";
console.log(currentSigninUser);
document.getElementById("userLogoName").innerHTML = currentSigninUser + ",   &#128075;&#x1F604;";
if (currentSigninUser==""){
    document.getElementById("userLogo").style.display="none";
    document.getElementById("ads").style.display="block";
}




//logout functionality
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




document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the details of purchased vehicles from local storage
    const purchasedVehicles = JSON.parse(localStorage.getItem('successfulPurchases')) || [];
    
    if(purchasedVehicles.length>25){
    
        purchasedVehicles.splice(15);  //i am just keeping 15 cars  in localstorage
        localStorage.setItem("successfulPurchases",JSON.stringify(purchasedVehicles));
    }
    // Sort purchased vehicles by date in descending order
  //  purchasedVehicles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Select the container to display purchased vehicles
    const purchasedVehiclesContainer = document.getElementById('purchasedVehicles');

    // Display only the first 10 purchased vehicles
    purchasedVehicles.slice(0, 10).forEach(function (purchase, index) {
        // Create a div for each vehicle card
        const vehicleCard = document.createElement('div');
        vehicleCard.classList.add('vehicle-card');

        // Create headings for user and car details
        const userHeading = document.createElement('h2');
        userHeading.textContent = `Buyer: ${purchase.user}`;
        const carHeading = document.createElement('h2');
        carHeading.textContent = 'Car Details';

        // Create paragraphs for car details and date of purchase
        const carDetails = document.createElement('p');
        const car = purchase.car;
        carDetails.innerHTML = `<strong>Model:</strong> ${car.model}<br>
                                <strong>Owner:</strong> ${car.owner}<br>
                                <strong>Running:</strong> ${car.running}<br>
                                <strong>Price:</strong> ${car.price} ₹`;

        const purchaseDate = document.createElement('p');
        purchaseDate.textContent = `Date of Purchase: ${purchase.date}`;

        // Append headings, details, and date to the vehicle card
        vehicleCard.appendChild(userHeading);
        vehicleCard.appendChild(carHeading);
        vehicleCard.appendChild(carDetails);
        vehicleCard.appendChild(purchaseDate);

        // Append the vehicle card to the purchased vehicles container
        purchasedVehiclesContainer.appendChild(vehicleCard);
    });
});
//logout functionality
function logout() {
    if(currentSigninUser){
        confirm("Are you sure you want to logout");
    
    let currentSigninUser = "";
    sessionStorage.setItem("currentSigninUser", currentSigninUser);
    }
    else{
        alert("you are already logged out");
    }
}

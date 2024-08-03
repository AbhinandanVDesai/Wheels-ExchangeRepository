
//================================================================================
// we have vuserDataList        for this page to store added vehicle

//=================================================================================

// Initialize vusers array with data from local storage, if available
var vusers = JSON.parse(localStorage.getItem("vuserDataList")) || [];
var currentSigninUser = sessionStorage.getItem("currentSigninUser") || "";
if (currentSigninUser == "") {
    document.getElementById("userLogo").style.display = "none";
    document.getElementById("ads").style.display = "block";
}


//this is for sign in box
if (currentSigninUser) {
    console.log("user is alredy signed in");
    document.getElementById("instruction-box").style.display = "none";
} else {
    console.log("user is not signed in");
    document.getElementById("instruction-box").style.display = "block";

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



console.log(currentSigninUser);
document.getElementById("userLogoName").innerHTML = currentSigninUser + ",   &#128075;&#x1F604;";


//------------------------------------------------------------------------------------------------
function setVehicleData() {
    var owner = document.getElementById("owner").value;
    var model = document.getElementById("model").value;
    var passing = document.getElementById("passing").value;
    var running = document.getElementById("running").value;
    var fuel = document.getElementById("fuel").value;
    var price = document.getElementById("expectedPrice").value;

    var vuser = {
        owner: owner,
        model: model,                //assigning values to the object property
        passing: passing,
        running: running,
        fuel: fuel,
        price: price
    };

    if (currentSigninUser) {          //i wanna make sure that before adding anything in local storage user must be sign in
        vusers.push(vuser);
        localStorage.setItem("vuserDataList", JSON.stringify(vusers));
    }



}

//-----------------------------------------------------------------------------------------------------

function recentlyAddVehicles() {
    var storedData = localStorage.getItem("vuserDataList");
    if (storedData) {
        vusers = JSON.parse(storedData);

        // Slice the last three elements from vusers
        var recentAdds = vusers.slice(-3);

        var tableContent = ''; // Initialize tableContent as an empty string before appending data,this is a row for table
        for (var i = 0; i < recentAdds.length; i++) {
            tableContent += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${recentAdds[i].owner}</td>
                    <td>${recentAdds[i].model}</td>
                    <td>${recentAdds[i].passing}</td>
                    <td>${recentAdds[i].running}</td>
                    <td>${recentAdds[i].price}</td>
                    <td>${recentAdds[i].fuel}</td>
                </tr>`;
        }
        document.getElementById("myTable").innerHTML = tableContent;
    } else {
        alert("No vehicle data found!");
    }
}


//====================================VALIDATIONS FOR THE FORM==========================




function validateOwner() {
    var owner = document.getElementById("owner").value;
    var ownerIcon = document.getElementById("ownerIcon");
    if (/^[A-Z][a-z]*$/.test(owner)) {
        document.getElementById("owner").classList.add('is-valid');
        document.getElementById("owner").classList.remove('is-invalid');

        return true;
    } else {
        document.getElementById("owner").classList.add('is-invalid');
        document.getElementById("owner").classList.remove('is-valid');

        return 0;

    }
}

function validateModel() {
    var model = document.getElementById("model").value;
    var modelIcon = document.getElementById("modelIcon");
    if (model.length >= 3 && model.length <= 30) {
        document.getElementById("model").classList.add('is-valid');
        document.getElementById("model").classList.remove('is-invalid');
        return 1;
    } else {
        document.getElementById("model").classList.add('is-invalid');
        document.getElementById("model").classList.remove('is-valid');

        return 0;
    }
}

function validatePassing() {
    var passing = document.getElementById("passing").value;
    var passingIcon = document.getElementById("passingIcon");
    if (passing >= 2008) {
        document.getElementById("passing").classList.add('is-valid');
        document.getElementById("passing").classList.remove('is-invalid');
        return 1;
    } else {
        document.getElementById("passing").classList.remove('is-valid');
        document.getElementById("passing").classList.add('is-invalid');
        return 0;
    }
}

function validateRunning() {
    var running = document.getElementById("running").value;
    var runningIcon = document.getElementById("runningIcon");
    if (running <= 3000000) {
        document.getElementById("running").classList.add('is-valid');
        document.getElementById("running").classList.remove('is-invalid');
        return 1;
    } else {
        document.getElementById("running").classList.remove('is-valid');
        document.getElementById("running").classList.add('is-invalid');
        return 0;
    }
}

function validateFuel() {
    var fuel = document.getElementById("fuel").value.toLowerCase();
    var fuelIcon = document.getElementById("fuelIcon");
    if (fuel === "petrol" || fuel === "disel" || fuel === "electric") {
        document.getElementById("fuel").classList.add('is-valid');
        document.getElementById("fuel").classList.remove('is-invalid');
        return 1;
    } else {
        document.getElementById("fuel").classList.remove('is-valid');
        document.getElementById("fuel").classList.add('is-invalid');
        return 0;
    }
}



//------------------------final validation-------------------------------------

function formValidation() {


    if (validateFuel() && validateModel() && validateOwner() && validatePassing() && validateRunning() && validateFuel()) {
        setVehicleData();
        alert("your vehicle is added successfully");
        window.location.href = 'index.html';
    }
    else {
        if (currentSigninUser) {
            alert("vehicle is not added");
        } else {
            alert("you need to be loged in");
        }

    }

}




//======================================xml page load==============

function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", page + ".html", true);
    xhttp.send();
}




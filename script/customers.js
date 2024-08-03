
var vusers = JSON.parse(localStorage.getItem("vuserDataList")); ////======>>>MY LOCALSTORAGE DATA vusers[]


var currentSigninUser = sessionStorage.getItem("currentSigninUser") || "";    //sign in user stored in session storage
console.log(currentSigninUser);  
if (currentSigninUser==""){
    document.getElementById("userLogo").style.display="none";
    document.getElementById("ads").style.display="block";
}                                         //signinuser
document.getElementById("userLogoName").innerHTML=currentSigninUser + ",   &#128075;&#x1F604;";




function getvehicleData() {
    var row = '';
    for (var i = 0; i < vusers.length; i++) {
        row += `
            <tr>
                <td>${i + 1}</td>
                <td>${vusers[i].owner}</td>
                <td>${vusers[i].model}</td>
                <td>${vusers[i].passing}</td>
                <td>${vusers[i].running}</td>
                <td>${vusers[i].fuel}</td>
                <td>${vusers[i].price}</td>

                <td><button class="btn btn-warning" onclick="updateVehicle(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteVehicle(${i})">Delete</button></td>
            </tr>`;
    }
    document.getElementById('myTable').innerHTML = row;
}

getvehicleData(); //i have called the function so i dont need press button or something to call the function



//==============Delete function============================================

function deleteVehicle (index){
vusers.splice(index,1);
getvehicleData();
localStorage.setItem('vuserDataList' , JSON.stringify(vusers));
}



//=======================update vehicle=============================================
var currentIndex;
function updateVehicle(index){
document.getElementById("popup").style.display="block";       //this function just gonna put a popup form

currentIndex = index;

var currentVuser = vusers[index];
console.log(currentVuser);
document.getElementById("owner").value= vusers[index].owner;
document.getElementById("model").value = currentVuser.model;
document.getElementById("passing").value = currentVuser.passing;
document.getElementById("running").value = currentVuser.running;
document.getElementById("fuel").value=currentVuser.fuel;
document.getElementById("price").value=currentVuser.price;

}

//---------------------------------update data in localstorage--------------------


function updateBtn(){
var vuser={
owner:document.getElementById("owner").value,
model:document.getElementById("model").value,
passing:document.getElementById("passing").value,    //this i have created a object 
running:document.getElementById("running").value,
fuel:document.getElementById("fuel").value,
price:document.getElementById("price").value
}

vusers[currentIndex]=vuser;                                     //vuser is globle variable we created at the start of the script to store my localstorage 'vusers' array so thats why i havent used var or let here before vusers cause i new if i declare it with key word then its scope will be only function level
localStorage.setItem("vuserDataList",JSON.stringify(vusers));

document.getElementById("popup").style.display="none";   //this will remove the popup

getvehicleData();  // called this function again to see updated table
}

//logout----------------------------------------------------------------------
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


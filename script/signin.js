//======================================================================================
//for this page  localstorage is  currentSigninUser
//===================================================================================



var currentSigninUser = sessionStorage.getItem("currentSigninUser") || "";
console.log(currentSigninUser);
if (currentSigninUser == "") {
    document.getElementById("userLogo").style.display = "none";
    document.getElementById("ads").style.display = "block";
}
document.getElementById("userLogoName").innerHTML = currentSigninUser + ",   &#128075;&#x1F604;";



function validateForm(event) {
    event.preventDefault();  //this gonna prevent default behavior of event

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var valid = false;

    if (username.trim() === '') {
        document.getElementById('usernameError').innerText = 'Please enter your username';
    } else if (password.trim() === '') {
        document.getElementById('passwordError').innerText = 'Please enter your password';
    } else {
        // Retrieve registered users' data from local storage
        var registeredUsers = JSON.parse(localStorage.getItem('usersList')) || [];

        // Check if the entered username and password match any registered user
        for (var i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i].name === username && registeredUsers[i].password === password) {
                valid = true;
                currentSigninUser = registeredUsers[i].name;
                sessionStorage.setItem("currentSigninUser", currentSigninUser);  //here i am storing a user data which mactchthe sign in input , this value change at every iteration thats why we only get a value which is iterated last i.e when we mach the sign in credential with registered data , so this storage only stores single name 


                // Show the popup box
                document.getElementById('loginPopup').style.display = 'block';       //

                // Show the heading first
                document.getElementById('loginText').style.display = 'block';

                // After a certain duration, show the icon
                setTimeout(function () {
                    document.getElementById('loginIcon').style.display = 'block';
                }, 2000); // Change 2000 to the desired duration in milliseconds (e.g., 2000 = 2 seconds)


                //  // After another certain duration, hide the popup box
                // setTimeout(function () {
                //     document.getElementById('loginPopup').style.display = 'none';
                //  }, 4000); // Change 4000 to the desired duration in milliseconds (e.g., 4000 = 4 seconds)
                redirecctHomePage();

                break;
            }
        }
        //

        if (!valid) {                                                //initial value of valid is false so negation of valid is true so the if(true) statement executed
            alert("invalid credentials please  try again!");
            //document.getElementById('passwordError').innerText = 'Invalid username or password';
        }
    }

    return valid;

}

document.getElementById('signin').addEventListener('submit', validateForm);




//==================================function============================

function redirecctHomePage() {
    window.location.href = 'index.html';

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






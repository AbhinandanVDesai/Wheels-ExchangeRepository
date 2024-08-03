   //=====================
      //usersList (localStorage)
    //////////////////////////

    //var users=JSON.parse(localStorage.getItem("usersList")) || [];

    var currentSigninUser = sessionStorage.getItem("currentSigninUser") || "";
        console.log(currentSigninUser);

        if (currentSigninUser==""){
            document.getElementById("userLogo").style.display="none";
            document.getElementById("ads").style.display="block";
        }
        document.getElementById("userLogoName").innerHTML=currentSigninUser + ",   &#128075;&#x1F604;";



var nameInp = document.getElementById("fullname");
        var emailInp = document.getElementById("email");
         var passwordInp =document.getElementById("password");
         var cpasswordInp =document.getElementById("confirmPassword");

      //creating a Super Admin
    let superAdmin ={
        name:"superAdmin",
        password:"superAdmin@123"
    }



    function setRegister() {
        var name = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
         var password =document.getElementById("password").value;
         var role=document.getElementById("role").value;
        var users = JSON.parse(localStorage.getItem("usersList")) || [];
        
        let user = {
            name: name,
            email: email,
            password:password,
            Role:role
        };
        users.push(user);

        localStorage.setItem("usersList", JSON.stringify(users));
        displayUsers();
    }


    var currentIndex;  //creating this variable to store  the index of that particular user it will be usefull while updating the data
    function displayUsers() {
        var users = JSON.parse(localStorage.getItem("usersList")) || [];
          users[0]=superAdmin;   //try to seed superAdmin data here not succeded yet
        var userTable = document.getElementById("userTable");
        userTable.innerHTML = '';
        for (var i = 0; i < users.length; i++) {
            
            var row = `<tr>
                        <td>${i+1}</td>
                        <td>${users[i].name}</td>
                        <td>${users[i].email}</td>
                         <td>
                            <button class="btn btn-warning" onclick="getUserInfoForUpdate(${i})">Update</button>
                            <button class="btn btn-danger" onclick="deleteUser(${i})">Delete</button>
                        </td>
                    </tr>`;
            userTable.innerHTML += row;
        }
    }

    // Display registered users on page load
    displayUsers();


    //====================UPDATE FUNCTIONALITY=======================================


    function getUserInfoForUpdate(index){
        currentIndex=index;      //this is the index we are passing in the function which we gonna store in our currentIndex globle variable otherwise
       
        var users=JSON.parse(localStorage.getItem("usersList"));
        var user=users[currentIndex];
         nameInp.value=user.name;
         emailInp.value=user.email;
         passwordInp.value=user.password;
         cpasswordInp.value=user.password;
         console.log(currentIndex);
    }


        function updatebtn(){
            var users=JSON.parse(localStorage.getItem("usersList")) || [];

            let user={
                name:nameInp.value,
                email:emailInp.value,
                password:passwordInp.value
            }

            users[currentIndex]=user;

            localStorage.setItem("usersList",JSON.stringify(users));

            displayUsers();

        }





//=====================================DELETE FUNCTION====================================

        function deleteUser(index){
            var users=JSON.parse(localStorage.getItem("usersList")) || [];

            users.splice(index,1);

            localStorage.setItem("usersList",JSON.stringify(users));

            displayUsers();


        }





        //=======================VALIDATIONS FOR INPUT FEIEDS===============

    
        // Global variables for input fields
        var fullnameInput = document.getElementById('fullname');
        var emailInput = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        var confirmPasswordInput = document.getElementById('confirmPassword');

        // Add input event listeners for real-time validation
        fullnameInput.addEventListener('input', validateFullName);
        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);

        

        function validateFullName() {
            if (fullnameInput.value.trim() === '') {
                fullnameInput.classList.remove('is-valid');
                fullnameInput.classList.add('is-invalid');
                document.getElementById('fullnameFeedback').textContent = 'Full name is required.';
                return 0;
            } else {
                fullnameInput.classList.remove('is-invalid');
                fullnameInput.classList.add('is-valid');
                document.getElementById('fullnameFeedback').textContent = '';
                return 1;
            }
        }

        function validateEmail() {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                document.getElementById('emailFeedback').textContent = 'Invalid email format.';
                return 0;
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                document.getElementById('emailFeedback').textContent = '';
                return 1;
            }
        }

        function validatePassword() {
            var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(passwordInput.value.trim())) {
                passwordInput.classList.remove('is-valid');
                passwordInput.classList.add('is-invalid');
                document.getElementById('passwordFeedback').textContent = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.';
                return 0;
            } else {
                passwordInput.classList.remove('is-invalid');
                passwordInput.classList.add('is-valid');
                document.getElementById('passwordFeedback').textContent = '';
                return 1;
            }
        }

        function validateConfirmPassword() {
            if (confirmPasswordInput.value.trim() === '') {
                confirmPasswordInput.classList.remove('is-valid');
                confirmPasswordInput.classList.add('is-invalid');
                document.getElementById('confirmPasswordFeedback').textContent = 'Please confirm your password.';
                return 0;
            } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
                confirmPasswordInput.classList.remove('is-valid');
                confirmPasswordInput.classList.add('is-invalid');
                document.getElementById('confirmPasswordFeedback').textContent = 'Passwords do not match.';
                return 0;
            } else {
                confirmPasswordInput.classList.remove('is-invalid');
                confirmPasswordInput.classList.add('is-valid');
                document.getElementById('confirmPasswordFeedback').textContent = '';
                return 1;
            }
        }



        //-----------------------final validation--------------------

       

    // If the form is valid, submit it

    function validRegistraion(){
    if (validateFullName() && validateEmail() && validatePassword() && validateConfirmPassword()) {
        setRegister();
        alert("succssefully registered");
    }else{
        alert("registration failed");
    }
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


//--------------------------------------------------------------------------------------------------
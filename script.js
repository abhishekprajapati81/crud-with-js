// Function to display user data in the table
function displayUserData(userData) {
    var userDataBody = document.getElementById('userDataBody');
    userDataBody.innerHTML = ''; // Clear previous data
    // Check if userData is an array
    if (Array.isArray(userData)) {
      // Iterate over each user and create table rows
      userData.forEach(function(user, index) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.userEmail}</td>
          <td>${user.userPassword}</td>
          <td>
            <button class="btn btn-info btn-sm" onclick="editUser(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
          </td>
        `;
        userDataBody.appendChild(newRow);
      });
    } else {
      console.error("userData is not an array:", userData);
    }
  }

  // Function to edit user data
  function editUser(index) {
    var userDataString = localStorage.getItem('userData');
    var userData = userDataString ? JSON.parse(userDataString) : [];
    if (index >= 0 && index < userData.length) {
      var user = userData[index];
      // Populate form fields with existing user data
      document.getElementById('fName').value = user.firstName;
      document.getElementById('lname').value = user.lastName;
      document.getElementById('email').value = user.userEmail;
      document.getElementById('password').value = user.userPassword;

      // Update the form submit button to handle editing
      var submitButton = document.querySelector('#userForm button[type="submit"]');
      submitButton.textContent = 'Update User';
      submitButton.onclick = function(event) {
        event.preventDefault();
        // Update the user data at the specified index
        userData[index] = {
          firstName: document.getElementById('fName').value,
          lastName: document.getElementById('lname').value,
          userEmail: document.getElementById('email').value,
          userPassword: document.getElementById('password').value
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displayUserData(userData);
        // Reset form and button text after updating
        document.getElementById('userForm').reset();
        submitButton.textContent = 'Add User';
        submitButton.onclick = addUser;
      };

      // Show the form modal
      var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
      modal.show();
    } else {
      console.error("Invalid index:", index);
    }

    document.getElementById('userData').reset();
  }

  // Function to add a new user
  function addUser(event) {
    event.preventDefault(); // Prevent the default form submission
    var fName = document.getElementById('fName').value;
    var lName = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var newUser = {
      firstName: fName,
      lastName: lName,
      userEmail: email,
      userPassword: password
    };
    var userDataString = localStorage.getItem('userData');
    var userData = userDataString ? JSON.parse(userDataString) : [];
    userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(userData));
    displayUserData(userData);
    // Clear form fields and hide modal after adding user
    document.getElementById('fName').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
  }

  // Function to delete a user
  function deleteUser(index) {
    var userDataString = localStorage.getItem('userData');
    var userData = userDataString ? JSON.parse(userDataString) : [];
    if (index >= 0 && index < userData.length) {
      userData.splice(index, 1); // Remove user at the specified index
      localStorage.setItem('userData', JSON.stringify(userData));
      displayUserData(userData);
    } else {
      console.error("Invalid index:", index);
    }
  }

  // Event listener for form submission
  document.getElementById('userForm').addEventListener('submit', addUser);

  // Display user data on page load
  var userDataString = localStorage.getItem('userData');
  var userData = userDataString ? JSON.parse(userDataString) : [];
  displayUserData(userData);







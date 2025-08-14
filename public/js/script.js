import axios from "axios";

 document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
    }; 


    axios.post('/signup', data)
        .then(response => {
            if (response.data.success) {
                // window.location.href = '/login';
            } else {
                console.log('Signup failed: ' + response.data.message);
            }
        })
        .catch(error => {
            console.error('Error during signup:', error);
            console.log('An error occurred during signup. Please try again.');
        }); 
}) 
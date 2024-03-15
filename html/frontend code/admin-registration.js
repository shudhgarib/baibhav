document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');
  registrationForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Collect form data
    const formData = new FormData(registrationForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    try {
      // Send registration data to backend
      const response = await fetch('/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
      });

      if (response.ok) {
        // Registration successful
        alert('Admin registered successfully!');
        // Optionally, redirect to a different page
        window.location.href = '/admin-login.html';
      } else {
        // Registration failed
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error registering admin:', error);
      alert('Internal server error. Please try again later.');
    }
  });
});

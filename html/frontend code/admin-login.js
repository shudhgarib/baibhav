document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Collect form data
    const formData = new FormData(loginForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    try {
      // Send login data to backend
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
      });

      if (response.ok) {
        // Login successful
        const responseData = await response.json();
        // Store token in localStorage or sessionStorage
        sessionStorage.setItem('adminToken', responseData.token);
        // Redirect to dashboard or other page
        window.location.href = 'admin-dashboard.html';
      } else {
        // Login failed
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error logging in admin:', error);
      alert('Internal server error. Please try again later.');
    }
  });
});

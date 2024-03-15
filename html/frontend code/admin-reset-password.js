document.addEventListener('DOMContentLoaded', function() {
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  resetPasswordForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      alert('Invalid token');
      return;
    }

    try {
      const response = await fetch('/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
      });

      if (response.ok) {
        alert('Password reset successful');
        window.location.href = '/admin-login.html'; // Redirect to login page
      } else {
        const errorData = await response.json();
        alert(`Failed to reset password: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Internal server error. Please try again later.');
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Admin Login button event listener
  document.getElementById("adminLoginBtn").addEventListener("click", function() {
    window.location.href = "admin-login.html"; // Redirect to admin login page
  });

  // Admin Registration button event listener
  document.getElementById("adminRegisterBtn").addEventListener("click", function() {
    window.location.href = "admin-registration.html"; // Redirect to admin registration page
  });

  // Student Login button event listener
  document.getElementById("studentLoginBtn").addEventListener("click", function() {
    window.location.href = "student-login.html"; // Redirect to student login page
  });

  // Student Registration button event listener
  document.getElementById("studentRegisterBtn").addEventListener("click", function() {
    window.location.href = "student-registration.html"; // Redirect to student registration page
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Code to fetch student profile and attendance history from the server
  fetchStudentProfile();
  fetchAttendanceHistory();
});

function fetchStudentProfile() {
  // Placeholder function to fetch student profile data from the server
  // Replace this with your actual implementation
  const profileContainer = document.querySelector('.profile');
  profileContainer.innerHTML = `
    <h2>Student Profile</h2>
    <p>Name: shital</p>
    <p>Email: shital123@gmail.com</p>
    <p>Roll Number: 12345</p>
  `;
}

function fetchAttendanceHistory() {
  const historyContainer = document.querySelector('.attendance-history .history-list');
  historyContainer.innerHTML = `
    <h2>Attendance History</h2>
    <ul>
            <li>Date: march 10, 2024 | Status: Present</li>
            <li>Date: march 11, 2024 | Status: Absent</li>
            <li>Date: march 12, 2024 | Status: Present</li>
            <li>Date: march 13, 2024 | Status: Present</li>
    </ul>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  const markEnteringAttendanceBtn = document.getElementById('markEnteringAttendanceBtn');
  const markLeavingAttendanceBtn = document.getElementById('markLeavingAttendanceBtn');

  markEnteringAttendanceBtn.addEventListener('click', async function() {
    await markAttendance('Entering');
  });

  markLeavingAttendanceBtn.addEventListener('click', async function() {
    await markAttendance('Leaving');
  });

  async function markAttendance(status) {
    try {
      const token = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage after login
      if (!token) {
        alert('You need to login to mark attendance');
        return;
      }

      const response = await fetch('/student/mark-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        alert('Attendance marked successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to mark attendance: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Internal server error. Please try again later.');
    }
  }
});

// Admin credentials (replace with your actual admin credentials)
const adminUsername = "admin";
const adminPassword = "admin123";

// Flag to track admin status
let isAdminLoggedIn = false;

// Function to check if the user is the admin
function isAdmin(username, password) {
  return username === adminUsername && password === adminPassword;
}

// Function to prompt for admin credentials
function promptForAdminCredentials() {
  const username = prompt("Enter your username:");
  const password = prompt("Enter your password:");

  return isAdmin(username, password);
}

// Function to make all content within td elements editable
function enableEditing() {
  if (isAdminLoggedIn || promptForAdminCredentials()) {
    const allCells = document.querySelectorAll("#schedule-table td");
    allCells.forEach(cell => {
      cell.contentEditable = true;
      cell.style.border = "1px solid black"; // Optional: Visual cue for editable cells
    });
    isAdminLoggedIn = true; // Set admin status to true after successful login
  } else {
    alert("Authentication failed. You are not authorized to edit shifts.");
  }
}

// Array to store the days of the week
const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Populate pay period start date (replace with the actual start date)
document.getElementById('paystart').innerText = '2023-01-01';

$(document).ready(function () {
  // Function to enable editing mode
  window.enableEditing = function () {
    document.getElementById("schedule-table").contentEditable = "true";
  };

  // Function to save changes
  window.saveChanges = function () {
    // Extract and format the schedule data
    const scheduleData = extractScheduleData();
    const formattedData = formatDataForServer(scheduleData);

    // Send the formatted data to the server for persistence
    saveDataToServer(formattedData);
  };

  // Function to extract schedule data from the table
  function extractScheduleData() {
    const rows = document.getElementById("schedule-table").rows;
    const data = [];

    // Loop through rows and cells to extract data
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].cells;
      const rowData = [cells[0].innerText];

      for (let j = 1; j < cells.length; j++) {
        rowData.push(cells[j].innerText);
      }

      data.push(rowData);
    }

    return data;
  }

  // Function to format data for the server (customize as per your needs)
  function formatDataForServer(data) {
    // Customize the data formatting as per your server requirements
    // In a real application, you might convert the data to JSON or another format
    return data;
  }

  // Function to save data to the server (customize as per your needs)
  function saveDataToServer(data) {
    // Send the data to the server using AJAX or fetch
    $.ajax({
      url: "save_schedule.php", // Change the URL to your server-side script
      type: "POST",
      data: { scheduleData: data },
      success: function (response) {
        alert("Schedule saved successfully!");
        document.getElementById("schedule-table").contentEditable = "false";
        document.getElementById("last-updated").innerText = new Date().toLocaleString();
      },
      error: function (error) {
        console.error("Error saving schedule:", error);
        alert("Error saving schedule. Please try again.");
      }
    });
  }
});

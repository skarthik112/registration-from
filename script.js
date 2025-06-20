document.getElementById("dob").addEventListener("change", function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55 years.");
      this.value = "";
    }
  });
  
  function getEntries() {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
  }
  
  function displayEntries() {
    const entries = getEntries();
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
  
    entries.forEach(entry => {
      const row = `<tr>
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.termsAccepted}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  document.getElementById("registration-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const entry = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      dob: document.getElementById("dob").value,
      termsAccepted: document.getElementById("acceptTerms").checked
    };
  
    const entries = getEntries();
    entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(entries));
    displayEntries();
  
    this.reset(); // Clear the form after submission
  });
  
  // On page load
  window.onload = displayEntries;
  
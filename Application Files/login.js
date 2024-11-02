document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting by default

    const regNo = document.getElementById("regNo").value;
    const dob = document.getElementById("dob").value;

    // Update this array with your actual user details
    const users = [
      { regNo: "12345", dob: "2000-01-01" },
      { regNo: "12346", dob: "2000-02-01" },
      { regNo: "12347", dob: "2000-03-01" },
      { regNo: "12348", dob: "2000-04-01" },
      { regNo: "12349", dob: "2000-05-01" },
      { regNo: "12350", dob: "2000-06-01" },
      { regNo: "12351", dob: "2000-07-01" },
      { regNo: "12352", dob: "2000-08-01" },
      { regNo: "12353", dob: "2000-09-01" },
      { regNo: "12354", dob: "2000-10-01" },
      { regNo: "42733119", dob: "18102004" },
      { regNo: "42733117", dob: "panda" },
      { regNo: "42733111", dob: "tanker" },


    ];

    const user = users.find((user) => user.regNo === regNo && user.dob === dob);

    if (user) {
      window.location.href = "dashboard.html"; // Redirect to dashboard page
    } else {
      document.getElementById("error-msg").innerText =
        "Invalid Register Number or Date of Birth!";
    }
  });

async function fetchAndDisplayUsers() {
  const response = await fetch("/api/users");
  const users = await response.json();

  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; // ניקוי הטבלה לפני הצגה חוזרת
  users.forEach((user) => {
    const row = tbody.insertRow();
    row.insertCell(0).innerText = user.username;
    row.insertCell(1).innerText = user.email;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => deleteUser(user.username));
    row.insertCell(2).appendChild(deleteBtn);
  });
}

async function deleteUser(username) {
  const response = await fetch(`/api/users/${username}`, { method: "DELETE" });
  if (response.ok) {
    fetchAndDisplayUsers(); // רענון הרשימה לאחר מחיקה
  } else {
    alert("Error deleting user");
  }
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayUsers);

document.addEventListener("DOMContentLoaded", async () => {
  const categoryListElement = document.getElementById("categoryList");
  const categories = await fetch("/api/categories").then((res) => res.json());

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.textContent = `${category.name} `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      fetch(`/api/categories/${category.name}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            li.remove();
            alert("Category deleted successfully");
          } else {
            alert("Failed to delete category");
          }
        })
        .catch(() => alert("Error deleting category"));
    };

    li.appendChild(deleteBtn);
    categoryListElement.appendChild(li);
  });
});

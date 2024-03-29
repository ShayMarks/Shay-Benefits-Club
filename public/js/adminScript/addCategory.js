document
  .getElementById("addCategoryForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        alert("Category added successfully.");
        // Optionally, redirect or clear the form
      } else {
        const errorData = await response.json();
        alert(`Failed to add the category: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category.");
    }
  });

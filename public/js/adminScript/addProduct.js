console.log("test");

document.addEventListener("DOMContentLoaded", async () => {
  const categoriesSelect = document.getElementById("categoryName");
  const response = await fetch("/api/categories");
  const categories = await response.json();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.innerText = category.name;
    categoriesSelect.appendChild(option);
  });

  document
    .getElementById("addProductForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const productData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        categoryName: categoriesSelect.value,
        stock: document.getElementById("stock").value,
        image: document.getElementById("image").value,
      };

      // שלח נתונים לשרת
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          const data = await response.json();
          // Display success message, could be an alert or updating the DOM
          alert("Product added successfully!");
          console.log(data);
        } else {
          throw new Error("The product is already in the store.");
        }
      } catch (error) {
        console.error("Error:", error);
        // Display error message, could be an alert or updating the DOM
        alert("Failed to add the product: " + error.message);
      }
    });
});

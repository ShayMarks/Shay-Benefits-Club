document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document
    .getElementById("productListTable")
    .getElementsByTagName("tbody")[0];
  const response = await fetch("/api/products");
  const products = await response.json();

  products.forEach((product) => {
    let row = tableBody.insertRow();
    row.setAttribute("data-product-id", product._id); // To easily identify the product for editing

    let name = row.insertCell(0);
    name.contentEditable = true;
    name.innerText = product.name;

    let description = row.insertCell(1);
    description.contentEditable = true;
    description.innerText = product.description;

    let price = row.insertCell(2);
    price.contentEditable = true;
    price.innerText = product.price.toString();

    let category = row.insertCell(3);
    category.innerText = product.category.name; // תלוי איך אתה מנהל את הקטגוריות

    let stock = row.insertCell(4);
    stock.contentEditable = true;
    stock.innerText = product.stock.toString();

    let image = row.insertCell(5);
    image.contentEditable = true;
    image.innerText = product.image;

    let actions = row.insertCell(-1); // Last cell for actions
    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    saveBtn.addEventListener("click", () => saveProduct(product._id, row));
    actions.appendChild(saveBtn);
  });
});
async function saveProduct(productId, row) {
  const updatedData = {
    name: row.cells[0].innerText,
    description: row.cells[1].innerText,
    price: parseFloat(row.cells[2].innerText),
    categoryName: row.cells[3].innerText, // Note: You might need to handle category differently if it's an object or ID
    stock: parseInt(row.cells[4].innerText, 10),
    image: row.cells[5].innerText,
  };

  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT", // Or 'PATCH' depending on your API
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      alert("Product updated successfully.");
      // Refresh the page or update the UI accordingly
    } else {
      // Handle server errors or invalid responses
      const errorData = await response.json();
      alert(`Failed to update product: ${errorData.message}`);
    }
  } catch (error) {
    // Handle network errors
    alert(`Error: ${error.toString()}`);
  }
}

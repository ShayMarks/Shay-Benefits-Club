document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("productList");

  // Fetch and display all products
  const response = await fetch("/api/products");
  const products = await response.json();

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - <button onclick="removeProduct('${product._id}')">Remove</button>`;
    productList.appendChild(li);
  });
});

// Function to remove a product
function removeProduct(productId) {
  fetch(`/api/products/${productId}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      alert("Product removed successfully");
      window.location.reload(); // Reload to update the product list
    })
    .catch((err) => alert("Error removing product"));
}

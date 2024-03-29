window.onload = async function () {
  const categoriesList = document.getElementById("categories-list");
  const productsList = document.getElementById("products-list");

  // קריאה ל-Endpoint של הקטגוריות
  const categoriesResponse = await fetch("/api/categories");
  const categories = await categoriesResponse.json();

  // הוספת כפתור "כל המוצרים"
  const allProductsItem = document.createElement("li");
  const allProductsBtn = document.createElement("button");
  allProductsBtn.textContent = "All Products";
  allProductsBtn.addEventListener("click", loadAllProducts);
  allProductsItem.appendChild(allProductsBtn);
  categoriesList.appendChild(allProductsItem);

  // תצוגת הקטגוריות בסרגל הכלים
  categories.forEach((category) => {
    const listItem = document.createElement("li");
    const categoryBtn = document.createElement("button");
    categoryBtn.textContent = category.name;
    categoryBtn.addEventListener("click", function () {
      loadProductsByCategory(category.name);
    });
    listItem.appendChild(categoryBtn);
    categoriesList.appendChild(listItem);
  });

  // פונקציה לטעינת כל המוצרים
  async function loadAllProducts() {
    const productsResponse = await fetch("/api/products");
    const products = await productsResponse.json();
    displayProducts(products);
  }

  // פונקציה לטעינת מוצרים לפי קטגוריה
  async function loadProductsByCategory(categoryName) {
    const productsResponse = await fetch(`/api/products/${categoryName}`);
    const products = await productsResponse.json();
    displayProducts(products);
  }

  // פונקציה להצגת מוצרים
  function displayProducts(products) {
    productsList.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>מחיר: ${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price}, ${product.stock}, '${product.image}')">הוסף לעגלה</button>
        `;
      productsList.appendChild(productElement);
    });
  }
  // Initialize the cart array to hold products
  let cart = [];

  // Function to add a product to the cart
  window.addToCart = function (productName, productPrice, stock, imageUrl) {
    const productIndex = cart.findIndex((p) => p.name === productName);
    if (productIndex > -1) {
      if (cart[productIndex].quantity < stock) {
        cart[productIndex].quantity++;
      } else {
        alert(`There's only ${stock} of ${productName} in stock.`);
      }
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: 1,
        image: imageUrl,
      });
    }
    updateCartModal();
  };
  // Function to update the modal with cart contents
  function updateCartModal() {
    const cartModalContent = cart
      .map(
        (product) =>
          `<div><img src="${product.image}" alt="${
            product.name
          }" style="width: 50px; height: auto;"><span>${
            product.name
          } - Quantity: ${product.quantity} x Price: ${product.price} = ${
            product.quantity * product.price
          }</span></div>`
      )
      .join("");
    const total = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    document.getElementById("cart-modal").innerHTML =
      cartModalContent +
      `<div>Total: ${total}</div><button onclick="hideCartModal()">Close</button>`;
  }

  // Function to show the cart modal
  window.showCartModal = function () {
    document.getElementById("cart-modal").style.display = "block";
  };

  // Function to hide the cart modal
  window.hideCartModal = function () {
    document.getElementById("cart-modal").style.display = "none";
  };

  // Ensuring the modal can be closed by clicking outside of it
  window.onclick = function (event) {
    const cartModal = document.getElementById("cart-modal");
    if (event.target == cartModal) {
      hideCartModal();
    }
  };

  // טען את כל המוצרים בעת טעינת הדף
  loadAllProducts();
};

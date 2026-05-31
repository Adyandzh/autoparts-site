const products = [
    { id: 1, name: "Тормозные колодки", price: 4500, category: "brakes" },
    { id: 2, name: "Масляный фильтр", price: 1200, category: "filters" },
    { id: 3, name: "Передняя фара", price: 7800, category: "lights" },
    { id: 4, name: "Свечи зажигания", price: 2500, category: "plugs" }
];

let cart = [];

const productCards = document.querySelectorAll(".product");
const filterSelect = document.querySelector("#filter");
const cartList = document.querySelector("#cart-list");
const totalText = document.querySelector("#total");
const payButton = document.querySelector("#pay-btn");
const clearButton = document.querySelector("#clear-cart");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    renderCart();
}

function renderCart() {
    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<li>Корзина пуста</li>";
        totalText.textContent = "Итого: 0 руб.";
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.name + " — " + item.price + " руб. ";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Удалить";

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
            saveCart();
        });

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    totalText.textContent = "Итого: " + calculateTotal() + " руб.";
}

function calculateTotal() {
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    return total;
}

function addToCart(id) {
    const product = products.find(item => item.id === Number(id));

    if (product) {
        cart.push(product);
        renderCart();
        saveCart();
    }
}

function filterProducts() {
    const selectedCategory = filterSelect.value;

    productCards.forEach(card => {
        const category = card.dataset.category;

        if (selectedCategory === "all" || category === selectedCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.id;
        addToCart(id);
    });
});

filterSelect.addEventListener("change", filterProducts);

payButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        renderCart();
        saveCart();
    }
});

clearButton.addEventListener("click", () => {
    cart = [];
    renderCart();
    saveCart();
});

loadCart();
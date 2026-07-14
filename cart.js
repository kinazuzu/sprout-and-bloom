// cart.js

const addCartButton = document.querySelector(".add-cart-btn");

if (addCartButton) {

    addCartButton.addEventListener("click", () => {

        // Read plant information from the page
        const plant = {
            id: document.body.dataset.id,
            name: document.body.dataset.name,
            price: Number(document.body.dataset.price),
            image: document.body.dataset.image,
            quantity: 1
        };

        // Get existing reservation
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if plant already exists
        const existingPlant = cart.find(item => item.id === plant.id);

        if (existingPlant) {

            existingPlant.quantity++;

        } else {

            cart.push(plant);

        }

        // Save updated reservation
        localStorage.setItem("cart", JSON.stringify(cart));

        // Prevent multiple clicks
        addCartButton.disabled = true;
        addCartButton.textContent = "Added ✓";

        // Small delay so the user sees the confirmation
        setTimeout(() => {
            window.location.href = "contact.html";
        }, 800);

    });

}

// --------------------------
// CONTACT PAGE
// --------------------------

const reservationContainer = document.getElementById("reservationItems");
const emptyReservation = document.querySelector(".empty-reservation");

if (reservationContainer) {

    function renderCart() {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        reservationContainer.innerHTML = "";

        if (cart.length === 0) {

            emptyReservation.style.display = "flex";
            return;

        }

        emptyReservation.style.display = "none";

        cart.forEach(plant => {

            reservationContainer.innerHTML += `
                <div class="reservation-card">

                    <img src="${plant.image}" alt="${plant.name}">

                    <div class="reservation-details">

                        <h4>${plant.name}</h4>

                        <p>₱${plant.price}</p>

                        <div class="quantity-controls">

                            <button class="decrease-btn" data-id="${plant.id}">−</button>

                            <span>${plant.quantity}</span>

                            <button class="increase-btn" data-id="${plant.id}">+</button>

                        </div>

                    </div>

                    <button class="remove-btn" data-id="${plant.id}">
                        Remove
                    </button>

                </div>
            `;

        });

        attachEvents();

    }

    function attachEvents() {

        document.querySelectorAll(".increase-btn").forEach(button => {

            button.onclick = () => {

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const plant = cart.find(item => item.id === button.dataset.id);

                plant.quantity++;

                localStorage.setItem("cart", JSON.stringify(cart));

                renderCart();

            };

        });

        document.querySelectorAll(".decrease-btn").forEach(button => {

            button.onclick = () => {

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const plant = cart.find(item => item.id === button.dataset.id);

                plant.quantity--;

                if (plant.quantity <= 0) {

                    cart = cart.filter(item => item.id !== button.dataset.id);

                }

                localStorage.setItem("cart", JSON.stringify(cart));

                renderCart();

            };

        });

        document.querySelectorAll(".remove-btn").forEach(button => {

            button.onclick = () => {

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                cart = cart.filter(item => item.id !== button.dataset.id);

                localStorage.setItem("cart", JSON.stringify(cart));

                renderCart();

            };

        });

    }

    renderCart();

}

// --------------------------
// RESERVATION FORM
// --------------------------

const reservationForm = document.querySelector(".contact-form form");

if (reservationForm) {

    reservationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {

            alert("Please add at least one plant to your reservation.");

            return;

        }

        alert("Reservation submitted successfully!");

        // Clear reservation
        localStorage.removeItem("cart");

        // Refresh page
        location.reload();

    });

}
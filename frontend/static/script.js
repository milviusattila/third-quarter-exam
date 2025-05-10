const rootElement = document.getElementById("root");

// =================================
// ✅ create HTML elements
// =================================

const sendMessage = (message) => {
    
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
    
    return `
    <div id="send-message">
    <p>${message}</p>
    </div>
    `;
}

const createHeader = () => {
    return `
    <header>
    <button id="add-button">Add new Partner</button>
    </header>
    `;
};

const htmlElement = (data) => {
    return data.map((item) => {
        return `
        <div class="data-card">
        <h1 id="item-${item.id}">ID: ${item.id}</h1>
        <p class="data-name">Name: ${item.name}</p>
        <p class="data-age">Age: ${item.age}</p>
        <p class="data-pets">Pets: ${item.pets.join(", ")}</p>
        </div>
        `;
    }).join("");
};

const createAddNewPartnerModal = () => {
    return `
    <div class="add-modal">
    <div class="modal-content">
    <span class="close-button">&times;</span>
    <h2>Add New Partner</h2>
    <form id="add-partner-form">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" required>
    <label for="pets">Pets:</label>
    <input type="text" id="pets" name="pets" required>
    <button type="submit">Add</button>
    </form>
    </div>
    </div>
    `;
};

// =================================
// ✅ Event listeners
// =================================

const clickEvents = () => {
    const addButton = document.querySelector("#add-button");
    
    addButton.addEventListener("click", () => {
        if (document.querySelector(".modal")) return;
        
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = createAddNewPartnerModal();
        document.body.appendChild(modal);
        
        const closeButton = modal.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
            modal.remove();
        });
        
        const form = modal.querySelector("#add-partner-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const newPartner = {
                name: form.name.value,
                age: Number(form.age.value),
                pets: form.pets.value.split(",").map(pet => pet.trim())
            };
            
            try {
                fetch("/api/data/new", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newPartner)
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                    form.reset();
                    modal.remove();
                    fetchData();
                    rootElement.insertAdjacentHTML("beforeend", sendMessage("New partner added successfully!"));
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            } catch (error) {
                console.error("Error:", error);
            }
        });
    });
}

// ==================================
// ✅ fetching data and rendering DOM
// ==================================

async function fetchData() {
    rootElement.innerHTML = "";
    try {
        const response = await fetch("/api/data");
        const data = await response.json();

        rootElement.insertAdjacentHTML("beforeend", createHeader());
        rootElement.insertAdjacentHTML("beforeend", htmlElement(data));

        clickEvents();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// ==================================
// ✅ strart the app
// ==================================

fetchData();

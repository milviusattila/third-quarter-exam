const rootElement = document.getElementById("root");


//===================================
// helper functions
//===================================

const createPostMethod = (url, newPartner, form, modal) => {

    try {
        fetch(url, {
            method: "POST",
            headers: {                
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPartner)
        })
            .then(response => response.json())
            .then(data => {
                form.reset();
                modal.remove();
                fetchData();
                sendMessage("New partner added successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } catch (error) {
        console.error("Error:", error);
    }
};

const sendMessage = (message) => {
    const messageElement = document.createElement("div");
    messageElement.id = "send-message";
    messageElement.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 3000);

    return messageElement;
}

// =================================
// ✅ create HTML elements
// =================================


const createHeader = () => {
    return `
    <header>
    <button id="add-button">Add new Partner</button>
    </header>
    `;
};

const createCardHtmlComponent = (data) => {
    return data.map((item) => {
        return `
        <div class="data-card">
        <h2 class="data-name">${item.name}</h2>
        <p id="item-${item.id}">ID: ${item.id}</p>
        <p class="data-age">Age: ${item.age}</p>
        <p class="data-pets">Pets: ${item.pets.join(", ")}</p>
        </div>
        `;
    }).join("");
};

const createCardHtmlComponents = (data) => {
    return `
    <div id="main-content">
    ${createCardHtmlComponent(data)}
    </div>
    `;
}

const createAddNewPartnerModal = () => {
    return `
    <div id="modal">
        <div id="modal-content">
        <h2>Add New Partner</h2>
                <form id="add-partner-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" required>
                <label for="pets">Pets:</label>
                <input type="text" id="pets" name="pets" required>
                    <div id="handling-buttons">
                        <span class="close-button">&times;</span>
                        <button id="add-new-partner-button" type="submit">Add</button>
                    </div>
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
            createPostMethod("/api/data/new", newPartner, form, modal);
            modal.remove();
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
        rootElement.insertAdjacentHTML("beforeend", createCardHtmlComponents(data));

        clickEvents();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// ==================================
// ✅ strart the app
// ==================================

fetchData();

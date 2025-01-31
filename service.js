// Function to Toggle Chatbot Visibility
function toggleChat() {
    var chatBox = document.getElementById("chatbot");
    if (chatBox.style.display === "block") {
        chatBox.style.display = "none";
    } else {
        chatBox.style.display = "block";
    }
}

// Function to Send User Message
function sendMessage() {
    var inputField = document.getElementById("chat-input");
    var message = inputField.value.trim();
    if (message === "") return;

    var chatBody = document.getElementById("chat-body");

    // Display User Message
    var userMessage = document.createElement("p");
    userMessage.className = "user-msg";
    userMessage.innerText = message;
    chatBody.appendChild(userMessage);

    inputField.value = "";

    // Generate Bot Response
    setTimeout(() => {
        var botResponse = getBotResponse(message);
        var botMessage = document.createElement("p");
        botMessage.className = "bot-msg";
        botMessage.innerText = botResponse;
        chatBody.appendChild(botMessage);

        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

// Handle Enter Key Press in Input
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Function to Generate Simple Responses
function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! How can I help you today?";
    } else if (input.includes("book ticket")) {
        return "You can book tickets from the 'HOME' section.";
    } else if (input.includes("wheelchair")) {
        return "You can book a wheelchair under 'Service at Station'.";
    } else if (input.includes("stay rooms")) {
        return "Stay rooms can be booked for ₹1000 per 24 hours.";
    } else {
        return "I'm sorry, I don't understand. Please ask something else!";
    }
}

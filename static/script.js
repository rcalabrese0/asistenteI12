document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Función para mostrar un mensaje en el chat
    function addMessage(message, isUser = false) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add(isUser ? "user-message" : "chatbot-message");
    messageContainer.innerHTML = message; // Usa innerHTML en lugar de textContent
    chatBox.appendChild(messageContainer);
    scrollToBottom();
}

    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const message = userInput.value;
        if (message.trim() !== "") {
            addMessage(message, true); // Agregar el mensaje del usuario
            userInput.value = "";

            fetch("/get_response", {
                method: "POST",
                body: new URLSearchParams({ user_input: message }),
            })
            .then(response => response.json())
            .then(data => {
                const chatbotResponse = data.response;
                addMessage(chatbotResponse); // Agregar la respuesta del chatbot
            });
        }
    }

    // Mostrar el mensaje de bienvenida al cargar la página
    const bienvenidaMessage = "Para ver las opciones disponibles ingrese la palabra 'opciones'";
    addMessage(bienvenidaMessage);

    // Agregar eventos para enviar mensajes
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});

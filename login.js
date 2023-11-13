document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verifique o email e senha no localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Login bem-sucedido, configura a variável de sessão
        sessionStorage.setItem("loggedIn", true);
         // Adiciona uma entrada de histórico personalizada
        window.history.pushState({ page: "index" }, "Index", "index.html");

        // Redireciona para a página principal
        window.location.href = "index.html";
    } else {
        alert("Credenciais inválidas. Por favor, tente novamente.");
    }  
});

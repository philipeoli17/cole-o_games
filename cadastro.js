document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const apelido = document.getElementById("apelido").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Obtenha os usuários do localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verifique se o email já está em uso
    const isEmailTaken = users.some(u => u.email === email);

    if (isEmailTaken) {
        alert("Este email já está em uso. Por favor, escolha outro.");
    } else {
        // Adicione o novo usuário à lista de usuários
        users.push({ nome, apelido, email, password: senha });

        // Salve a lista atualizada de usuários no localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Redirecione para a página de login após o cadastro bem-sucedido
        window.location.href = "login.html";
    }
});
document.getElementById("backBtnlogin").addEventListener("click", function() {
    window.location.href = "login.html";
});

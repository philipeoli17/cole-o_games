document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const collectionName = document.getElementById("collectionName").value;

    // Obtém os dados da coleção do localStorage
    const collections = JSON.parse(localStorage.getItem("collections")) || {};

    // Verifica se a coleção buscada existe no localStorage
    if (collections[collectionName]) {
        const games = collections[collectionName];

        const gameListElement = document.getElementById("game-list");
        gameListElement.innerHTML = "";
        games.forEach(function(game, index) {
            const li = document.createElement("li");
            li.textContent = `Nome: ${game.gameName}, Plataforma: ${game.platform}, Gênero: ${game.genre}, Data de Lançamento: ${game.releaseDate}, Valor Pago: ${game.price}`;
            // Adiciona um botão "Editar" para cada jogo
            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.addEventListener("click", function() {
            // Redireciona para a página de edição com os dados do jogo
                const editedGame = JSON.stringify(game);
                localStorage.setItem("editedGame", editedGame);
                window.location.href = "editgame.html";
            });
            // Adiciona um botão "Remover" para cada jogo
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remover";
            removeButton.addEventListener("click", function() {
                // Remove o jogo da coleção
                games.splice(index, 1);
                // Atualiza os dados no localStorage
                localStorage.setItem("collections", JSON.stringify(collections));
                // Atualiza a lista de jogos
                renderGameList();
            });
            
            li.appendChild(editButton);
            li.appendChild(removeButton);
            gameListElement.appendChild(li);
        });

        // Exibe a quantidade de jogos na coleção
        const gameCount = games.length;
        document.getElementById("game-count").textContent = `Total de jogos na coleção: ${gameCount}`;
    } else {
        alert(`Coleção "${collectionName}" não encontrada.`);
    }
    window.history.pushState({ page: "index" }, "Index", "index.html");
});

function renderGameList() {
    const collectionName = document.getElementById("collectionName").value;
    const collections = JSON.parse(localStorage.getItem("collections")) || {};
    const games = collections[collectionName];

    const gameListElement = document.getElementById("game-list");
    gameListElement.innerHTML = "";
    games.forEach(function(game, index) {
        const li = document.createElement("li");
        li.textContent = `Nome: ${game.gameName}, Plataforma: ${game.platform}, Gênero: ${game.genre}, Data de Lançamento: ${game.releaseDate}, Valor Pago: ${game.price}`;
        
        // Adiciona um botão "Remover" para cada jogo
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", function() {
            // Remove o jogo da coleção
            games.splice(index, 1);
            // Atualiza os dados no localStorage
            localStorage.setItem("collections", JSON.stringify(collections));
            // Atualiza a lista de jogos
            renderGameList();
        });
        
        li.appendChild(removeButton);
        gameListElement.appendChild(li);
    });
}
document.getElementById("logoffBtn").addEventListener("click", function() {
    // Redireciona o usuário para a tela de login
    window.location.href = "login.html";
});

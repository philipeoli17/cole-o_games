document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const collectionName = document.getElementById("collectionName").value;

    // Obtém os dados da coleção do localStorage
    const collections = JSON.parse(localStorage.getItem("collections")) || {};

    // Verifica se a coleção buscada existe no localStorage
    if (collections[collectionName]) {
        const games = collections[collectionName];

        const table = document.createElement("table");
        table.classList.add("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>Nome do Jogo</th><th>Plataforma</th><th>Gênero</th><th>Data de Lançamento</th><th>Valor Pago</th><th>Ações</th>";
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        games.forEach(function(game, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${game.gameName}</td>
                <td>${game.platform}</td>
                <td>${game.genre}</td>
                <td>${game.releaseDate}</td>
                <td>${game.price}</td>
                <td>
                    <button class="btn btn-primary edit-btn" data-index="${index}">Editar</button>
                    <button class="btn btn-danger remove-btn" data-index="${index}">Remover</button>
                </td>
            `;

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // Substitui o conteúdo atual pelo novo conteúdo da tabela
        const gameListElement = document.getElementById("game-list");
        gameListElement.innerHTML = "";
        gameListElement.appendChild(table);

        document.querySelectorAll(".edit-btn").forEach(function(button) {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                const editedGame = games[index];
        
                // Preenche os campos do modal com os dados do jogo selecionado
                document.getElementById("editGameName").value = editedGame.gameName;
                document.getElementById("editPlatform").value = editedGame.platform;
                document.getElementById("editGenre").value = editedGame.genre;
                document.getElementById("editReleaseDate").value = editedGame.releaseDate;
                document.getElementById("editPrice").value = editedGame.price;
        
                // Abre o modal
                const modal = new bootstrap.Modal(document.getElementById('editModal'));
                modal.show();
        
                // Event listener para o formulário de edição
                document.getElementById("editForm").addEventListener("submit", function(event) {
                    event.preventDefault();
        
                    // Atualiza os dados do jogo com as informações dos campos do modal
                    editedGame.gameName = document.getElementById("editGameName").value;
                    editedGame.platform = document.getElementById("editPlatform").value;
                    editedGame.genre = document.getElementById("editGenre").value;
                    editedGame.releaseDate = document.getElementById("editReleaseDate").value;
                    editedGame.price = document.getElementById("editPrice").value;
        
                    // Atualiza os dados no localStorage
                    collections[collectionName] = games;
                    localStorage.setItem("collections", JSON.stringify(collections));
        
                    // Fecha o modal
                    modal.hide();
        
                    // Atualiza a lista de jogos
                    renderGameList();
                });
            });
        });

        document.querySelectorAll(".remove-btn").forEach(function(button) {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                // Remove o jogo da coleção
                games.splice(index, 1);
                // Atualiza os dados no localStorage
                collections[collectionName] = games;
                localStorage.setItem("collections", JSON.stringify(collections));
                // Atualiza a lista de jogos
                renderGameList();
            });
        });

        // Exibe a quantidade de jogos na coleção
        const gameCount = games.length;
        document.getElementById("game-count").textContent = `Total de jogos na coleção: ${gameCount}`;
    } else {
        alert(`Coleção "${collectionName}" não encontrada.`);
    }
    window.history.pushState({ page: "index" }, "Index", "index.html");
    document.getElementById("removeCollectionBtn").addEventListener("click", function() {
        const collectionName = document.getElementById("collectionName").value;
        const collections = JSON.parse(localStorage.getItem("collections")) || {};

        if (collections[collectionName]) {
            if (confirm(`Tem certeza de que deseja remover toda a coleção "${collectionName}"? Esta ação não pode ser desfeita.`)) {
                // Remove a coleção do localStorage
                delete collections[collectionName];
                localStorage.setItem("collections", JSON.stringify(collections));

                // Limpa a lista de jogos e atualiza a contagem
                document.getElementById("game-list").innerHTML = "<p>Nenhum jogo na coleção.</p>";
                document.getElementById("game-count").textContent = "Total de jogos na coleção: 0";
            }
        } else {
            alert(`Coleção "${collectionName}" não encontrada.`);
        }
    });
});

function renderGameList() {
    const collectionName = document.getElementById("collectionName").value;
    const collections = JSON.parse(localStorage.getItem("collections")) || {};
    const games = collections[collectionName];

    const gameListElement = document.getElementById("game-list");
    gameListElement.innerHTML = "";

    if (games && games.length > 0) {
        const table = document.createElement("table");
        table.classList.add("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>Nome do Jogo</th><th>Plataforma</th><th>Gênero</th><th>Data de Lançamento</th><th>Valor Pago</th><th>Ações</th>";
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        games.forEach(function(game, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${game.gameName}</td>
                <td>${game.platform}</td>
                <td>${game.genre}</td>
                <td>${game.releaseDate}</td>
                <td>${game.price}</td>
                <td>
                    <button class="btn btn-primary edit-btn" data-index="${index}">Editar</button>
                    <button class="btn btn-danger remove-btn" data-index="${index}">Remover</button>
                </td>
            `;

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        gameListElement.appendChild(table);

        document.querySelectorAll(".remove-btn").forEach(function(button) {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                // Remove o jogo da coleção
                games.splice(index, 1);
                // Atualiza os dados no localStorage
                collections[collectionName] = games;
                localStorage.setItem("collections", JSON.stringify(collections));
                // Atualiza a lista de jogos
                renderGameList();
            });
        });
    } else {
        gameListElement.innerHTML = "<p>Nenhum jogo na coleção.</p>";
    }

    // Exibe a quantidade de jogos na coleção
    const gameCount = games.length;
    document.getElementById("game-count").textContent = `Total de jogos na coleção: ${gameCount}`;
}
document.getElementById("logoffBtn").addEventListener("click", function() {
    // Redireciona o usuário para a tela de login
    window.location.href = "login.html";
});

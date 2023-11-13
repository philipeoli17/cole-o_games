document.addEventListener("DOMContentLoaded", function() {
    const editedGameJSON = localStorage.getItem("editedGame");

    if (editedGameJSON) {
        const editedGame = JSON.parse(editedGameJSON);
        const editGameForm = document.getElementById("edit-game-form");

        // Preenche os campos de edição com os dados do jogo
        editGameForm.innerHTML = `
            <label for="editGameName">Nome do Jogo:</label>
            <input type="text" id="editGameName" value="${editedGame.gameName}" required><br>
            <label for="editPlatform">Plataforma:</label>
            <input type="text" id="editPlatform" value="${editedGame.platform}" required><br>
            <label for="editGenre">Gênero:</label>
            <input type="text" id="editGenre" value="${editedGame.genre}" required><br>
            <label for="editReleaseDate">Data de Lançamento:</label>
            <input type="date" id="editReleaseDate" value="${editedGame.releaseDate}" required><br>
            <label for="editPrice">Valor Pago:</label>
            <input type="number" id="editPrice" value="${editedGame.price}" required><br>
        `;

        const saveBtn = document.getElementById("saveBtn");
        const cancelBtn = document.getElementById("cancelBtn");
        const logoffBtn = document.getElementById("logoffBtn");

        saveBtn.addEventListener("click", function() {
            // Obtém os valores editados
            const editedGameName = document.getElementById("editGameName").value;
            const editedPlatform = document.getElementById("editPlatform").value;
            const editedGenre = document.getElementById("editGenre").value;
            const editedReleaseDate = document.getElementById("editReleaseDate").value;
            const editedPrice = document.getElementById("editPrice").value;

            // Obtém as coleções do localStorage
            const collections = JSON.parse(localStorage.getItem("collections")) || {};

            // Encontra o índice do jogo na coleção
            const gameIndex = collections[editedGame.collectionName].findIndex(game => game.gameName === editedGame.gameName);

            // Cria um novo objeto com as alterações
            const updatedGame = {
                gameName: editedGameName,
                platform: editedPlatform,
                genre: editedGenre,
                releaseDate: editedReleaseDate,
                price: editedPrice
            };

            // Substitui o objeto antigo na coleção pelo objeto atualizado
            collections[editedGame.collectionName][gameIndex] = updatedGame;

            // Salva a coleção atualizada no localStorage
            localStorage.setItem("collections", JSON.stringify(collections));

            // Remove a chave "editedGame" do localStorage após a edição
            localStorage.removeItem("editedGame");

            // Exibe um alerta indicando que as alterações foram salvas com sucesso
            alert("Alterações salvas com sucesso!");

            // Redireciona para a página de consulta da coleção
            window.location.href = "consultcollection.html";
        });

        cancelBtn.addEventListener("click", function() {
            // Cancela a edição e retorna para a página de consulta da coleção
            localStorage.removeItem("editedGame");
            window.location.href = "consultcollection.html";
        });

        logoffBtn.addEventListener("click", function() {
            // Redireciona o usuário para a tela de login
            window.location.href = "login.html";
        });
    } else {
        // Se não houver dados para editar, redireciona de volta para a página de consulta da coleção
        window.location.href = "consultcollection.html";
    }
});

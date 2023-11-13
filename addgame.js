document.getElementById("game-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const collectionName = document.getElementById("collectionName").value;
    const gameName = document.getElementById("gameName").value;
    const platform = document.getElementById("platform").value;
    const genre = document.getElementById("genre").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const price = document.getElementById("price").value;

    // Obtém os dados da coleção do localStorage ou cria uma nova coleção vazia
    const collections = JSON.parse(localStorage.getItem("collections")) || {};

    // Verifica se a coleção já existe no localStorage, senão cria uma nova coleção vazia
    if (!collections[collectionName]) {
        collections[collectionName] = [];
    }

    // Verifica se o jogo já existe na coleção (comparando pelo nome)
    const isGameAlreadyAdded = collections[collectionName].some(game => game.gameName === gameName);

    if (isGameAlreadyAdded) {
        alert(`O jogo "${gameName}" já está na coleção.`);
    } else {
        // Adiciona as informações do jogo à coleção correspondente no localStorage
        const gameInfo = {
            gameName: gameName,
            platform: platform,
            genre: genre,
            releaseDate: releaseDate,
            price: price
        };

        collections[collectionName].push(gameInfo);

        // Salva as coleções atualizadas no localStorage
        localStorage.setItem("collections", JSON.stringify(collections));

        // Limpa os campos do formulário após um pequeno atraso
        setTimeout(() => {
            document.getElementById("game-form").reset();
        }, 100);

        alert(`Jogo "${gameName}" adicionado à coleção "${collectionName}" com sucesso!`);
    }
    window.history.pushState({ page: "index" }, "Index", "index.html");
});
document.getElementById("logoffBtn").addEventListener("click", function() {
    // Redireciona o usuário para a tela de login
    window.location.href = "login.html";
});

// Estrutura de músicas
const categories = {
    pop: [
        { id: 1, name: "Música 1", image: "imagens/VGFN8170.jpg", file: "musicas/pop/song1.mp3" },
        { id: 2, name: "Música 2", image: "imagens/VGFN8170.jpg", file: "musicas/pop/song2.mp3" }
    ],
    rock: [
        { id: 3, name: "Música 3", image: "imagens/VGFN8170.jpg", file: "musicas/rock/song3.mp3" },
        { id: 4, name: "Música 4", image: "imagens/VGFN8170.jpg", file: "musicas/rock/song4.mp3" }
    ]
};

// Variáveis globais
let currentCategory = "pop"; // Categoria inicial
let audio = new Audio();
let currentIndex = 0;

const songList = document.getElementById("songs");
const currentSong = document.getElementById("current-song");
const currentImage = document.getElementById("current-image");
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const searchInput = document.getElementById("search");
const categorySelector = document.getElementById("category-selector");

// Função para carregar músicas por categoria
function loadSongsByCategory() {
    songList.innerHTML = "";
    categories[currentCategory].forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${song.image}" alt="Capa da Música">
            <span>${song.name}</span>
            <button class="play-btn">▶️</button>
        `;
        li.querySelector(".play-btn").addEventListener("click", () => playSong(index));
        songList.appendChild(li);
    });
}

// Função para carregar todas as músicas (Biblioteca)
function loadAllSongs() {
    songList.innerHTML = "";
    Object.values(categories).forEach(category => {
        category.forEach((song, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${song.image}" alt="Capa da Música">
                <span>${song.name}</span>
                <button class="play-btn">▶️</button>
            `;
            li.querySelector(".play-btn").addEventListener("click", () => playSong(index));
            songList.appendChild(li);
        });
    });
}

// Função para reproduzir a música
function playSong(index) {
    const allSongs = Object.values(categories).flat();
    currentIndex = index;
    audio.src = allSongs[currentIndex].file;
    currentSong.textContent = allSongs[currentIndex].name;
    currentImage.src = allSongs[currentIndex].image;
    audio.play();
    playPauseButton.textContent = "⏸️";
}

// Função de reprodução/pausa
playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseButton.textContent = "⏯️";
    }
});

// Funções para música anterior/próxima
prevButton.addEventListener("click", () => playSong((currentIndex - 1 + categories[currentCategory].length) % categories[currentCategory].length));
nextButton.addEventListener("click", () => playSong((currentIndex + 1) % categories[currentCategory].length));

// Função de pesquisa
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    songList.innerHTML = "";
    const allSongs = Object.values(categories).flat();
    allSongs
        .filter(song => song.name.toLowerCase().includes(query))
        .forEach((song, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<img src="${song.image}" alt="Capa"><span>${song.name}</span>`;
            li.addEventListener("click", () => playSong(index));
            songList.appendChild(li);
        });
});

// Verificar qual página estamos e carregar as músicas adequadas
if (document.body.contains(categorySelector)) {
    categorySelector.addEventListener("change", (event) => {
        currentCategory = event.target.value;
        loadSongsByCategory();
    });
    loadSongsByCategory(); // Carregar a categoria inicial
} else {
    loadAllSongs(); // Carregar todas as músicas na Biblioteca
}

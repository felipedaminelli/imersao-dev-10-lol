let allChampions = [];
let currentAudio = null;
let selectedRotas = [];

const cardContainer = document.querySelector('.card-container');
const inputBusca = document.getElementById('input-busca');
const modal = document.getElementById('champion-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const audioContainer = document.getElementById('audio-container');
const filtrosRotaIcones = document.querySelectorAll('.filtro-rota');


async function carregarCampeoes() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allChampions = await response.json();
        renderizarCampeoes(allChampions);
    } catch (error) {
        console.error("Erro ao carregar os campeões:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados dos campeões. Tente novamente mais tarde.</p>";
    }
}

function renderizarCampeoes(campeoes) {
    cardContainer.innerHTML = '';
    if (campeoes.length === 0) {
        cardContainer.innerHTML = '<p class="not-found">Nenhum campeão encontrado.</p>';
        return;
    }

    campeoes.forEach(campeao => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="${campeao.imagem}" alt="Imagem do ${campeao.nome}" class="card-image">
            <div class="card-content">
                <h2>${campeao.nome}</h2>
                <p>${campeao.ano}</p>
            </div>
        `;
        card.addEventListener('click', () => abrirModal(campeao));
        cardContainer.appendChild(card);
    });
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();
    const campeoesFiltrados = allChampions.filter(campeao =>
        campeao.nome.toLowerCase().includes(termoBusca)
    );
    renderizarCampeoes(campeoesFiltrados);
    // Limpa a seleção de rotas ao fazer uma busca
    selectedRotas = [];
    filtrosRotaIcones.forEach(icon => icon.classList.remove('active'));
}

function filtrarPorRotas() {
    // Se nenhuma rota estiver selecionada, mostra todos os campeões
    if (selectedRotas.length === 0) {
        renderizarCampeoes(allChampions);
        return;
    }

    // Filtra campeões cuja lista de rotas (`campeao.rota`) contenha
    // pelo menos uma das rotas selecionadas (`selectedRotas`).
    const campeoesFiltrados = allChampions.filter(campeao =>
        campeao.rota.some(r => selectedRotas.includes(r))
    );

    renderizarCampeoes(campeoesFiltrados);
    // Limpa o campo de busca para evitar confusão
    inputBusca.value = '';
}

function abrirModal(campeao) {
    modalBody.innerHTML = `
        <img src="${campeao.imagem}" alt="${campeao.nome}" class="modal-image">
        <div class="modal-info">
            <h2>${campeao.nome}</h2>
            <p><strong>Ano de Lançamento:</strong> ${campeao.ano}</p>
            <p><strong>Origem:</strong> ${campeao.origem}</p>
            <p><strong>Rotas:</strong> ${campeao.rota.map(r => r === 'Support' ? 'Sup' : r).join(', ')}</p>
            <p><strong>Habilidade (R):</strong> ${campeao.habilidades}</p>
            <p class="historia">${campeao.historia}</p>
            <a href="${campeao.link}" target="_blank">Saiba mais sobre ${campeao.nome}</a>
        </div>
    `;
    modal.style.display = 'flex';

    tocarAudioSelecao(campeao.audioSelecao);
}

function fecharModal() {
    modal.style.display = 'none';
    pararAudio();
}

function tocarAudioSelecao(audioSrc) {
    pararAudio();
    if (audioSrc) {
        currentAudio = new Audio(audioSrc);
        currentAudio.play().catch(e => console.error("Erro ao tocar áudio:", e));
    }
}

function pararAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', carregarCampeoes);

inputBusca.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});

modalClose.addEventListener('click', fecharModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

filtrosRotaIcones.forEach(icon => {
    icon.addEventListener('click', () => {
        const rota = icon.dataset.rota;
        icon.classList.toggle('active');

        // Adiciona ou remove a rota da lista de rotas selecionadas
        if (selectedRotas.includes(rota)) {
            selectedRotas = selectedRotas.filter(r => r !== rota);
        } else {
            selectedRotas.push(rota);
        }

        // Aplica o filtro com base na lista atualizada
        filtrarPorRotas();
    });
});
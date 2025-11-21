# Base de Conhecimento - Campeões de League of Legends

Uma aplicação web interativa que serve como uma enciclopédia para os campeões do universo de League of Legends. A página permite que os usuários visualizem, pesquisem e filtrem campeões com base em suas rotas (lanes), além de ver detalhes específicos de cada um em um modal interativo.

## ✨ Funcionalidades

- **Visualização de Campeões**: Exibe todos os campeões em um layout de cards responsivo.
- **Busca por Nome**: Um campo de busca permite encontrar campeões específicos digitando seus nomes.
- **Filtro por Rotas (Multi-seleção)**: Ícones representando as rotas (Top, Jungle, Mid, ADC, Support) que funcionam como filtros. É possível selecionar múltiplas rotas para refinar a busca.
- **Modal de Detalhes**: Ao clicar em um card, um modal é exibido com informações detalhadas do campeão, incluindo:
  - Imagem de carregamento (loading screen).
  - Nome, ano de lançamento e origem.
  - Rotas em que atua.
  - História e link para a página oficial.
  - **Áudio de Seleção**: A fala de seleção do campeão é reproduzida automaticamente ao abrir o modal.
- **Interface Fixa (Sticky)**: O cabeçalho e a barra de filtros permanecem fixos no topo da página durante a rolagem, garantindo fácil acesso aos controles.
- **Design Responsivo**: A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página.
- **CSS3**: Estilização completa, incluindo layout com Flexbox, design responsivo com Media Queries e variáveis CSS para um tema coeso.
- **JavaScript (ES6+)**: Manipulação do DOM, interatividade, lógica de busca, filtros e consumo de dados locais via `fetch` API.
- **JSON**: Arquivo local (`data.json`) utilizado como banco de dados para armazenar as informações dos campeões.

## 📂 Estrutura do Projeto

```
./
├── 📄 data.json         # Banco de dados com os campeões
├── 📄 index.html        # Estrutura principal da página
├── 📄 script.js         # Lógica e interatividade
├── 📄 style.css         # Estilização
└── 📄 README.md         # Este arquivo
```

- **`index.html`**: Contém a estrutura base da aplicação, incluindo o cabeçalho, a barra de filtros, a área para os cards e a estrutura do modal.
- **`style.css`**: Responsável por toda a aparência visual. Utiliza variáveis CSS (`:root`) para a paleta de cores, facilitando a manutenção do tema.
- **`script.js`**: O cérebro da aplicação. Controla o carregamento dos dados, a renderização dos campeões, a lógica de busca e filtragem, e a interatividade do modal.
- **`data.json`**: Um array de objetos, onde cada objeto representa um campeão e contém todas as suas informações (nome, imagem, rotas, etc.).

## ⚙️ Como Funciona (Explicação do Código)

### JavaScript (`script.js`)

O script é organizado em torno de funções e event listeners para modularizar o comportamento da página.

1.  **Carregamento de Dados (`carregarCampeoes`)**:
    - Utiliza `async/await` com a `fetch` API para carregar de forma assíncrona os dados do arquivo `data.json`.
    - Após o carregamento, armazena os dados em uma variável global `allChampions` e chama a função `renderizarCampeoes` pela primeira vez.

2.  **Renderização dos Cards (`renderizarCampeoes`)**:
    - Limpa o container de cards para evitar duplicatas.
    - Itera sobre a lista de campeões recebida e cria dinamicamente um elemento `<article class="card">` para cada um.
    - O conteúdo de cada card (imagem, nome, ano) é preenchido com os dados do campeão.
    - Adiciona um `event listener` de clique a cada card para chamar a função `abrirModal`.

3.  **Busca e Filtros**:
    - **Busca por Nome (`iniciarBusca`)**: É acionada pelo botão "Buscar" ou pela tecla "Enter". Filtra o array `allChampions` com base no texto digitado no campo de busca e renderiza o resultado. Também limpa os filtros de rota ativos.
    - **Filtro por Rotas (`filtrarPorRotas`)**:
        - Um array `selectedRotas` armazena as rotas selecionadas pelo usuário.
        - Ao clicar em um ícone de rota, a classe `.active` é alternada (toggle). A rota correspondente é adicionada ou removida do array `selectedRotas`.
        - A função então filtra o array `allChampions` usando `Array.prototype.some()`. Ela retorna campeões que possuam **pelo menos uma** das rotas presentes no array `selectedRotas`.
        - Se `selectedRotas` estiver vazio, todos os campeões são exibidos.

4.  **Modal Interativo**:
    - **`abrirModal(campeao)`**:
        - Preenche dinamicamente o corpo do modal com os dados detalhados do campeão selecionado.
        - A lista de rotas é formatada para exibir "Sup" em vez de "Support".
        - Altera o `display` do modal para `flex` para torná-lo visível.
        - Chama a função `tocarAudioSelecao` para reproduzir a fala do campeão.
    - **`fecharModal()`**: Esconde o modal e chama `pararAudio()` para interromper qualquer áudio em reprodução.

5.  **Controle de Áudio**:
    - **`tocarAudioSelecao(audioSrc)`**: Para qualquer áudio que esteja tocando, cria uma nova instância de `Audio` com a URL recebida e a reproduz.
    - **`pararAudio()`**: Pausa o áudio atual, reinicia seu tempo e limpa a variável de controle. Isso garante que apenas um áudio toque por vez e que ele pare ao fechar o modal.

### CSS (`style.css`)

- **Tema**: A paleta de cores inspirada no cliente do League of Legends é definida em `:root` para fácil reutilização e consistência.
- **Layout Fixo (`position: sticky`)**: As classes `header` e `.filter-bar` usam `position: sticky` com um valor `top` calculado para que fiquem fixas no topo da tela durante a rolagem, uma abaixo da outra.
- **Estilo dos Filtros**:
    - Ícones não selecionados (`.filtro-rota`) têm `opacity` e `filter: grayscale()` reduzidos para parecerem "apagados".
    - Ao passar o mouse (`:hover`) ou quando selecionados (`.active`), a opacidade e a cor são restauradas, e um leve `transform: scale()` é aplicado para dar feedback visual.
- **Responsividade (`@media`)**: Media queries são usadas para ajustar o layout em telas menores (abaixo de 768px). O cabeçalho muda para um layout de coluna, e o modal também se ajusta para exibir a imagem acima das informações, melhorando a legibilidade.

## 🚀 Como Executar Localmente

Como este é um projeto front-end puro sem dependências complexas, executá-lo é muito simples.

1.  **Clone ou baixe** este repositório para sua máquina local.
2.  **Navegue** até a pasta do projeto.
3.  **Abra o arquivo `index.html`** em qualquer navegador de internet moderno (Google Chrome, Firefox, Edge, etc.).

E pronto! A aplicação estará funcionando.

---
*Este projeto foi desenvolvido como uma base de conhecimento e pode ser expandido com novas funcionalidades.*

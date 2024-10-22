// Array para armazenar as frases carregadas
let frases = [];

// Carregar o arquivo CSV ao selecionar
document.getElementById('csvFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = e.target.result;
            const linhas = data.split('\n');

            // Limpa o array de frases atuais
            frases = [];

            // Itera sobre as linhas do CSV
            linhas.forEach((linha, index) => {
                if (index === 0) return; // Ignora o cabeçalho

                const colunas = linha.split(',');

                if (colunas.length >= 7) { // Verifica se há pelo menos 7 colunas
                    frases.push({
                        portugues: colunas[0].trim(),
                        ingles: colunas[1].trim(),
                        italiano: colunas[2].trim(),
                        espanhol: colunas[3].trim(),
                        alemao: colunas[4].trim(),
                        frances: colunas[5].trim(),
                        mandarim: colunas[6].trim()
                    });
                }
            });

            // Preencher o dropdown com as frases carregadas
            preencherDropdown();
        };

        // Lê o arquivo como texto
        reader.readAsText(file);
    } else {
        alert('Nenhum arquivo selecionado!');
    }
});

// Preencher o dropdown com as frases carregadas
function preencherDropdown() {
    const dropdown = document.getElementById('frase-dropdown');
    dropdown.innerHTML = '<option value="">-- Selecione --</option>';

    frases.forEach((frase, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = frase.portugues;
        dropdown.appendChild(option);
    });
}

// Exibir a frase selecionada
function mostrarFraseSelecionada() {
    const index = document.getElementById('frase-dropdown').value;
    if (index !== '') {
        const frase = frases[index];

        document.getElementById('frase-portugues').textContent = frase.portugues;
        document.getElementById('frase-ingles').textContent = frase.ingles;
        document.getElementById('frase-italiano').textContent = frase.italiano;
        document.getElementById('frase-espanhol').textContent = frase.espanhol;
        document.getElementById('frase-alemao').textContent = frase.alemao;
        document.getElementById('frase-frances').textContent = frase.frances;
        document.getElementById('frase-mandarim').textContent = frase.mandarim;
    }
}

// Função para ajustar a velocidade do áudio
function alterarVelocidade() {
    const velocidade = document.getElementById('velocidade').value;
    document.getElementById('velocidade-valor').textContent = `${velocidade}x`;
}

// Função para tocar o áudio (a ser ajustada com o mecanismo de TTS)
function playAudio(idioma) {
    const index = document.getElementById('frase-dropdown').value;
    if (index !== '') {
        const frase = frases[index];
        const texto = frase[idioma];

        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = getIdiomaLang(idioma);
        utterance.rate = parseFloat(document.getElementById('velocidade').value);
        window.speechSynthesis.speak(utterance);
    }
}

// Função para obter o código de idioma do TTS
function getIdiomaLang(idioma) {
    switch (idioma) {
        case 'ingles': return 'en-US';
        case 'italiano': return 'it-IT';
        case 'espanhol': return 'es-ES';
        case 'alemao': return 'de-DE';
        case 'frances': return 'fr-FR';
        case 'mandarim': return 'zh-CN';
        default: return 'pt-BR'; // Português como padrão
    }
}

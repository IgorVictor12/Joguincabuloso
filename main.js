const MAX_TENTATIVAS = 5; // Número máximo de tentativas
let secret_number = Math.floor((Math.random() * 10) + 1);
let tentativas = 0;  // Variável para contar o número de tentativas

// Função para gerar um novo número secreto
function getSecretNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

// Função para exibir texto em uma tag e falar o texto
function exibeTextoTag(tag, texto) {
    let varTag = document.querySelector(tag);
    if (varTag) {
        varTag.innerHTML = texto;

        // Verifica se o responsiveVoice está disponível e fala o texto
        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.speak(texto, "Brazilian Portuguese Female", { pitch: 0 });
        } else {
            console.warn('ResponsiveVoice não está disponível.');
        }
    } else {
        console.error('Tag não encontrada: ' + tag);
    }
}

// Configura os textos iniciais
exibeTextoTag('h1', 'Qual seu número da sorte secreto?');
exibeTextoTag('p', 'Tente sua sorte, entre 1 e 10 faça sua escolha');

// Função para verificar o chute
function verificarChute() {
    let guess = document.querySelector('input').value;
    tentativas++;  // Incrementar o número de tentativas a cada chute

    if (tentativas >= MAX_TENTATIVAS) {
        // Se exceder o número máximo de tentativas
        document.getElementById('conteudo-jogo').style.display = 'none';
        document.getElementById('faustao-erro').style.display = 'block';

        let mensagem = `Você excedeu o número máximo de tentativas (${MAX_TENTATIVAS}). Tente novamente.`;
        document.getElementById('texto-erro').innerText = mensagem;
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
        return; // Para a execução da função
    }

    if (guess == secret_number) {
        if (tentativas === 1) {
            // Se acertou na primeira tentativa, mostrar uma mensagem de sucesso
            document.getElementById('conteudo-jogo').style.display = 'none';
            document.getElementById('download-certo').style.display = 'block';

            let mensagem = `Você acertou na primeira tentativa! Parabéns!`;
            document.getElementById('mensagem-certo').innerText = mensagem;
        } else {
            // Se não for na primeira tentativa, mostrar uma mensagem de sucesso
            document.getElementById('conteudo-jogo').style.display = 'none';
            document.getElementById('faustao-erro').style.display = 'block';

            let mensagem = `Você acertou em ${tentativas} tentativas!`;
            document.getElementById('texto-erro').innerText = mensagem;
        }
    } else {
        if (guess < secret_number) {
            exibeTextoTag('p', 'Infelizmente você ainda não acertou. O número é maior');
        } else {
            exibeTextoTag('p', 'Infelizmente o número é menor, tente de novo');
        }
    }
    limpaInput();
}

// Função para limpar o campo de input
function limpaInput() {
    document.querySelector('input').value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tentativas = 0;  // Reinicia o contador de tentativas
    secret_number = getSecretNumber();  // Gera um novo número secreto
    exibeTextoTag('h1', 'Qual seu número da sorte secreto?');
    exibeTextoTag('p', 'Diga o número que você acha que é o correto');
    document.getElementById('reiniciar').setAttribute('disabled', true);  // Desabilita o botão de reiniciar
    limpaInput();

    // Restaurar o conteúdo do jogo e esconder as mensagens de sucesso e erro
    document.getElementById('conteudo-jogo').style.display = 'block';
    document.getElementById('faustao-erro').style.display = 'none';
    document.getElementById('download-certo').style.display = 'none';
}

// Adicionar manipulador de eventos para pressionar Enter
document.querySelector('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão do Enter (como enviar um formulário)
        if (document.getElementById('faustao-erro').style.display === 'none' && document.getElementById('download-certo').style.display === 'none') {
            verificarChute(); // Se o jogo está ativo, chama a função de verificação do chute
        } else {
            reiniciarJogo(); // Se o jogo terminou e está mostrando a mensagem de erro ou sucesso, chama a função de reiniciar
        }
    }
});

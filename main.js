// -----------------------------------------------------
// 1. Pegar elementos do HTML
// -----------------------------------------------------

// Aqui usamos "document.getElementById()" para pegar um elemento do HTML pelo seu id.
// No caso, pegamos o formulário para podermos "escutá-lo" e manipular quando o usuário enviar.
const form = document.getElementById('form-atividade');
// ✅ Conceito: DOM (Document Object Model) é a representação da página HTML em árvore que o JS consegue manipular.

// Inputs de nome e nota
// Guardamos referências aos campos de input para poder ler o que o usuário digitou.
const inputNomeAtividade = document.getElementById('nome-atividade');
const inputNotaAtividade = document.getElementById('nota-atividade');
// ✅ Conceito: 'input.value' retorna sempre uma string, mesmo que seja um número.

// Elementos onde a média final e o status aparecerão
// Usamos IDs no HTML para identificar onde queremos mostrar resultados.
const spanMediaValor = document.getElementById('media-final-valor');
const spanMediaResultado = document.getElementById('media-final-resultado');
// ✅ Conceito: podemos alterar o conteúdo de um elemento usando '.innerHTML' ou '.textContent'.

// Tabela (tbody) onde as linhas serão adicionadas
// Aqui pegamos o <tbody> para depois adicionar dinamicamente cada linha de atividades.
const corpoTabela = document.querySelector('tbody');
// ✅ Conceito: querySelector() é mais flexível, permite pegar por tag, classe, id ou seletor CSS.

// Variáveis para armazenar atividades e notas
// Arrays (listas) para guardar os dados digitados pelo usuário.
const atividades = [];
const notas = [];
// ✅ Conceito: array é uma estrutura de dados que permite armazenar múltiplos valores em sequência.

// Imagens e spans para aprovação/reprovação
// Armazenamos HTML como string para poder usar depois na tabela ou resultado final.
const imgAprovado = '<img src="./media/images/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado = '<img src="./media/images/reprovado.png" alt="Emoji decepcionado"/>';
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
// ✅ Conceito: innerHTML interpreta a string como HTML, permitindo inserir imagens e spans dinamicamente.

// Nota mínima para aprovação (pode ser alterada pelo usuário)
// prompt() exibe uma janela para o usuário digitar algo.
// parseFloat() converte a string digitada em número decimal.
const notaMinima = parseFloat(prompt("Digite a nota mínima para aprovação:"));
// ✅ Conceito: sempre que usamos prompt(), devemos validar e converter para o tipo correto, pois retorna string.


// -----------------------------------------------------
// 2. Ouvir o envio do formulário
// -----------------------------------------------------

// addEventListener() permite "escutar" eventos de um elemento.
// No caso, 'submit' é o evento quando o usuário clica no botão de enviar ou aperta Enter.
form.addEventListener('submit', function(e) {

    // e.preventDefault() impede que o comportamento padrão do formulário aconteça.
    // Por padrão, enviar um form recarrega a página. Queremos evitar isso.
    e.preventDefault();

    // Chamamos a função que adiciona a atividade e nota nos arrays
    adicionaLinha();

    // Chamamos a função que atualiza a tabela com todas as linhas
    atualizaTabela();

    // Chamamos a função que calcula a média e atualiza o resultado final
    atualizaMediaFinal();
});
// ✅ Conceito: funções de callback podem ser passadas como argumento. Aqui usamos function(e){} como callback do evento.


// -----------------------------------------------------
// 3. Função para adicionar uma linha de atividade
// -----------------------------------------------------
function adicionaLinha() {

    // Pega os valores digitados
    const nome = inputNomeAtividade.value;
    const nota = parseFloat(inputNotaAtividade.value.replace(',', '.')); 
    // ✅ Conceito: replace() troca vírgula por ponto para garantir número decimal.
    // ✅ parseFloat converte string para número. JS precisa disso para calcular média.

    // Verifica se a atividade já existe no array
    if (atividades.includes(nome)) {
        alert(`A atividade "${nome}" já foi inserida`);
        return; // interrompe a função, não adiciona linha duplicada
    }
    // ✅ Conceito: includes() verifica se um valor já existe no array (true/false).

    // Adiciona nos arrays
    atividades.push(nome); // adiciona no final do array
    notas.push(nota);

    // Monta a linha da tabela como HTML
    let linha = '<tr>'; // <tr> é linha da tabela
    linha += `<td>${nome}</td>`; // coluna do nome
    linha += `<td>${nota}</td>`; // coluna da nota
    // Operador ternário: condição ? valor_se_verdadeiro : valor_se_falso
    linha += `<td>${nota >= notaMinima ? imgAprovado : imgReprovado}</td>`; // coluna do status
    linha += '</tr>';

    // Adiciona a linha ao tbody da tabela
    // Aqui usamos '+=' para ir adicionando cada linha sem apagar as anteriores
    corpoTabela.innerHTML += linha;

    // Limpa os inputs para próxima entrada
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
    // ✅ Conceito: limpar inputs melhora a experiência do usuário
}


// -----------------------------------------------------
// 4. Função para atualizar a tabela
// -----------------------------------------------------
// Essa função não é obrigatória se usamos innerHTML direto em adicionaLinha,
// mas serve se quisermos reconstruir toda a tabela a partir dos arrays.
function atualizaTabela() {
    let linhas = '';
    for (let i = 0; i < atividades.length; i++) {
        linhas += '<tr>';
        linhas += `<td>${atividades[i]}</td>`;
        linhas += `<td>${notas[i]}</td>`;
        linhas += `<td>${notas[i] >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linhas += '</tr>';
    }
    corpoTabela.innerHTML = linhas;
    // ✅ Conceito: for loop percorre cada índice do array (i = 0; i < tamanho; i++)
}


// -----------------------------------------------------
// 5. Função para calcular a média final
// -----------------------------------------------------
function calculaMediaFinal() {
    let soma = 0; // variável que vai acumular a soma das notas

    // loop por todas as notas e soma
    for (let i = 0; i < notas.length; i++) {
        soma += notas[i]; // soma = soma + notas[i]
    }

    // divide pelo número de notas para calcular a média
    return soma / notas.length;
    // ✅ Conceito: operador de divisão '/' retorna o resultado decimal
    // ✅ Se notas.length for 0, retorna NaN → cuidado, poderia validar
}


// -----------------------------------------------------
// 6. Função para atualizar a média e mostrar status
// -----------------------------------------------------
function atualizaMediaFinal() {
    const media = calculaMediaFinal(); // pega a média calculada

    // Mostra o valor da média com 2 casas decimais
    spanMediaValor.innerHTML = media.toFixed(2);
    // ✅ toFixed(2) transforma número em string com 2 casas decimais

    // Mostra aprovado ou reprovado com base na nota mínima
    spanMediaResultado.innerHTML = media >= notaMinima ? spanAprovado : spanReprovado;
    // ✅ Operador ternário aqui decide qual HTML mostrar
}


/*

Aula Completa: Calculadora de Médias com JavaScript
Objetivo do Projeto

Criar uma página web que permita ao usuário:

Inserir o nome de uma atividade e sua nota.

Adicionar essas informações a uma tabela.

Mostrar se a atividade está aprovada ou reprovada, com imagens.

Calcular e mostrar a média final das notas.

Indicar se o aluno está aprovado ou reprovado de acordo com uma nota mínima.

Este projeto ensina conceitos fundamentais do JavaScript moderno: DOM, eventos, arrays, funções, operadores e manipulação dinâmica da página.

1. Pegando elementos do HTML (DOM)
const form = document.getElementById('form-atividade');
const inputNomeAtividade = document.getElementById('nome-atividade');
const inputNotaAtividade = document.getElementById('nota-atividade');
const spanMediaValor = document.getElementById('media-final-valor');
const spanMediaResultado = document.getElementById('media-final-resultado');
const corpoTabela = document.querySelector('tbody');

Explicação detalhada:

document.getElementById('id'): busca um elemento HTML pelo seu id.

Ex.: inputNomeAtividade vai ser usado para ler o valor digitado pelo usuário.

document.querySelector('seletor'): busca qualquer elemento usando CSS.

Ex.: tbody → para adicionar dinamicamente linhas de tabela.

Por que fazemos isso no começo?

Porque precisamos referências para manipular o HTML antes de escutar eventos ou adicionar conteúdo.

Conceitos importantes:

DOM (Document Object Model): é a “representação da página” que o JS consegue acessar e modificar.

Variáveis: usamos const para elementos que não mudam a referência, let se vamos reatribuir.

2. Variáveis de controle e arrays
const atividades = [];
const notas = [];
const imgAprovado = '<img src="./media/images/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado = '<img src="./media/images/reprovado.png" alt="Emoji decepcionado"/>';
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima para aprovação:"));

Explicação detalhada:

Arrays (atividades e notas)

Guardam informações do usuário para cálculos futuros.

push() → adiciona elementos ao final do array.

includes() → verifica se já existe um elemento.

HTML como string

Guardamos imagens e spans para fácil reutilização.

Nota mínima

prompt() pergunta ao usuário.

parseFloat() converte string em número decimal.

Conceitos importantes:

Tipo de dado: números, strings, arrays, booleanos.

Conversão de tipos: importante para cálculos (parseFloat).

Boas práticas: guardar strings HTML em variáveis facilita manutenção.

3. Eventos: submit do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

Explicação:

addEventListener

Permite reagir a ações do usuário.

Aqui, escutamos o evento 'submit'.

e.preventDefault()

Evita que o formulário recarregue a página.

Chamada das funções

adicionaLinha() → adiciona dados aos arrays e monta a linha HTML.

atualizaTabela() → atualiza a tabela na página.

atualizaMediaFinal() → calcula e exibe a média final.

Conceitos importantes:

Callback: função passada como argumento (function(e) {...}).

Ordem importa

Primeiro adicionamos dados (adicionaLinha()), depois atualizamos a tabela e a média.

Escopo

Variáveis declaradas com const ou let dentro da função têm escopo local.

Arrays declarados fora são globais, acessíveis por todas as funções.

4. Função adicionaLinha()
function adicionaLinha() {
    const nome = inputNomeAtividade.value;
    const nota = parseFloat(inputNotaAtividade.value.replace(',', '.'));

    if (atividades.includes(nome)) {
        alert(`A atividade "${nome}" já foi inserida`);
        return;
    }

    atividades.push(nome);
    notas.push(nota);

    let linha = '<tr>';
    linha += `<td>${nome}</td>`;
    linha += `<td>${nota}</td>`;
    linha += `<td>${nota >= notaMinima ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    corpoTabela.innerHTML += linha;

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

Explicação passo a passo:

Pegar valores dos inputs

.value retorna string, por isso convertemos para número.

Evitar duplicatas

includes() verifica se o nome já existe.

return interrompe a função.

Adicionar aos arrays

Mantemos os dados para cálculo da média.

Montar linha HTML

<tr> = linha da tabela.

<td> = célula.

Operador ternário condição ? valorSeVerdadeiro : valorSeFalso

Adicionar ao DOM

corpoTabela.innerHTML += linha adiciona linha sem apagar anteriores.

Limpar inputs

Melhora UX.

Conceitos importantes:

Escopo de variáveis

nome e nota são locais à função.

Operador ternário

Abrevia if/else.

String template literals

`texto ${variavel}` permite inserir valores em strings.

5. Função atualizaTabela()
function atualizaTabela() {
    let linhas = '';
    for (let i = 0; i < atividades.length; i++) {
        linhas += '<tr>';
        linhas += `<td>${atividades[i]}</td>`;
        linhas += `<td>${notas[i]}</td>`;
        linhas += `<td>${notas[i] >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linhas += '</tr>';
    }
    corpoTabela.innerHTML = linhas;
}


Propósito: reconstruir a tabela inteira a partir dos arrays.

Loop for

Percorre cada índice do array.

i = 0 → começa do primeiro elemento.

i < atividades.length → termina no último.

Vantagem sobre +=

Evita duplicação ou inconsistência.

Escopo

linhas é local, usada apenas para reconstruir a tabela.

6. Função calculaMediaFinal()
function calculaMediaFinal() {
    let soma = 0;
    for (let i = 0; i < notas.length; i++) {
        soma += notas[i];
    }
    return soma / notas.length;
}


Propósito: calcular a média de todas as notas.

Acumulador

soma += notas[i] → adiciona cada nota à soma total.

Divisão

soma / notas.length → obtém média.

Importante

Se não houver notas, notas.length = 0 → resultado será NaN. Poderíamos validar com if(notas.length === 0) return 0;.

7. Função atualizaMediaFinal()
function atualizaMediaFinal() {
    const media = calculaMediaFinal();
    spanMediaValor.innerHTML = media.toFixed(2);
    spanMediaResultado.innerHTML = media >= notaMinima ? spanAprovado : spanReprovado;
}


Calcula média chamando calculaMediaFinal().

Mostra na tela

innerHTML atualiza conteúdo do elemento.

.toFixed(2) mostra 2 casas decimais.

Determina aprovação

Operador ternário decide qual HTML exibir.

8. Conceitos de JavaScript importantes nesse projeto

Escopo

Variáveis declaradas dentro da função (let, const) só existem lá.

Arrays declarados fora são globais e acessíveis por todas as funções.

Funções

Blocos de código reutilizáveis.

Chamadas no momento certo (submit).

Arrays

Guardam dados.

push(), includes(), .length.

Eventos

addEventListener → permite interatividade.

DOM

getElementById, querySelector, innerHTML.

Operador ternário

Forma curta de if/else.

Template literals

Inserção de variáveis dentro de strings HTML.

Conversão de tipos

parseFloat() → necessário para cálculos.

Boa prática

Limpar inputs após uso.

Validar duplicatas.

Separar funções: adicionar, atualizar tabela, calcular média, atualizar média.

9. Por que essa ordem é importante

Declarar referências do DOM primeiro → necessário para manipular a página.

Declarar arrays e variáveis globais → para guardar dados.

Declarar funções utilitárias → organizadas por responsabilidade.

Escutar evento do form por último → só depois de ter tudo definido.

Dentro do evento, a ordem importa:

Adicionar dados → Atualizar tabela → Atualizar média.

Se mudar a ordem, podemos tentar atualizar a tabela antes de ter os dados, causando erro ou tabela vazia.

10. Conceitos extras que um aluno deve aprender

Boas práticas

Separar funções por responsabilidade.

Evitar innerHTML += repetidamente (pode causar problemas em projetos maiores).

Criar elementos dinamicamente com document.createElement é mais seguro.

Validação de entradas

Evitar notas negativas ou acima de 10.

Evitar strings vazias.

Escopo e closures

Entender que funções podem acessar variáveis externas (arrays globais) mas variáveis internas não vazam.



*/
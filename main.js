const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./media/images/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado = '<img src="./media/images/reprovado.png" alt="Emoji decepcionado"/>';

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    linhas += linha;

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';

    });






    /*Explicação “de leigo”

O que esse código faz no geral?
Ele pega o que você digita no formulário (atividade + nota) e coloca em uma tabela na tela. Se a nota for maior ou igual a 7, mostra uma imagem de aprovado, se não, uma de reprovado.

Por que preciso do addEventListener?
Porque é ele quem “escuta” quando você clica no botão do formulário. Sem isso, nada aconteceria.

Por que tem preventDefault()?
Porque o navegador, por padrão, tenta enviar o formulário para outro lugar (como se fosse mandar por e-mail). Nós não queremos isso, só queremos manipular na tela.

Por que tudo começa como texto (let linha = '<tr>')?
Porque o jeito mais simples de criar uma linha de tabela dinamicamente é montar o HTML como texto e depois jogar dentro do tbody com .innerHTML.

O que é linhas += linha?
É como se você tivesse uma sacola (linhas) e fosse jogando uma linha nova dentro dela toda vez que o usuário envia o formulário.

O que é querySelector('tbody')?
É uma forma de pegar um elemento da página. Nesse caso, ele pega o <tbody> da tabela, que é o lugar certo para colocar linhas <tr>.

Por que no final apago os valores dos inputs?
Só para ficar mais prático para quem usa: assim a pessoa não precisa apagar manualmente para digitar outra coisa.*/


const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');
const addBlockButton = document.querySelector('.add-block-button');
const removeBlockButton = document.querySelector('.remove-block-button');
const newBlocksContainer = document.querySelector('.new-blocks-container');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = '';

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
      `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

function adicionarNovoBloco() {
  const newBlockContainer = criarBlocoContainer();

  newBlocksContainer.appendChild(newBlockContainer);

  // Mostra a new-blocks-container quando um novo bloco é adicionado
  newBlocksContainer.style.display = 'block';
}

function criarBlocoContainer() {
  const newBlockContainer = document.createElement('div');
  newBlockContainer.classList.add('block-container');

  const newInputName = document.createElement('input');
  newInputName.classList.add('input-name');
  newInputName.placeholder = 'Nome do bloco de notas...';

  const newInputTask = document.createElement('input');
  newInputTask.classList.add('input-task');
  newInputTask.placeholder = 'Nota...';

  const newButtonAddTask = document.createElement('button');
  newButtonAddTask.classList.add('button-add-task');
  newButtonAddTask.textContent = 'Adicionar';

  const newUlListTasks = document.createElement('ul');
  newUlListTasks.classList.add('list-tasks');

  newButtonAddTask.addEventListener('click', adicionarNovaTarefa);

  newBlockContainer.appendChild(newInputName);
  newBlockContainer.appendChild(newInputTask);
  newBlockContainer.appendChild(newButtonAddTask);
  newBlockContainer.appendChild(newUlListTasks);

  return newBlockContainer;
}

function removerUltimoBloco() {
  const blockContainers = document.querySelectorAll('.block-container');

  if (blockContainers.length > 1) {
    blockContainers[blockContainers.length - 1].remove();
  }

  // Oculta a new-blocks-container após remover um bloco
  if (blockContainers.length === 2) {
    newBlocksContainer.style.display = 'none';
  }
}

recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
addBlockButton.addEventListener('click', adicionarNovoBloco);
removeBlockButton.addEventListener('click', removerUltimoBloco);

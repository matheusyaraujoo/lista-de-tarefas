const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');
const addBlockButton = document.querySelector('.add-block-button');
const removeBlockButton = document.querySelector('.remove-block-button');
const newBlocksContainer = document.querySelector('.new-blocks-container');

let minhaListaDeItens = [];
recarregarTarefas();

const changeWallpaperButton = document.querySelector('.change-wallpaper-button');
const fileInput = document.getElementById('file-input');

changeWallpaperButton.addEventListener('click', () => {
  fileInput.click(); // Simula o clique no input de arquivo
});

fileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let newWidth, newHeight;

      if (screenWidth / screenHeight > aspectRatio) {
        newWidth = screenWidth;
        newHeight = screenWidth / aspectRatio;
      } else {
        newHeight = screenHeight;
        newWidth = screenHeight * aspectRatio;
      }

      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = `100% 100%`;

    };
  }
});


function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = '';

  mostrarTarefas();
}

function mostrarTarefas() {
  minhaListaDeItens.sort((a, b) => (a.concluida && !b.concluida ? 1 : -1));

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

  newButtonAddTask.addEventListener('click', () => adicionarNovaTarefaNoBloco(newUlListTasks));

  newBlockContainer.appendChild(newInputName);
  newBlockContainer.appendChild(newInputTask);
  newBlockContainer.appendChild(newButtonAddTask);
  newBlockContainer.appendChild(newUlListTasks);

  return newBlockContainer;
}

function adicionarNovaTarefaNoBloco(ulListTasks) {
  const taskText = ulListTasks.previousSibling.previousSibling.value;
  ulListTasks.previousSibling.previousSibling.value = '';

  ulListTasks.innerHTML +=
    `
    <li class="task">
        <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefaNoBloco(this)">
        <p>${taskText}</p>
        <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItemNoBloco(this)">
    </li>
    `;
}



function concluirTarefaNoBloco(imgElement) {
  const listItem = imgElement.parentNode;
  listItem.classList.toggle('done');
  const ulListTasks = listItem.parentNode;
  ulListTasks.appendChild(listItem);
}


function deletarItemNoBloco(imgElement) {
  const listItem = imgElement.parentNode;
  const ulListTasks = listItem.parentNode;
  ulListTasks.removeChild(listItem);
}



function removerUltimoBloco() {
  const blockContainers = document.querySelectorAll('.block-container');

  if (blockContainers.length > 1) {
    blockContainers[blockContainers.length - 1].remove();
  }

  if (blockContainers.length === 2) {
    newBlocksContainer.style.display = 'none';
  }
}




//recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
addBlockButton.addEventListener('click', adicionarNovoBloco);
removeBlockButton.addEventListener('click', removerUltimoBloco);

function adicionarNovoBloco2() {
  const newBlockContainer = criarBlocoContainer();
  newBlocksContainer2.appendChild(newBlockContainer);
  newBlocksContainer2.style.display = 'block';
}

addBlockButton.addEventListener('click', adicionarNovoBloco);
removeBlockButton.addEventListener('click', removerUltimoBloco);




const newBlocksContainer2 = document.querySelector('.new-blocks-container2');
const addBlockButton2 = document.querySelector('.add-block-button2');
const removeBlockButton2 = document.querySelector('.remove-block-button2');
const newBlocksContainer3 = document.querySelector('.new-blocks-container3');
const addBlockButton3 = document.querySelector('.add-block-button3');
const removeBlockButton3 = document.querySelector('.remove-block-button3');


function adicionarNovoBloco2() {
  const newBlockContainer = criarBlocoContainer();
  newBlocksContainer2.appendChild(newBlockContainer);
  newBlocksContainer2.style.display = 'block';
}

function adicionarNovoBloco3() {
  const newBlockContainer = criarBlocoContainer();
  newBlocksContainer3.appendChild(newBlockContainer);
  newBlocksContainer3.style.display = 'block';
}

function removerUltimoBloco2() {
  const blockContainers = document.querySelectorAll('.block-container');

  if (blockContainers.length > 2) {
    blockContainers[blockContainers.length - 1].remove();
  }

  if (blockContainers.length === 3) {
    newBlocksContainer2.style.display = 'none';
  }
}

function removerUltimoBloco3() {
  const blockContainers = document.querySelectorAll('.block-container');

  if (blockContainers.length > 3) {
    blockContainers[blockContainers.length - 1].remove();
  }

  if (blockContainers.length === 4) {
    newBlocksContainer3.style.display = 'none';
  }
}



addBlockButton2.addEventListener('click', adicionarNovoBloco2);
removeBlockButton2.addEventListener('click', removerUltimoBloco2);
removeBlockButton3.addEventListener('click', removerUltimoBloco3);
removeBlockButton3.addEventListener('click', removerUltimoBloco3);




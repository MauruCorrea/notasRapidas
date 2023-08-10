//********init********//
window.onload = () =>{  
  !sessionStorage.getItem('logado') && (window.location = 'login.html');
}

const form = document.querySelector('form');
const select = document.querySelector('#inputGroupSelect01')

let inputs = JSON.parse(localStorage.getItem('notes')) || [];
let id = inputs[inputs.length-1]?.id+1|| 0;



//********init********//

//--------------------------------------//

//*****functions*****//

//verifica entradas
function checkInputs (inputs){ 
  //checkTexts  
  if(!validateInputs(inputs)) return false;

  //check Replicate itens
  if(checkReplicates(inputs)) return false;
    
  return true; // inputs validos
}

//validar se ha inputs vazios
function validateInputs(input){      
    if(input.titulo == ''){
      alert('Insira um Titulo valido!');
      return false;
    }else if(input.inicio == ''){
      alert('Insira um horario de Inicio valido!');
      return false;
    }else if(input.fim == ''){
      alert('Insira um horario de Termino valido');
      return false;
    }  
    return true; // inputs validos
}

//verificar se ha itens duplicados
function checkReplicates(input){  
  let replicates = false;
  inputs.forEach((element) => {
    if(element.titulo === input.titulo &&
      element.inicio === input.inicio &&
      element.fim === input.fim){
        //there are duplicate items
        alert('Ja existe este item');
        replicates = true;
      }
      //no replicated itens
    });
  return replicates;    
}
//add note to list
function includeNote(note){
    //init
    let list = document.querySelector('.atividades') 
    let text = `Titulo ${note.titulo} - Inicio: ${note.inicio} - Fim: ${note.fim}` 
    let item = document.createElement('li')
    let btnExcluir = `<button class ='btn btn-danger mb-2 small' onclick = excluirDoDom(${note.id})>Excluir</button>`
    let btnCompletar = `<button class ='btn btn-success mb-2 small' onclick = completarTarefa(${note.id})>Completar</button>`
    //item settings
    item.setAttribute('class', 'list-group-item')
    item.setAttribute('id', note.id)
    item.innerHTML = `${text} ${btnExcluir} ${btnCompletar}`
    //add item to dom
    list.appendChild(item)    
}


function completarTarefa(id) {
    inputs.filter(input => input.id == id)[0].completed=true
    localStorage.setItem('notes', JSON.stringify(inputs))
    alert('Tarefa Completa')
}

function excluirDoDom(id){
    document.getElementById(id).remove();
    let index = inputs.findIndex((input)=>{return input.id == id})
    //remove elemento do array    
    inputs.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(inputs)) 
    console.table(inputs)
}

function filterList(status){
    // limpar lista
    document.querySelector('.atividades').replaceChildren('')    
    // recriar lista com itens filtrados
    if(status == null){ 
        inputs.forEach((item) => {
            includeNote(item)
        })
    }else{
        let filtred = inputs.filter((input) => input.completed == status)
        filtred.forEach((item) => {            
            includeNote(item)
        });
    }
}


//*****functions*****//

//--------------------------------------//

//******events*******//

//submit event
form.addEventListener('submit',function(e){
    //previne reload do submit
    e.preventDefault();    
    //init
    let titulo = form.querySelector('#inputTitulo').value;
    let inicio = form.querySelector('#inputInicio').value;
    let fim = form.querySelector('#inputFim').value;

    let input = {titulo, inicio, fim}

    input.id = id
    input.completed = false;

    //verificar e validra inputs
    if(!checkInputs(input)) return;

    //adiciona no array e no local storage 
    inputs.push(input);
    localStorage.setItem('notes', JSON.stringify(inputs))

    //adiciona no DOM 
    includeNote(input);
    id++ 

    
    
});

//select event
select.addEventListener('change', function (e){    
    switch (e.target.value) {
        case 'all':
            filterList(null);

            break;
        case 'completed':
            filterList(true);

            break;
        case 'uncompleted':
            filterList(false);
            
            break;
        default:
            filterList(null);
            break;
    }
});

//******events*******//

inputs.forEach((input)=>{includeNote(input)});

//--------------------------------------//
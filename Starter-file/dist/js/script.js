import { Question } from "./question.js";

const demarer = document.getElementById('demarer');
const suivant = document.getElementById('suivant');
const precedent = document.getElementById('precedent');
const question_instance = new Question()

function create_question(id) {
  // Getting question object
  const question_object = question_instance.get_question_by_id(id);

  // Creating header for the question
  let question_header = document.createElement('p');
  question_header.classList.add('prg-question');
  question_header.setAttribute('id', id)
  question_header.innerText = question_object.question;

  // Preparing a form for the question
  let question_form = document.createElement('div');
  question_form.classList.add('les-inputs');

  // If the question type was choices "radio" ...
  if (question_object.type == "radio") {
    // Creating a form field
    let form_field = document.createElement('div');
    form_field.classList.add('inpt');

    // For every possible answer ...
    for(let answer of question_object.answers) {
      // Creating a form input for the answer
      let form_input = document.createElement('input');
      Object.assign(form_input, {
        type: 'radio',
        name: 'radio_input',
        id: answer,
        value: answer,
      })

      // Creating a form label for the answer
      let form_label = document.createElement('label')
      form_label.setAttribute('for', answer)
      form_label.innerText = answer

      // Append the last two parts into the field
      form_field.append(form_input, form_label)
    }

    // Append the field in the question form
    question_form.appendChild(form_field)
  }

  // If the question type was numerical "number" ...
  if (question_object.type == "number") {
    // Modifing the class of the question form
    question_form.setAttribute('class', 'answer-inputs');

    // Creating the form input
    let form_input = document.createElement('input');
    Object.assign(form_input, {
      type: 'number',
      name: 'number_input',
      id: 'NumberInput',
      min: '0',
      placeholder: question_object.label //hna fin kin l mochkil maki taba9ch hadchi 
    })

    // Creating the form label
    let form_label = document.createElement('span')
    form_label.classList.add('input-span')
    form_label.innerText = question_object.label

    // Appending the last two parts into the question form
    question_form.append(form_input, form_label)
  }

  // Returning the parts of the question block
  return [question_header, question_form];
}

// 
demarer.addEventListener('click', (event) =>{
  event.preventDefault()

  let question_container = document.querySelector('.question-affiche');
  let section = document.querySelectorAll('.section');

  section[0].classList.add('hide');
  section[1].classList.remove('hide');
  precedent.classList.add('hide');
  
  let question_parts = create_question(1)
  question_container.innerHTML = "";
  question_parts.forEach( part => question_container.appendChild(part) )
});

function quitter() {
  let section = document.querySelectorAll('.section');
  section[1].classList.add('hide');
  section[2].classList.remove('hide');
}

function recommancer() {
  let section = document.querySelectorAll('.section');
  section[0].classList.remove('hide');
  section[1].classList.add('hide');
}

suivant.addEventListener('click', (event) =>{
  event.preventDefault()

  let question_container = document.querySelector('.question-affiche');
  let question_header = document.querySelector('.prg-question');
  let question_id = parseInt(question_header.getAttribute('id'))

  // let current_question = question_instance.get_question_by_id(question_id)
  // update_score(current_question)

  if (question_id == question_instance.get_questions_length()){
    quitter();
  } else {
    let question_parts = create_question(question_id + 1)
    
    question_container.innerHTML = "";
    question_parts.forEach( part => question_container.appendChild(part) )
  }
  
  precedent.classList.remove('hide');
});

precedent.addEventListener('click', (event) =>{
  event.preventDefault()

  let question_container = document.querySelector('.question-affiche');
  let question_header = document.querySelector('.prg-question');
  let question_id = parseInt(question_header.getAttribute('id'))
  
  if (question_id-1 == 0){ recommancer(); } 
  else {
    let question_parts = create_question(question_id-1)
    
    question_container.innerHTML = "";
    question_parts.forEach( part => question_container.appendChild(part) )
  }
  
  precedent.classList.remove('hide');
});
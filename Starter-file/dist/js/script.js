import { Question } from "./question.js";

const demarer = document.getElementById('demarer');
const suivant = document.getElementById('suivant');
const precedent = document.getElementById('precedent');
const question_instance = new Question()

let section = document.querySelectorAll('.section');
let question = document.querySelector('.question');

function create_question(id) {
  const question_object = question_instance.get_question_by_id(id);

  let question_header = document.createElement('p');
  question_header.classList.add('prg-question');
  question_header.setAttribute('id', `Q${id}`)
  question_header.innerText = question_object.question;

  let question_form = document.createElement('div');
  question_form.classList.add('les-inputs');

  if (question_object.type == "radio") {
    let form_field = document.createElement('div');
    form_field.classList.add('inpt');

    for(answer of question_object.answers) {
      let form_input = document.createElement('input');
      Object.assign(form_input, {
        type: 'radio',
        name: 'radio_input',
        id: answer,
        value: answer,
      })

      let form_label = document.createElement('label')
      form_label.setAttribute('for', answer)
      form_label.innerText = answer

      form_field.append(form_input, form_label)
    }

    question_form.appendChild(form_field)
  }
  if (question_object.type == "number") {
    question_form.classList.add('answer-inputs');

    let form_input = document.createElement('input');
    Object.assign(form_input, {
      type: 'number',
      name: 'number_input',
      id: 'NumberInput',
      min: '0',
      placeholder: question_object.label
    })

    let form_label = document.createElement('span')
    form_label.classList.add('input-span')
    form_label.innerText = question_object.label

    question_form.append(form_input, form_label)
  }

}

demarer.addEventListener('click', () =>{
  section[0].classList.add('hide');
  section[1].classList.remove('hide');
  precedent.classList.add('hide');
  question.innerText = question_object.question;
});

suivant.addEventListener('click', () =>{
  question.innerHTML = questions[1];
  precedent.classList.remove('hide');
});
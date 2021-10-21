import { Question } from './question';
import { isValid } from './utils';
import './style.css';

const form = document.getElementById('form'),
  input = form.querySelector('#question-input'),
  submitBtn = form.querySelector('#submit');

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    };

    submitBtn.disabled = true;
    //Должны отправить асинхронный запрос на сервер чтобы сохранить вопрос
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      submitBtn.disabled = false;
    });
  }
}
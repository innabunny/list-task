const form = document.getElementById('form'),
  input = document.getElementById('input'),
  list = document.getElementById('list'),
  outputDate = document.getElementById('output-date'),
  outputTime = document.getElementById('output-time'),
  btnDate = document.getElementById('btn-date'),
  btnHour = document.getElementById('btn-hour'),
  btnSubmit = document.getElementById('submit');

const initialArray = [
  {
    id: 0,
    task: 'Заниматься каждый день программированием не менее 1 часа!',
    checked: false,
  },
  {
    id: 1,
    task: 'Перебрать шкаф',
    checked: false,
  },
  {
    id: 2,
    task: 'Отнести пуховик в химчистку',
    checked: false,
  },
  {
    id: 3,
    task: 'Записаться к врачу',
    checked: false,
  },
];

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newTask = {
    task: input.value,
    checked: false,
  };

  initialArray.push(newTask);
  input.value = '';
  render(initialArray);
});

input.addEventListener('input', () => {
  if (input.value.trim().length === 0) {
    btnSubmit.setAttribute('disabled', '');
    return;
  } else {
    btnSubmit.removeAttribute('disabled');
  }
});

//Делегирование событий

list.onclick = function (evt) {
  // console.log(evt.target.dataset.index);
  if (evt.target.dataset.index) {
    const index = evt.target.dataset.index;
    const type = evt.target.dataset.type;
    if (type === 'checked') {
      initialArray[index].checked = !initialArray[index].checked;
      console.log(initialArray[index]);
      render(initialArray);
    } else if (type === 'remove') {
      initialArray.splice(index, 1);
      // console.log(initialArray);
      render(initialArray);
    }
  }
};

function getTemplate(task, index) {
  list.insertAdjacentHTML(
    'beforeend',
    `        <li
          class="list-group-item d-flex align-items-center justify-content-between"
        >
          <span class="lead ${
            task.checked ? 'text-decoration-line-through' : ''
          }">${task.task}</span>
          <span>
            <span class="btn btn-small  ${
              task.checked ? 'btn btn-light' : 'btn-success '
            }"
            data-index=${index} data-type="checked"  id=${index} >&#10003;</span
            >
            <span class="btn btn-small btn-danger" data-type="remove" data-index=${index}>&#88;</span>
          </span>
        </li>`
  );
}

function render(arr) {
  list.innerHTML = '';
  if (arr.length === 0) {
    list.insertAdjacentHTML(
      'beforeend',
      `
        <h3>Список задач пуст</h3>`
    );
  }
  for (let i = 0; i < arr.length; i++) {
    getTemplate(arr[i], i);
  }
}

render(initialArray);

const period = new Date();

function updateClock(value) {
  outputDate.textContent = value.toLocaleDateString();
  outputTime.textContent = value.toLocaleTimeString();
}

updateClock(period);

setInterval(() => {
  const now = new Date();
  updateClock(now);
}, 1000);

btnDate.onclick(() => {
  updateClock();
});

document.addEventListener('DOMContentLoaded', (e) => {
  document.querySelector('.dimension__value').value = '';
  session_style(1);

  makeInputTable(MIN_WIDTH);
});

function session_style(mode) {
  const outputSection = document.querySelector('.output');
  const trySection = document.querySelector('.try');
  switch (mode) {
    case 1:
      outputSection.classList.add('hide');
      trySection.classList.add('hide');
      break;
    case 2:
      outputSection.classList.remove('hide');
      trySection.classList.add('hide');
      break;
    case 3:
      trySection.classList.remove('hide');
      outputSection.classList.add('hide');
      break;
    default:
      outputSection.classList.remove('hide');
      trySection.classList.remove('hide');
      break;
  }
}

function makeInputTable(width) {
  let input_table = document.querySelector('.input__table');
  input_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  for (i = 0; i < width; ++i) {
    let row = document.createElement('tr');
    for (j = 0; j < width; ++j) {
      let input = document.createElement('input');
      input.type = 'number';
      input.placeholder = DEFAULT_INP_VALUE;
      input.setAttribute('onclick', 'select()');
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

// !Rewrite
function makeInputTable2(matrix, type = 'value') { // !Use makeInputTable()?
  let input_table = document.querySelector('.input__table');
  input_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  const width = matrix[0].length;
  for (i = 0; i < width; ++i) {
    let row = document.createElement('tr');
    for (j = 0; j < width; ++j) {
      let input = document.createElement('input');
      input.readOnly = true;
      if (type === 'value') input.value = matrix[i][j];
      else input.placeholder = matrix[i][j];
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

function makeOutputTable(matrix) {
  let output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  const width = matrix[0].length;
  for (i = 0; i < width; ++i) {
    let row = document.createElement('tr');
    for (j = 0; j < width; ++j) {
      let input = document.createElement('input');
      input.readOnly = true;
      input.placeholder = matrix[i][j];
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

function makeTryTable(matrix) {
  let try_table = document.querySelector('.try__table');
  try_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  try_table.appendChild(table);

  const width = matrix[0].length;
  for (i = 0; i < width; ++i) {
    let row = document.createElement('tr');
    for (j = 0; j < width; ++j) {
      let input = document.createElement('input');
      input.type = 'number';
      input.placeholder = matrix[i][j];
      input.onclick = 'this.select()';
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

document.querySelector('.dimension__button').addEventListener('click', () => {
  let input_dim = document.querySelector('.dimension__value');
  input_dim.blur();

  let width = input_dim.value || MIN_WIDTH;

  session_style(1);
  if (MIN_WIDTH <= width && width <= MAX_WIDTH) makeInputTable(width);
  else alert('Dimension not valid!\nTry again with a number between ' + MIN_WIDTH + ' and ' + MAX_WIDTH);
});

document.querySelector('.dimension__value').addEventListener('keyup', (e) => {
  if (e.keyCode === 13) document.querySelector('.dimension__button').click();
});

document.querySelector('.btns__restart').addEventListener('click', () => {
  session_style(1);
  Array.from(document.querySelectorAll('.input__table input')).map(x => {
    x.value = '';
    x.placeholder = DEFAULT_INP_VALUE
  });
});
document.addEventListener('DOMContentLoaded', async () => {
  session_style(1);
  document.querySelector('.dimension__value').setAttribute('onclick', 'select()');
  document.querySelector('.dimension__value').value = '';
  document.querySelector('.dimension__button').click();

  input_btns = [...document.querySelectorAll('.input__btns button')];
  input_btns.map(elem => elem.disabled = true);
});

function transpose(matrix) {
  return matrix.reduce(
    ($, row) => row.map(
      (_, i) => [...($[i] || []), row[i]]
    ), []
  )
}

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
      outputSection.classList.add('hide');
      trySection.classList.add('hide');
      break;
  }
}

document.querySelector('.dimension__value').addEventListener('keyup', e => {
  if (e.keyCode === 13) document.querySelector('.dimension__button').click();
});

document.querySelector('.btns__restart').addEventListener('click', () => {
  document.querySelector('.dimension__button').click();
});

document.querySelector('.dimension__button').addEventListener('click', () => {
  session_style(1);

  const input_dim = document.querySelector('.dimension__value');
  input_dim.blur();

  let width = input_dim.value || MIN_WIDTH;

  if (MIN_WIDTH <= width && width <= MAX_WIDTH) {
    const input_table = document.querySelector('.input__table');
    input_table.innerHTML = '';

    const table = document.createElement('table');
    input_table.appendChild(table);

    for (i = 0; i < width; ++i) {
      const tr = document.createElement('tr');
      for (j = 0; j < width; ++j) {
        const td = document.createElement('td');
        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }
  else alert(`Dimension not valid!\nTry again with a number between ${MIN_WIDTH} and ${MAX_WIDTH}`);
});

function colorBorder(e) {
  if (e.offsetX <= 10 && j > 0) {
    if (this.style.borderLeft === "1px solid rgb(0, 0, 0)") this.style.borderLeft = "1px dashed #20202055";
    else this.style.borderLeft = "1px solid #000";
  } else if (e.offsetY <= 10 && i > 0) {
    if (this.style.borderTop === "1px solid rgb(0, 0, 0)") this.style.borderTop = "1px dashed #20202055";
    else this.style.borderTop = "1px solid #000";
  }
}
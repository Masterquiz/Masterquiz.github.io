document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.dimension__value').setAttribute('onclick', 'select()');

  document.querySelector('.dimension__value').value = '';
  document.querySelector('.dimension__button').click();

  document.querySelector('.try__modify .btns__undo').disabled = true;
  document.querySelector('.try__modify .btns__redo').disabled = true;
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
  }
}

document.querySelector('.dimension__button').addEventListener('click', () => {
  session_style(1);

  const input_dim = document.querySelector('.dimension__value');
  input_dim.blur();

  const width = input_dim.value || MIN_WIDTH;

  if (MIN_WIDTH <= width && width <= MAX_WIDTH) {
    const input_table = document.querySelector('.input__table');
    input_table.innerHTML = '';

    const table = document.createElement('table');
    input_table.appendChild(table);

    for (let i = 0; i < width; ++i) {
      const tr = document.createElement('tr');
      for (j = 0; j < width; ++j) {
        const td = document.createElement('td');

        td.addEventListener('keydown', e => {
          // FIXME: Prevent from stange thing in td in a better way
          if (e.key === 'Enter' || (e.target.innerText.length > 3 && e.key !== 'Backspace'))
            e.preventDefault();
        });

        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  } else
    alert(`Dimension not valid!\nTry again with a number between ${MIN_WIDTH} and ${MAX_WIDTH}`);

  document.querySelector('.input__modify .btns__undo').disabled = true;
  document.querySelector('.input__modify .btns__redo').disabled = true;
  [UNDO, REDO] = [[], []];
});

document.querySelector('.dimension__value').addEventListener('keyup', e => {
  if (e.keyCode === 13) document.querySelector('.dimension__button').click();
});

document.querySelector('.input__modify .btns__restart').addEventListener('click', () => {
  document.querySelector('.dimension__button').click();
});

document.querySelector('.btns__try').addEventListener('click', () => {
  document.querySelector('.try__modify .btns__undo').disabled = true;
  document.querySelector('.try__modify .btns__redo').disabled = true;
  [TRY_UNDO, TRY_REDO] = [[], []];
});

document.querySelector('.try__modify .btns__restart').addEventListener('click', () => {
  document.querySelector('.btns__try').click();
});

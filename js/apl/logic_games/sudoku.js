// Game propriety
const MIN_WIDTH = 9;
const MAX_WIDTH = 9;

const CODE = `
  'sudoku' ⎕CY 'dfns'

  creator ← {
    shuffle ← ⊂⍤?⍨∘≢⌷⊢
    puzzle ← ↑(0,9|+\\(9-1)⍴1,⍨2/9÷3)⌽¨⊂?⍨9
    mat ← 9 9⍴0@(50?81)⊢,puzzle
    1=≢sudoku mat: mat
    ∇ ⍬
  }
 `;

document.querySelector('.dimension__button').addEventListener('click', function customisedTD() {
  [...document.querySelectorAll('.input__table tr')].map((tr, i) =>
    [...tr.querySelectorAll('.input__table td')].map((td, j) => {
      td.contentEditable = true;

      if (0 === i % 3) td.style.borderTop = '1px solid #000';
      if (0 === j % 3) td.style.borderLeft = '1px solid #000';

      td.addEventListener('input', () => {
        UNDO.push([[i, j], td.innerText.replace('\n', '')]);
        document.querySelector('.input__modify .btns__undo').disabled = false;

        REDO = [];
        document.querySelector('.input__modify .btns__redo').disabled = true;
      });
    })
  );
});

document.querySelector('.input__modify .btns__undo').addEventListener('click', function undo() {
  if (UNDO.length) {
    const [[i, j], value] = UNDO.slice(-1)[0];
    UNDO.pop();

    REDO.push([[i, j], value]);

    [...document.querySelectorAll('.input__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].innerText =
      UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
        .filter(x => x !== '')
        .slice(-1) + '\n';
  }

  if (!UNDO.length) this.disabled = true;

  document.querySelector('.input__modify .btns__redo').disabled = false;
});

document.querySelector('.input__modify .btns__redo').addEventListener('click', function redo() {
  if (REDO.length) {
    const [[i, j], value] = REDO.slice(-1)[0];
    REDO.pop();

    UNDO.push([[i, j], value]);

    [...document.querySelectorAll('.input__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].innerText =
      UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
        .filter(x => x !== '')
        .slice(-1) + '\n';
  }

  if (!REDO.length) this.disabled = true;
  document.querySelector('.input__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__solve').addEventListener('click', async function solve() {
  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = true));

  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td =>
      td.innerText.replace('\n', '') === '' ? 0 : +td.innerText
    )
  );

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  JSON.parse(await executeAPL(CODE, `toJSON ⊃sudoku fromJSON '${JSON.stringify(matrix)}'`)).map(
    (item, i) => {
      const tr = document.createElement('tr');
      item.map((x, j) => {
        const td = document.createElement('td');

        if (0 === i % 3) td.style.borderTop = '1px solid #000';
        if (0 === j % 3) td.style.borderLeft = '1px solid #000';
        if (!matrix[i][j]) td.style.color = '#4169e1';
        td.innerText = x;

        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
  );

  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = false));
  session_style(2);
});

document.querySelector('.btns__create').addEventListener('click', async function create() {
  try {
    [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = true));
    session_style(1);

    const input_table = document.querySelector('.input__table');
    const width =
      document.querySelector('.dimension__value').value ||
      input_table.querySelector('tr').childElementCount;

    if (width != 9) throw 'You can create only 9x9 sudoku!';

    const matrix = JSON.parse(await executeAPL(CODE, `toJSON creator ⍬`));

    input_table.innerHTML = '';
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    input_table.appendChild(table);

    matrix.map((item, i) => {
      const tr = document.createElement('tr');
      item.map((x, j) => {
        const td = document.createElement('td');

        if (0 === i % 3) td.style.borderTop = '1px solid #000';
        if (0 === j % 3) td.style.borderLeft = '1px solid #000';

        if (x === 0) td.contentEditable = true;
        else td.innerText = x;

        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
    console.warn("Why are you trying this? Soon this won't be a problem!");
  }

  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = false));
});

document.querySelector('.btns__try').addEventListener('click', async function try_solve() {
  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td => +td.innerText)
  );

  const try_label = document.querySelector('.try h2');
  try_label.innerText = 'Solve';
  try_label.style.color = '#4169e1';

  const try_table = document.querySelector('.try__table');
  try_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  try_table.appendChild(table);

  matrix.map((item, i) => {
    const tr = document.createElement('tr');

    item.map((x, j) => {
      const td = document.createElement('td');

      if (0 === i % 3) td.style.borderTop = '1px solid #000';
      if (0 === j % 3) td.style.borderLeft = '1px solid #000';

      if (!x) {
        td.style.color = '#4169e1';
        td.contentEditable = true;
      } else {
        td.style.pointerEvents = 'none';
        td.innerText = x;
      }

      td.addEventListener('input', () => {
        TRY_UNDO.push([[i, j], td.innerText.replace('\n', '')]);
        document.querySelector('.try__modify .btns__undo').disabled = false;

        TRY_REDO = [];
        document.querySelector('.try__modify .btns__redo').disabled = true;
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  document.querySelector('.btns__verify').disabled = false;

  session_style(3);
});

document.querySelector('.try__modify .btns__undo').addEventListener('click', function try_undo() {
  if (TRY_UNDO.length) {
    const [[i, j], value] = TRY_UNDO.slice(-1)[0];
    TRY_UNDO.pop();

    TRY_REDO.push([[i, j], value]);

    [...document.querySelectorAll('.try__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].innerText =
      TRY_UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
        .filter(x => x !== '')
        .slice(-1) + '\n';
  }

  if (!TRY_UNDO.length) this.disabled = true;

  document.querySelector('.try__modify .btns__redo').disabled = false;
});

document.querySelector('.try__modify .btns__redo').addEventListener('click', function try_redo() {
  if (TRY_REDO.length) {
    const [[i, j], value] = TRY_REDO.slice(-1)[0];
    TRY_REDO.pop();

    UNDO.push([[i, j], value]);

    [...document.querySelectorAll('.try__table tr')].map(tr => tr.querySelectorAll('td'))[i][
      j
    ].innerText =
      UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
        .filter(x => x !== '')
        .slice(-1) + '\n';
  }

  if (!TRY_REDO.length) this.disabled = true;
  document.querySelector('.try__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__verify').addEventListener('click', async function verify() {
  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td =>
      td.innerText.replace('\n', '') === '' ? 0 : +td.innerText
    )
  );

  const solution = await executeAPL(CODE, `toJSON ⊃sudoku fromJSON '${JSON.stringify(matrix)}'`);

  const try_matrix = JSON.stringify(
    [...document.querySelectorAll('.try__table tr')].map(tr =>
      [...tr.querySelectorAll('td')].map(td => +td.innerText.replace('\n', ''))
    )
  );

  const try_label = document.querySelector('.try h2');

  if (solution[0] === try_matrix) {
    try_label.style.color = '#080';
    try_label.innerText = 'Correct!';

    this.disabled = true;
    document.querySelector('.try__modify .btns__undo').disabled = true;
    document.querySelector('.try__modify .btns__redo').disabled = true;
  } else {
    try_label.style.color = '#e62020';
    try_label.innerText = 'Wrong!';
  }
});

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

        if (!x === 0) td.innerText = x;

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
  } catch (error) {
    console.error(error);
    console.warn("Why are you trying this? Soon this won't be a problem!");
  }

  [...document.querySelectorAll('.input__btns button')].map(btn => (btn.disabled = false));
});

let lastNumberClicked = 0;

const try_numbers = [...document.querySelectorAll('.numbers p')];
try_numbers.map(p =>
  p.addEventListener('click', e => {
    try_numbers.map(elem => (elem.style.textDecoration = 'none'));
    e.target.style.textDecoration = 'underline';
    lastNumberClicked = +e.target.innerText;

    [...document.querySelectorAll('.try__table td')].map(td => {
      if (td.innerText == lastNumberClicked) {
        td.style.fontWeight = 'bolder';
        td.style.color = '#ff9757';
      } else {
        td.style.backgroundColor = 'unset';
        td.style.fontWeight = 'unset';
        td.style.color = 'unset';
      }
    });
  })
);

document.querySelector('.btns__try').addEventListener('click', async function try_solve() {
  // document.querySelector('.input').style.display = 'none';
  // const matrix = [
  //   [0, 0, 7, 6, 0, 0, 0, 3, 0],
  //   [0, 5, 9, 1, 3, 4, 0, 2, 7],
  //   [0, 3, 0, 0, 0, 0, 6, 0, 9],
  //   [3, 0, 0, 0, 0, 0, 5, 0, 0],
  //   [0, 0, 0, 5, 9, 1, 0, 0, 0],
  //   [0, 9, 1, 0, 4, 8, 0, 0, 0],
  //   [0, 0, 0, 4, 0, 0, 0, 0, 5],
  //   [4, 8, 0, 0, 0, 0, 0, 1, 3],
  //   [7, 0, 5, 0, 0, 0, 0, 8, 0],
  // ];

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

      if (x) td.innerText = x;
      else td.appendChild(document.createElement('br'));

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  // FIXME: Use matrix to highlight instead of tds
  const tds = [...document.querySelectorAll('.try__table td')];

  [...document.querySelectorAll('.try__table tr')].map((tr, i) =>
    [...tr.querySelectorAll('.try__table td')].map((td, j) => {
      td.addEventListener('click', () => {
        if (!matrix[i][j] && lastNumberClicked) {
          if (document.querySelector('.more-edit').style.display === 'none') {
            if (td.innerText[0] !== '\n') td.innerText = '\n';
            td.classList.add('highlight');

            const spans = [...td.querySelectorAll('span')];

            if (-1 === spans.map(elem => elem.innerText).indexOf('' + lastNumberClicked)) {
              const span = document.createElement('span');
              span.innerText = lastNumberClicked;

              // FIXME: Use math to find position
              switch (lastNumberClicked) {
                case 1:
                  span.style.top = '0';
                  span.style.left = '0';
                  break;
                case 2:
                  span.style.top = '0';
                  span.style.left = '33%';
                  break;
                case 3:
                  span.style.top = '0';
                  span.style.left = '66%';
                  break;
                case 4:
                  span.style.top = '33%';
                  span.style.left = '0';
                  break;
                case 5:
                  span.style.top = '33%';
                  span.style.left = '33%';
                  break;
                case 6:
                  span.style.top = '33%';
                  span.style.left = '66%';
                  break;
                case 7:
                  span.style.top = '66%';
                  span.style.left = '0';
                  break;
                case 8:
                  span.style.top = '66%';
                  span.style.left = '33%';
                  break;
                case 9:
                  span.style.top = '66%';
                  span.style.left = '66%';
                  break;
              }
              td.appendChild(span);
            } else {
              spans[spans.map(elem => elem.innerText).indexOf('' + lastNumberClicked)].remove();
            }
          } else if (td.innerText == lastNumberClicked) td.innerText = lastNumberClicked;
          else if (lastNumberClicked) td.innerText = lastNumberClicked;
        }

        // Undo/Redo
        if (!matrix[i][j]) TRY_UNDO.push([[i, j], td.innerText]);
        document.querySelector('.try__modify .btns__undo').disabled = false;

        TRY_REDO = [];
        document.querySelector('.try__modify .btns__redo').disabled = true;

        // HighlightTDs
        for (const ind in tds) {
          // Reset color
          tds[ind].style.backgroundColor = 'unset';
          tds[ind].style.fontWeight = 'unset';
          tds[ind].style.color = 'unset';

          // TDs in the same row and column
          if (i === Math.floor(ind / 9) || j === ind % 9)
            tds[ind].style.backgroundColor = '#fff275';
        }

        // TDs in the same area
        const array = [0, 1, 2].map(x =>
          [0, 1, 2].map(
            y =>
              y + 3 * Math.floor(((j + 9 * i) % 9) / 3) + 9 * (x + 3 * Math.floor((j + 9 * i) / 27))
          )
        );
        for (const elem of array.flat()) tds[elem].style.backgroundColor = '#fff275';

        // TDs with the same number
        for (const elem of tds)
          if (elem.innerText === td.innerText && td.innerText[0] !== '\n') {
            // elem.style.backgroundColor = '#ff9757';
            elem.style.fontWeight = 'bolder';
            elem.style.color = '#ff9757';
          }

        td.style.backgroundColor = '#fff275';
        td.style.fontWeight = 'bolder';
        td.style.color = '#ff9757';
      });
    })
  );

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

document.querySelector('.btns__mode').addEventListener('click', function mode() {
  if (document.querySelector('.try h2').innerText === 'Correct!')
    this.removeEventListener('click', mode);
  else if (this.querySelector('.edit-off').style.display === 'none') {
    this.querySelector('.more-edit').style.display = 'none';
    this.querySelector('.edit-off').style.display = 'unset';
  } else {
    this.querySelector('.edit-off').style.display = 'none';
    this.querySelector('.more-edit').style.display = 'unset';
  }
});

setTimeout(() => {
  document.querySelector('.btns__try').click();
}, 100);

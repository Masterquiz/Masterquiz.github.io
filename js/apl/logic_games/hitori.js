// TODO Add check validity
// if ((await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`))[0].split` `[1] != 'ERROR:') {

// Game propriety
const MIN_WIDTH = 5;
const MAX_WIDTH = 8;
const EXAMPLES = {
  5: [['1 4 3 2 5', '2 5 2 3 3', '5 3 1 4 5', '4 2 4 4 1', '2 1 5 3 4']],
  6: [
    ['1 1 2 4 3 5', '1 1 5 4 4 6', '4 6 6 2 1 1', '6 3 3 3 5 4', '2 3 4 1 6 5', '2 5 4 6 2 5'],
    ['5 3 1 6 5 4', '6 2 2 1 1 2', '3 5 4 4 2 1', '6 1 3 6 6 2', '5 2 4 1 3 1', '1 3 5 4 4 3'],
  ],
  7: [
    [
      '2 6 5 2 6 7 1',
      '7 5 3 4 1 5 5',
      '6 4 5 1 5 2 3',
      '2 6 6 5 6 4 5',
      '4 5 2 4 7 2 6',
      '1 4 4 7 6 5 2',
      '7 7 1 2 2 3 1',
    ],
  ],
  8: [
    [
      '8 7 4 2 4 5 6 3',
      '4 6 2 6 5 6 6 3',
      '3 5 4 1 4 4 8 7',
      '6 8 7 4 1 2 3 5',
      '5 6 1 8 3 3 7 7',
      '8 3 8 4 8 8 1 2',
      '1 6 3 7 2 7 4 4',
      '7 8 5 3 8 1 2 2',
    ],
  ],
  9: [
    [
      '4 5 1 5 8 6 7 9 7',
      '3 7 4 3 4 7 6 5 6',
      '5 1 3 4 9 4 8 7 2',
      '7 8 6 8 1 9 6 1 7',
      '4 3 9 4 7 2 9 2 6',
      '2 6 4 3 1 7 6 3 2',
      '3 5 9 5 4 1 7 6 4',
      '7 4 5 7 3 2 8 8 9',
      '8 9 7 4 6 7 2 4 7',
    ],
  ],
  10: [
    [
      '2 9 9 4 8 3 8 2 7 2',
      '8 10 7 3 1 6 5 9 6 7',
      '9 1 3 1 9 8 4 4 9 6',
      '7 9 2 8 4 6 6 3 1 2',
      '6 4 3 5 3 7 3 2 9 1',
      '10 9 5 7 5 6 1 8 6 9',
      '7 2 7 8 8 7 9 2 3 7',
      '9 8 2 10 5  1 5 7 2 3',
      '2 5 10 1 7 9 3 6 1 2',
      '3 7 3 9 5 4 9 10 5 7',
    ],
  ],
  11: [
    [
      '1 6 3 6 5 1 3 7 11 8 10',
      '8 10 11 5 4 3 2 6 6 10 4',
      '1 4 6 3 1 4 5 3 10 2 5',
      '2 8 10 1 3 6 4 11 4 5 9',
      '11 9 6 3 11 2 1 6 11 7 2',
      '7 2 8 5 6 4 3 9 9 8 5',
      '1 8 9 6 3 8 2 4 2 0 4',
      '7 7 2 1 4 9 6 8 11 11 1',
      '11 1 5 4 1 2 1 9 7 2 3',
      '8 10 7 1 9 5 4 6 1 10 5',
      '2 11 1 9 2 4 8 5 6 4 6',
    ],
  ],
};

(async function loadWS() {
  const code = `
    ⎕RL←⍬2 ⋄

    ∇ res ← solver m;b;g;m1;m2;nbor;primes
      nbor ← {⍺×⍵∨(0 1↓⍵,0)∨(1↓⍵⍪0)∨(0 ¯1↓0,⍵)∨¯1↓0⍪⍵}
      primes ← 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47↑⍨≢m
      g ← ⊃⊂∨.=⊂⌽⍨¨⍳∘(1-⍨≢)
      m1 ← primes×⍤¯1⊢m×g m
      m2 ← primes×⍤1⊢m×⍉g⍉m
      b ← ⊃,/{((1,2≠/⊢)∘{⍵[⍋⍵]}⊂((⍸0≠⍵)⌷⍨∘⊂⍋))0~⍨,⍵}¨m1 m2
      b ← {⍵∘~¨⊂¨⍵}¨b
      res ← {⊃z⊣{z⊢←{⍵/⍨check¨⍵},z∘.{0@⍵⊢⍺}⍵}¨⍵⊣z←⊂m}b
    ∇ ⋄

    ∇ z←check x;T
      z←0=+/,(x⍷⍨⍪0 0)∨0 0⍷x ⍝ no 2x1 black islands
      z∧←{⍵≡⍵∘nbor⍣≡⊢1@(⊂⊃⍸⍵)⊢0⍴⍨⍴x}x≠0 ⍝ all blacks must be connected
    ∇`;

  [state, size, hash] = (await executeAPL(code, true)).slice(0, -1);

  input_btns = [...document.querySelectorAll('.input__btns button')];
  input_btns.map(btn => (btn.disabled = false));
})();

document.querySelector('.dimension__button').addEventListener('click', function customisedTD() {
  [...document.querySelectorAll('.input__table tr')].map((tr, i) =>
    [...tr.querySelectorAll('.input__table td')].map((td, j) => {
      td.contentEditable = true;

      td.addEventListener('blur', () => {
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
  input_btns.map(btn => (btn.disabled = false));

  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td => +td.innerText)
  );

  if (-1 === matrix.map(x => x.indexOf(0) === -1).indexOf(false)) {
    const output_table = document.querySelector('.output__table');
    output_table.innerHTML = '';

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    output_table.appendChild(table);

    JSON.parse(
      await executeAPL(
        `(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`
      )
    ).map((item, i) => {
      const tr = document.createElement('tr');
      item.map((x, j) => {
        const td = document.createElement('td');

        td.innerText = matrix[i][j];
        if (!x) {
          td.style.color = '#fff';
          td.style.backgroundColor = '#4169e1';
          td.style.opacity = 0.5;
        }

        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    session_style(2);
  } else alert(`An error occurred solving the puzzle`);

  input_btns.map(btn => (btn.disabled = false));
});

document.querySelector('.btns__create').addEventListener('click', async function create() {
  session_style(1);
  input_btns.map(btn => (btn.disabled = true));

  const input_table = document.querySelector('.input__table');
  const width =
    document.querySelector('.dimension__value').value ||
    input_table.querySelector('tr').childElementCount;

  input_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  EXAMPLES[width][(EXAMPLES[width].length * Math.random()) | 0].map(item => {
    const tr = document.createElement('tr');
    item.split` `.map(x => {
      const td = document.createElement('td');

      td.contentEditable = true;
      td.innerText = x;

      td.addEventListener('blur', function UpdateUNDO() {
        UNDO.push([[i, j], +this.innerText.replace('\n', '')]);
        [TRY_UNDO, TRY_REDO] = [[], []];
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  input_btns.map(btn => (btn.disabled = false));
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

      td.innerText = x ? x : '';

      td.addEventListener('click', function f() {
        const btn_mode = document.querySelector('.btns__mode').style.backgroundColor;
        if (try_label.innerText === 'Correct!') {
          td.removeEventListener('click', f);
          document.querySelector('.input__modify .btns__undo').disabled = true;
          document.querySelector('.input__modify .btns__redo').disabled = true;
          [REDO, UNDO] = [[], []];
        } else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }

          value =
            td.style.backgroundColor === 'rgb(65, 105, 225)'
              ? 1
              : td.style.backgroundColor === 'rgb(186, 85, 211)'
              ? -1
              : 0;

          TRY_UNDO.push([[i, j], value]);
          document.querySelector('.try__modify .btns__undo').disabled = false;

          TRY_REDO = [];
          document.querySelector('.try__modify .btns__redo').disabled = true;

          if (td.style.backgroundColor === btn_mode) {
            td.style.color = '';
            td.style.backgroundColor = '';
            td.style.opacity = 1;
          } else {
            td.style.color = '#fff';
            td.style.backgroundColor = btn_mode;
            td.style.opacity = 0.5;
          }
        }
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  document.querySelector('.btns__mode').style.border = 'none';
  document.querySelector('.btns__mode').style.backgroundColor = '#4169e1';
  document.querySelector('.btns__mode').style.opacity = 0.5;
  session_style(3);

  document.querySelector('.btns__verify').disabled = false;
});

document.querySelector('.try__modify .btns__undo').addEventListener('click', function try_undo() {
  if (TRY_UNDO.length) {
    const [[i, j], _] = TRY_UNDO.slice(-1)[0];

    const td = [...document.querySelectorAll('.try__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (td.style.backgroundColor === 'rgb(65, 105, 225)') TRY_REDO.push([[i, j], 1]);
    else if (td.style.backgroundColor === 'rgb(186, 85, 211)') TRY_REDO.push([[i, j], -1]);
    else TRY_REDO.push([[i, j], 0]);

    let new_value = TRY_UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_UNDO.pop();

    if (new_value === 1) td.style.backgroundColor = 'rgb(65, 105, 225)';
    else if (new_value === -1) td.style.backgroundColor = 'rgb(186, 85, 211)';
    else td.style.backgroundColor = '';
  }

  if (!TRY_UNDO.length) this.disabled = true;

  document.querySelector('.try__modify .btns__redo').disabled = false;
});

document.querySelector('.try__modify .btns__redo').addEventListener('click', function try_redo() {
  if (TRY_REDO.length) {
    const [[i, j], _] = TRY_REDO.slice(-1)[0];

    const td = [...document.querySelectorAll('.try__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (td.style.backgroundColor === 'rgb(65, 105, 225)') TRY_UNDO.push([[i, j], 1]);
    else if (td.style.backgroundColor === 'rgb(186, 85, 211)') TRY_UNDO.push([[i, j], -1]);
    else TRY_UNDO.push([[i, j], 0]);

    let new_value = TRY_REDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_REDO.pop();

    if (new_value === 1) td.style.backgroundColor = 'rgb(65, 105, 225)';
    else if (new_value === -1) td.style.backgroundColor = 'rgb(186, 85, 211)';
    else td.style.backgroundColor = '';
  }

  if (!TRY_REDO.length) this.disabled = true;
  document.querySelector('.try__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__verify').addEventListener('click', async function verify() {
  const matrix = [...document.querySelectorAll('.input__table tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td => +td.innerText)
  );

  const solution = await executeAPL(
    `(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`
  );

  const try_matrix = JSON.stringify(
    [...document.querySelectorAll('.try__table tr')].map((item, i) =>
      [...item.querySelectorAll('td')].map((x, j) =>
        x.style.backgroundColor === 'rgb(65, 105, 225)' ? 0 : matrix[i][j]
      )
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

document.querySelector('.btns__mode').addEventListener('click', function changeMode() {
  if (document.querySelector('.try h2').innerText === 'Correct!')
    this.removeEventListener('click', changeMode);
  else
    this.style.backgroundColor =
      this.style.backgroundColor === 'rgb(65, 105, 225)' ? '#ba55d3' : '#4169e1';
});

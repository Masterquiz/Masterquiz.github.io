// Game propriety
const MIN_WIDTH = 5;
const MAX_WIDTH = 8;
const EXAMPLES = {
  5: [
    [[1, 4, 3, 2, 5], [2, 5, 2, 3, 3], [5, 3, 1, 4, 5], [4, 2, 4, 4, 1], [2, 1, 5, 3, 4]],
  ],
  6: [
    [[1, 1, 2, 4, 3, 5], [1, 1, 5, 4, 4, 6], [4, 6, 6, 2, 1, 1], [6, 3, 3, 3, 5, 4], [2, 3, 4, 1, 6, 5], [2, 5, 4, 6, 2, 5]],
    [[5, 3, 1, 6, 5, 4], [6, 2, 2, 1, 1, 2], [3, 5, 4, 4, 2, 1], [6, 1, 3, 6, 6, 2], [5, 2, 4, 1, 3, 1], [1, 3, 5, 4, 4, 3]],
  ],
  7: [
    [[2, 6, 5, 2, 6, 7, 1], [7, 5, 3, 4, 1, 5, 5], [6, 4, 5, 1, 5, 2, 3], [2, 6, 6, 5, 6, 4, 5], [4, 5, 2, 4, 7, 2, 6], [1, 4, 4, 7, 6, 5, 2], [7, 7, 1, 2, 2, 3, 1]],
  ],
  8: [
    [[8, 7, 4, 2, 4, 5, 6, 3], [4, 6, 2, 6, 5, 6, 6, 3], [3, 5, 4, 1, 4, 4, 8, 7], [6, 8, 7, 4, 1, 2, 3, 5], [5, 6, 1, 8, 3, 3, 7, 7], [8, 3, 8, 4, 8, 8, 1, 2], [1, 6, 3, 7, 2, 7, 4, 4], [7, 8, 5, 3, 8, 1, 2, 2]],
  ],
  9: [
    [[4, 5, 1, 5, 8, 6, 7, 9, 7], [3, 7, 4, 3, 4, 7, 6, 5, 6], [5, 1, 3, 4, 9, 4, 8, 7, 2], [7, 8, 6, 8, 1, 9, 6, 1, 7], [4, 3, 9, 4, 7, 2, 9, 2, 6], [2, 6, 4, 3, 1, 7, 6, 3, 2], [3, 5, 9, 5, 4, 1, 7, 6, 4], [7, 4, 5, 7, 3, 2, 8, 8, 9], [8, 9, 7, 4, 6, 7, 2, 4, 7]],
  ],
  10: [
    [[2, 9, 9, 4, 8, 3, 8, 2, 7, 2], [8, 10, 7, 3, 1, 6, 5, 9, 6, 7], [9, 1, 3, 1, 9, 8, 4, 4, 9, 6], [7, 9, 2, 8, 4, 6, 6, 3, 1, 2], [6, 4, 3, 5, 3, 7, 3, 2, 9, 1], [10, 9, 5, 7, 5, 6, 1, 8, 6, 9], [7, 2, 7, 8, 8, 7, 9, 2, 3, 7], [9, 8, 2, 10, 5, , 1, 5, 7, 2, 3], [2, 5, 10, 1, 7, 9, 3, 6, 1, 2], [3, 7, 3, 9, 5, 4, 9, 10, 5, 7]],
  ],
  11: [
    [[1, 6, 3, 6, 5, 1, 3, 7, 11, 8, 10], [8, 10, 11, 5, 4, 3, 2, 6, 6, 10, 4], [1, 4, 6, 3, 1, 4, 5, 3, 10, 2, 5], [2, 8, 10, 1, 3, 6, 4, 11, 4, 5, 9], [11, 9, 6, 3, 11, 2, 1, 6, 11, 7, 2], [7, 2, 8, 5, 6, 4, 3, 9, 9, 8, 5], [1, 8, 9, 6, 3, 8, 2, 4, 2, 0, 4], [7, 7, 2, 1, 4, 9, 6, 8, 11, 11, 1], [11, 1, 5, 4, 1, 2, 1, 9, 7, 2, 3], [8, 10, 7, 1, 9, 5, 4, 6, 1, 10, 5], [2, 11, 1, 9, 2, 4, 8, 5, 6, 4, 6]],
  ]
};

(async () => {
  let code = `⋄
    ∇ res ← solver m;b;g;m1;m2;nbor;primes
      nbor ← {⍺×⍵∨(0 1↓⍵,0)∨(1↓⍵⍪0)∨(0 ¯1↓0,⍵)∨¯1↓0⍪⍵}
      primes ← 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47↑⍨≢m
      g ← ⊃⊂∨.=⊂⌽⍨¨⍳∘(1-⍨≢)
      m1 ← primes×⍤¯1⊢m×g m
      m2 ← primes×⍤1⊢m×⍉g⍉m
      b ← ⊃,/{((1,2≠/⊢)∘{⍵[⍋⍵]}⊂((⍸0≠⍵)⌷⍨∘⊂⍋))0~⍨,⍵}¨m1 m2
      b ← {⍵∘~¨⊂¨⍵}¨b
      res ← {⊃z⊣{z⊢←{⍵/⍨check¨⍵},z∘.{0@⍵⊢⍺}⍵}¨⍵⊣z←⊂m}b
    ∇`;
  code += `⋄
    ∇ z←check x;T
      z←0=+/,(x⍷⍨⍪0 0)∨0 0⍷x ⍝ no 2x1 black islands
      z∧←{⍵≡⍵∘nbor⍣≡⊢1@(⊂⊃⍸⍵)⊢0⍴⍨⍴x}x≠0 ⍝ all blacks must be connected
    ∇`

  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify(['', 0, '', code]),
  });
  [state, size, hash] = (await res.json()).slice(0, -1);
  [...document.querySelectorAll('.btns__solve, .btns__create, .btns__try')]
    .map(x => x.disabled = false)
})();

document.querySelector('.btns__solve').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value)
    )

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  JSON.parse(await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`))
    .map((item, i) => {
      const row = document.createElement('tr');
      item.map((x, j) => {
        const cell = document.createElement('input');
        cell.readOnly = true;
        cell.style.outline = 'none';
        if (x) cell.placeholder = x;
        else {
          cell.placeholder = input[i][j];
          cell.style.border = 'none';
          cell.style.backgroundColor = '#4169e1';
        }
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });

  session_style(2);
});

document.querySelector('.btns__create').addEventListener('click', async () => {
  session_style(1);
  const input_table = document.querySelector('.input__table');
  const width = document.querySelector('.dimension__value').value || input_table.querySelector('tr').childElementCount;

  input_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  // Fill .input__table with a random matrix from examples
  EXAMPLES[width][EXAMPLES[width].length * Math.random() | 0].map(item => {
    const row = document.createElement('tr');
    item.map(x => {
      const cell = document.createElement('input');
      cell.type = 'number';
      cell.value = x;
      row.appendChild(cell);
    })
    tbody.appendChild(row);
  });
});

document.querySelector('.btns__try').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value)
    )

  const try_label = document.querySelector('.try__label');
  try_label.innerText = 'Solve';
  try_label.style.color = '#4169e1';

  const try_table = document.querySelector('.try__table');
  try_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  try_table.appendChild(table);

  input.map(item => {
    const row = document.createElement('tr');
    item.map(x => {
      const cell = document.createElement('input');
      cell.placeholder = x;
      cell.readOnly = true;
      cell.style.outline = 'none';
      row.appendChild(cell);
    })
    tbody.appendChild(row);
  });

  [...try_table.querySelectorAll('input')].map(x =>
    x.addEventListener('click', () => {
      if (x.style.backgroundColor) {
        x.style.border = '';
        x.style.backgroundColor = '';
      } else {
        x.style.border = 'none';
        x.style.backgroundColor = '#4169e1';
      }
    })
  );

  document.querySelector('.btns__verify').disabled = false;

  session_style(3);
});

document.querySelector('.btns__verify').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value)
    );

  const solution = JSON.parse(await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`));

  const try_matrix = [...document.querySelectorAll('.try__table tr')]
    .map((item, i) => [...item.querySelectorAll('input')]
      .map((x, j) => (x.style.backgroundColor) ? 0 : input[i][j])
    );

  const try_label = document.querySelector('.try__label');
  const try_table_input = [...document.querySelectorAll('.try__table input')];

  if (JSON.stringify(solution) === JSON.stringify(try_matrix)) {
    try_label.innerText = 'Correct!';
    try_label.style.color = '#008000';
    try_table_input.map(elem => elem.style.pointerEvents = 'none');
    document.querySelector('.btns__verify').disabled = true;
  } else {
    try_label.innerText = 'Wrong!';
    try_label.style.color = '#e62020';

    try_table_input.map(elem => {
      elem.addEventListener('click', () => {
        try_label.innerText = 'Try again!';
        try_label.style.color = '#4169e1';

        if (try_label.innerText === 'Correct!') this.removeEventListener('click', arguments.callee, false);
      })
    })
  }
});
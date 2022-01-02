// Game propriety
const MIN_WIDTH = 10;
const MAX_WIDTH = 13;
const EXAMPLES = {
  10: [
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1, 1, 1, 0], [1, 0, 0, 1, 1, 0, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]],
  ],
  11: [
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1], [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1]],
  ],
  12: [
    [[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]],
    [[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0], [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]],
  ],
  13: [
    [[0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0]],
  ]
};

(async () => {
  let code = `⋄
    ∇ z←y f m;l;n;pi;v;pl;na;b;ok;ls
      pl←⍸0=m
      pi←1↑pl
      ls←{⍵/⍨~1∊¨×⍵}pi-cows,⊂1+,⍨dim
      :If 0≠≢ls
          l←{(⊃⍵)+⍳|-/⍵}{⍵[2⍴⍋⍵]}⌈/¨|ls
          l←{⍵/⍨∧/¨dim≥¯1+pi+⍵}l
          na←{pi+¯1+⍳,⍨⍵}¨l
          ok←{⍵/⍨~1∊¨(⊂0≠m)∧⍵}{⍵∊⍨⍳,⍨dim}¨na
          z←(⊂m)+y×ok
      :EndIf
    ∇`
  code += `⋄
    ∇ sol←solver mat;cows;t;dim
      dim←≢mat
      sol←⊃{⍵/⍨~0∊¨⍵}⊃{⊃,/⍺ f¨⍵}/(⌽⍳⍴cows←⍸mat),⊂⊂(0⍴⍨⍴)mat
      ∇`;

  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify(['', 0, '', code]),
  });
  [state, size, hash] = (await res.json()).slice(0, -1);

  [...document.querySelectorAll('.btns__solve, .btns__create , .btns__try')]
    .map(x => x.disabled = false);
})();

document.querySelector('.btns__solve').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value)
    );

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
        if (input[i][j]) {
          cell.value = x;
          cell.style.color = '#4169e1';
        } else cell.placeholder = x;
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
      cell.setAttribute('onclick', 'select()');
      cell.value = x;
      row.appendChild(cell);
    })
    tbody.appendChild(row);
  });
});

document.querySelector('.btns__try').addEventListener('click', async () => {
  debugger
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value)
    );

  // TODO Check if the puzzle has (one) solution
  const try_label = document.querySelector('.try h2');
  try_label.innerText = 'Solve';
  try_label.style.color = '#4169e1';

  const try_table = document.querySelector('.try__table');
  try_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  try_table.appendChild(table);

  input.map((item, i) => {
    const row = document.createElement('tr');
    item.map((x, j) => {
      const cell = document.createElement('input');
      cell.placeholder = x;
      cell.setAttribute('onclick', 'select()');
      if (input[i][j]) cell.style.color = '#4169e1';
      row.appendChild(cell);
    })
    tbody.appendChild(row);
  });

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
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value)
    );

  const try_label = document.querySelector('.try h2');
  const try_table_input = document.querySelectorAll('.try__table input');
  debugger
  if ((JSON.stringify(solution) === JSON.stringify(try_matrix))) {
    try_label.innerText = 'Correct!';
    try_label.style.color = '#008000';
    try_table_input.forEach(elem => elem.readOnly = true);
    document.querySelector('.btns__verify').disabled = true;
  } else {
    try_label.innerText = 'Wrong!';
    try_label.style.color = '#e62020';

    try_table_input.forEach(elem => {
      elem.addEventListener('click', () => {
        try_label.innerText = 'Try again!';
        try_label.style.color = '#4169e1';

        if (try_label.innerText === 'Correct!') this.removeEventListener('click', arguments.callee, false);
      })
    })
  }
});
// Game propriety
const MIN_WIDTH = 4;
const MAX_WIDTH = 8;
const EXAMPLES = {
  4: [
    [[3, 9, -1, 9], [9, 9, 9, 9], [0, 9, 9, 0], [-2, 9, 0, 9]],
  ],
  5: [
    [[9, 9, 9, 2, 9], [2, 2, -1, 1, 1], [9, 9, 9, 9, 9], [9, 9, -3, 2, 2], [-3, 9, 9, 9, 9]],
  ],
  6: [
    [[9, 9, 0, 9, -2, 9], [-1, 9, -2, 9, -2, 9], [9, 9, 2, 9, 2, 9], [-3, 9, 1, 9, 3, 9], [9, 9, 9, 9, 9, 9], [9, -3, 9, -1, 9, -1]],
    [[9, 9, 0, 9, 9, 0], [-1, 9, -2, 9, 0, 9], [9, 9, -2, 9, -4, 9], [9, 9, -2, 9, -4, 9], [1, 9, 0, 9, -2, 9], [9, 9, 0, 9, 9, -2]],
  ],
  7: [
    [[1, 9, 0, 9, -3, 9, -3], [1, 0, 9, 9, 9, 9, 9], [9, 9, 1, 9, 0, 9, 1], [3, 9, 9, 9, 9, 9, 9], [9, 9, 4, 9, 6, 9, 1], [-1, 9, 9, 9, 9, 9, 9], [9, 9, -3, 9, 3, 9, 1]],
  ],
  8: [
    [[-3, 9, 9, 9, 0, 9, -2, 9], [9, 9, -6, 9, 0, 9, 0, 9], [-4, 9, 9, 9, -3, 9, -2, 9], [9, -2, -4, -3, 0, 9, 0, 9], [9, 9, 9, 9, 9, 9, -4, 9], [9, 3, 2, 2, 1, 9, -2, 9], [9, 9, 9, 9, 9, 9, -1, 9], [-1, 9, 1, 9, 9, 2, 9, 2]],
    [[0, 9, 1, -1, 9, 9, 9, 0], [9, 2, 9, 9, 4, 2, 1, 9], [9, 9, 9, 9, 9, 9, 9, -2], [3, 9, 3, 2, 3, 4, 9, 9], [9, 9, 9, 9, 9, 1, 9, 1], [2, 9, 9, 1, 9, 0, 9, 9], [9, 3, 9, 2, 9, -2, 9, -2], [0, 9, -1, 9, 9, 9, -3, 9]],
  ],
};

(async () => {
  let code = `⋄
    pmat ← {{,[⍳2]↑(⊂⊂⎕IO,1+⍵)⌷¨⍒¨↓∘.=⍨⍳1+1↓⍴⍵}⍣⍵⍉⍪⍬}`;
  code += `⋄
    ∇ z ← y f x;near;n;s;sum
      z ← ⍬
      near ← ({1↓↓⍵⌿⍨∧/⍵∊⍳≢mat}y+⍤1⊢↑,∘.,⍨0 1 ¯1)~⍸0≠x+9≠mat
      n ← ≢near
      s ← y⌷mat-{+/,⍵}⌺3 3⊢x
      :If ~((0=n)∧0≠s)∨(≠/2|n s)∨n<|s
        sum ← {1 ¯1/⍨⍵⊃⍨⍸s=-/¨⍵}(⌽,¨⊢)0,⍳n
        z ,← {⍵@near⊢x}¨↓∪sum[pmat n]
      :EndIf
      ∇`;
  code += `⋄
    solver ← {⊃⊃{⊃,/⍺∘f¨⍵}/(⍸9≠⍵),(⊂∘⊂0⍴⍨⍴)⍵⊣mat←⍵}`;
  code += `⋄
    format ← {'- +'[2+⍵]}`;

  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify(['', 0, '', code]),
  });
  [state, size, hash] = (await res.json()).slice(0, -1);
  [...document.querySelectorAll('.btns__solve, .btns__create, .btns__try')]
    .map(x => x.disabled = false)
})();

// document.querySelectorAll('.input__table input, .try__table input').forEach((elem) => {
//   elem.addEventListener('onKeyDown', (e) => {
//     const key = e.keyCode || e.which;
//     if (key !== 43 && key !== 45) {
//       if (e.preventDefault) e.preventDefault();
//       e.returnValue = false;
//     }
//   })
// })

// function inputValidate() {
//   var e = event || window.event;
//   var key = e.keyCode || e.which;
//   if (((key >= 48) && (key <= 57)) || (key == 8) || (key == 46)) { //allow backspace //and deconste
//     if (e.preventDefault) e.preventDefault();
//     e.returnValue = false;
//   }
// }

document.querySelector('.btns__solve').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => (x.value === '') ? 9 : +x.value)
    )

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  // Create .output__table from filled with the solution
  (await executeAPL(`format solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`))
    .map((item, i) => {
      const row = document.createElement('tr');
      item.split``.map((x, j) => {
        const cell = document.createElement('input');
        cell.readOnly = true;
        if (x === ' ') cell.placeholder = input[i][j];
        else {
          cell.placeholder = x;
          cell.style.color = '#4169e1';
        }
        row.appendChild(cell);
      })
      tbody.appendChild(row);
    });

  [...document.querySelectorAll('.input__table input')]
    .map(x => x.addEventListener('click', () => session_style(1)));

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
      cell.value = (x === 9) ? '' : x;
      row.appendChild(cell);
    })
    tbody.appendChild(row);
  });
});

document.querySelector('.btns__try').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => (x.value === '') ? '' : +x.value)
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
      cell.type = 'number';
      cell.setAttribute('onclick', 'select()');
      cell.placeholder = x;
      if (x === '') cell.style.color = '#4169e1';
      else cell.readOnly = true;
      row.appendChild(cell);
    })
    tbody.appendChild(row);
  });

  [...document.querySelectorAll('.input__table input')]
    .map(x => x.addEventListener('input', () => session_style(1)));

  document.querySelector('.btns__verify').disabled = false;

  session_style(3);
});

document.querySelector('.btns__verify').addEventListener('click', async () => {
  // TODO: User can input +-
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => (x.value === '') ? 9 : +x.value)
    )
  const solution = JSON.parse(await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`));

  const try_matrix = [...document.querySelectorAll('.try__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value || 0)
    );

  debugger
  const try_label = document.querySelector('.try__label');
  const try_table_input = [...document.querySelectorAll('.try__table input')];

  if ((JSON.stringify(solution) === JSON.stringify(try_matrix))) {
    try_label.innerText = 'Correct!';
    try_label.style.color = '#008000';
    try_table_input.map(elem => {
      elem.removeAttribute('onclick');
      elem.readOnly = true
    });
    document.querySelector('.btns__verify').disabled = true;
  } else {
    try_label.innerText = 'Wrong!';
    try_label.style.color = '#e62020';

    try_table_input.map(elem =>
      elem.addEventListener('click', () => {
        try_label.innerText = 'Try again!';
        try_label.style.color = '#4169e1';

        if (try_label.innerText === 'Correct!') this.removeEventListener('click', arguments.callee, false);
      })
    )
  }
});
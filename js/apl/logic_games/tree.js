// Game propriety
const MIN_WIDTH = 5;
const MAX_WIDTH = 8;
const EXAMPLES = {
  7: [
    [[1, 1, 1, 1, 1, 2, 2], [1, 1, 1, 3, 3, 2, 2], [5, 5, 4, 3, 3, 3, 2], [5, 5, 4, 6, 6, 6, 2], [5, 5, 6, 6, 6, 6, 6], [7, 7, 7, 6, 6, 6, 6], [7, 7, 7, 6, 6, 6, 6]],
    [[1, 2, 2, 5, 3, 3, 3], [1, 4, 5, 5, 3, 3, 3], [4, 4, 5, 5, 5, 3, 3], [4, 4, 5, 5, 6, 6, 6], [4, 4, 7, 7, 6, 6, 6], [7, 7, 7, 7, 7, 6, 6], [7, 7, 7, 7, 7, 7, 7]],
    [[1, 1, 2, 2, 2, 2, 7], [1, 1, 2, 2, 2, 2, 7], [3, 3, 4, 5, 5, 7, 7], [4, 4, 4, 5, 5, 7, 7], [6, 6, 6, 5, 5, 7, 7], [6, 6, 6, 6, 7, 7, 7], [6, 6, 6, 6, 7, 7, 7]],
  ],
  8: [
    [[1, 1, 1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2, 2, 8], [2, 2, 2, 2, 2, 2, 2, 8], [3, 3, 2, 2, 2, 2, 8, 8], [3, 3, 3, 6, 6, 6, 8, 8], [4, 4, 5, 6, 6, 6, 8, 8], [5, 5, 5, 6, 6, 6, 8, 8], [7, 7, 7, 7, 7, 8, 8, 8]],
    [[1, 1, 1, 1, 2, 2, 2, 2], [5, 3, 3, 4, 4, 2, 2, 2], [5, 5, 4, 4, 4, 4, 2, 2], [5, 5, 6, 6, 6, 6, 2, 8], [5, 6, 6, 6, 6, 6, 6, 8], [5, 7, 7, 7, 7, 7, 8, 8], [7, 7, 7, 7, 7, 7, 8, 8], [7, 7, 7, 7, 7, 8, 8, 8]],
    [[3, 2, 1, 1, 1, 1, 1, 1], [3, 2, 2, 1, 1, 1, 1, 4], [3, 2, 2, 2, 1, 1, 4, 4], [3, 3, 3, 6, 1, 4, 4, 4], [3, 5, 5, 6, 6, 4, 4, 4], [5, 5, 5, 6, 6, 6, 4, 4], [7, 5, 8, 6, 6, 6, 6, 4], [7, 8, 8, 8, 8, 8, 8, 4]],
  ],
};

(async () => {
  let code = `⋄
    cmat ← {⊖⊃⍪/{k,¨⍪\\1+⍵}⍣⍺⊢(⊂⍉⍪⍬),d⍴⊂0 0⍴k←⌽⍳1+d←⍵-⍺}`;
  code += `⋄
    ∇ res ← f x;adj;area;cr;vec;y
      y ← {(⊂⊃⍋⊢∘≢⌸0~⍨⍵)⌷∪⍵}0~⍨,m×0=x
      res ← ⍬
      :If n≤≢vec ← ⍸(0≤x)∧y=m
          vec ← ↓vec[n cmat≢vec]
          res ← {1@⍵⊢x}¨vec
          res ← res/⍨vec check¨res
          adj ← {×⍵-⊃∨/(~5∊⍨⍳9)/,¯1 ¯1∘↓¨1 1∘↓¨¯1 0 1∘.⊖¯1 0 1⌽¨⊂0,0⍪0,⍨0⍪⍨1=⍵}¨res
          cr ← {(⊢-⊢<(n≤+/)∘.∨n≤+⌿)1=⍵}¨res
          area ← ⊂m=y
          res ← (⊢-(area∧0∘=))adj⌊cr
      :EndIf
    ∇`;
  code += `⋄
    ∇ ctrl ← pos check mat;ctrl
      mat >← 0
      ctrl ← ∧/n≥+/mat
      ctrl ∧← ∧/n≥+⌿mat
      :If n=2
          ctrl >← (0 1)(1 1)(1 0)∊⍨|-/pos
      :EndIf
    ∇`;
  code += `⋄
    ∇ sol ← solver m
      n ← 1+8<≢m
      sol ← 1=⊃{⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,m)⊢(⊂0⍴⍨⍴)m
      ∇`;
  code += `⋄
    ∇ mat ← createTree x
      mat ← x x⍴(⍳x)@(⍳⍤⍴∊x?⍴)⊢{0}¨⍳×⍨x
      mat ← {⍵+(⍵=0)×{⌈/⍵/⍨9⍴0 1}¨3⍪⌿3,/0⍪⍨0,⍨0⍪0,⍵}⍣≡mat
    ∇`;
  code += `⋄
    creator ← {(createTree∘≢) {⍵⍵ ⍵:⍵ ⋄ ∇⍺⍺ ⍵} (((1=≢)∧(∧/1∘∊¨))∘{n←1+8<≢m←⍵ ⋄ {⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,⍵)⊢(⊂0⍴⍨⍴)⍵}) ⊢0⍴⍨⍵ ⍵}`
  // code += `⋄
  //   creator ← {mat⊣{mat⊢←createTree≢⍵}⍣{1∊solver mat}⊢mat←⍵ ⍵⍴⍬}`;

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
        if (x) {
          cell.value = input[i][j];
          cell.style.color = '#4169e1';
        } else cell.placeholder = input[i][j];
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });

  session_style(2);
});

document.querySelector('.btns__create').addEventListener('click', async () => {
  // !Check if there's only one possible solution
  session_style(1);

  const input_table = document.querySelector('.input__table');
  const width = document.querySelector('.dimension__value').value || input_table.querySelector('tr').childElementCount;

  if (width <= 6) {
    const matrix = await executeAPL(`creator ${width}`);
    input_table.innerHTML = '';

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    input_table.appendChild(table);

    matrix.map(item => {
      const row = document.createElement('tr');
      item.split` `.map(x => {
        const cell = document.createElement('input');
        cell.type = 'number';
        cell.value = x;
        row.appendChild(cell);
      })
      tbody.appendChild(row);
    });
  } else if (width === 7 && confirm(`The creator may take up to 5s to create a Tree of this dimensions.\nDo you want to continue anyway (otherwise it'll be outputted a precreated Tree)?`)) {
    const matrix = await executeAPL(`creator ${width}`);
    input_table.innerHTML = '';

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    input_table.appendChild(table);

    matrix.map(item => {
      const row = document.createElement('tr');
      item.split` `.map(x => {
        const cell = document.createElement('input');
        cell.type = 'number';
        cell.value = x;
        row.appendChild(cell);
      })
      tbody.appendChild(row);
    });
  } else {
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
  }
});

document.querySelector('.btns__try').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(item => [...item.querySelectorAll('input')]
      .map(x => +x.value)
    );

  // TODO Check if the puzzle has (one) solution
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
      if (x.style.color) {
        x.style.color = '';
        x.value = '';
      } else {
        x.style.color = '#4169e1';
        x.value = x.placeholder;
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
    .map(item => [...item.querySelectorAll('input')]
      .map(x => (x.value) ? 1 : 0)
    );

  const try_label = document.querySelector('.try__label');
  const try_table_input = document.querySelectorAll('.try__table input');

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
// Game propriety
const MIN_WIDTH = 4;
const MAX_WIDTH = 8;
const EXAMPLES = {
  4: [
    ['3 9 -1 9', '9 9 9 9', '0 9 9 0', '-2 9 0 9'],
  ],
  5: [
    ['9 9 9 2 9', '2 2 -1 1 1', '9 9 9 9 9', '9 9 -3 2 2', '-3 9 9 9 9'],
  ],
  6: [
    ['9 9 0 9 -2 9', '-1 9 -2 9 -2 9', '9 9 2 9 2 9', '-3 9 1 9 3 9', '9 9 9 9 9 9', '9 -3 9 -1 9 -1'],
    ['9 9 0 9 9 0', '-1 9 -2 9 0 9', '9 9 -2 9 -4 9', '9 9 -2 9 -4 9', '1 9 0 9 -2 9', '9 9 0 9 9 -2'],
  ],
  7: [
    ['1 9 0 9 -3 9 -3', '1 0 9 9 9 9 9', '9 9 1 9 0 9 1', '3 9 9 9 9 9 9', '9 9 4 9 6 9 1', '-1 9 9 9 9 9 9', '9 9 -3 9 3 9 1'],
  ],
  8: [
    ['-3 9 9 9 0 9 -2 9', '9 9 -6 9 0 9 0 9', '-4 9 9 9 -3 9 -2 9', '9 -2 -4 -3 0 9 0 9', '9 9 9 9 9 9 -4 9', '9 3 2 2 1 9 -2 9', '9 9 9 9 9 9 -1 9', '-1 9 1 9 9 2 9 2'],
    ['0 9 1 -1 9 9 9 0', '9 2 9 9 4 2 1 9', '9 9 9 9 9 9 9 -2', '3 9 3 2 3 4 9 9', '9 9 9 9 9 1 9 1', '2 9 9 1 9 0 9 9', '9 3 9 2 9 -2 9 -2', '0 9 -1 9 9 9 -3 9'],
  ],
};

(async () => {
  let code = `⎕RL←⍬2`;
  code += `⋄
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

  input_btns.map(elem => elem.disabled = false);
})();

document.querySelector('.btns__solve').addEventListener('click', async () => {
  input_btns.map(elem => elem.disabled = true);

  const input = [...document.querySelectorAll('.input__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => (elem.value === '') ? 9 : +elem.value)
    );

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  // Create .output__table from filled with the solution
  (await executeAPL(`format solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`))
    .map((item, i) => {
      const tr = document.createElement('tr');
      item.split``.map((x, j) => {
        const elem = document.createElement('input');
        elem.readOnly = true;
        if (x === ' ') elem.placeholder = input[i][j];
        else {
          elem.placeholder = x;
          elem.style.color = '#4169e1';
        }
        tr.appendChild(elem);
      })
      tbody.appendChild(tr);
    });

  input_btns.map(elem => elem.disabled = false);
  session_style(2);
});

document.querySelector('.btns__create').addEventListener('click', async () => {
  session_style(1);
  input_btns.map(elem => elem.disabled = true);

  const input_table = document.querySelector('.input__table');
  const width = document.querySelector('.dimension__value').value || input_table.querySelector('tr').childElementCount;

  input_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  EXAMPLES[width][EXAMPLES[width].length * Math.random() | 0].map(item => {
    const tr = document.createElement('tr');
    item.split` `.map(x => {
      const elem = document.createElement('input');
      elem.type = 'number';
      elem.setAttribute('onclick', 'select()');
      elem.value = (x === '9') ? '' : x;
      tr.appendChild(elem);
    })
    tbody.appendChild(tr);
  });

  input_btns.map(elem => elem.disabled = false);
});

document.querySelector('.btns__try').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => (elem.value === '') ? 9 : +elem.value)
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

  input.map(item => {
    const tr = document.createElement('tr');

    item.map(x => {
      const elem = document.createElement('input');

      elem.readOnly = true;
      if (x === 9) elem.style.color = '#4169e1';
      else {
        elem.style.pointerEvents = 'none';
        elem.placeholder = x
      };

      elem.addEventListener('click', function f() {
        const btn_mode = document.querySelector('.btns__mode').innerText;
        if (try_label.innerText === 'Correct!') elem.removeEventListener('click', f);
        else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }

          elem.value = (elem.value === btn_mode) ? '' : btn_mode;
        }
      });

      tr.appendChild(elem);
    });

    tbody.appendChild(tr);
  });

  document.querySelector('.btns__verify').disabled = false;
  document.querySelector('.btns__mode').style.color = '#4169e1';
  document.querySelector('.btns__mode').innerText = '+';

  session_style(3);
});

document.querySelector('.btns__verify').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => (elem.value === '') ? 9 : +elem.value)
    );

  const solution = JSON.parse(
    await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`)
  );

  // TODO: User can input +-
  const try_matrix = [...document.querySelectorAll('.try__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => (elem.value === '') ? 0 : (elem.value === '+') ? 1 : -1)
    )

  const try_label = document.querySelector('.try h2');
  const try_table_input = [...document.querySelectorAll('.try__table input')];

  if ((JSON.stringify(solution) === JSON.stringify(try_matrix))) {
    try_label.style.color = '#080';
    try_label.innerText = 'Correct!';

    document.querySelector('.btns__verify').disabled = true;
  } else {
    try_label.style.color = '#e62020';
    try_label.innerText = 'Wrong!';
  }
});

document.querySelector('.btns__mode').addEventListener('click', function f(elem) {
  if (document.querySelector('.try h2').innerText === 'Correct!') elem.removeEventListener('click', f);
  elem.target.innerText =
    (elem.target.innerText === '+') ? '-' : '+';
});
// Game propriety
const MIN_WIDTH = 10;
const MAX_WIDTH = 13;
const EXAMPLES = {
  10: [
    ['0 0 0 0 0 0 0 0 0 1', '0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 0 0 1', '0 0 0 1 0 0 1 0 0 0', '0 0 0 1 0 0 0 0 0 0', '0 0 0 0 0 0 0 1 1 0', '1 0 0 0 0 0 1 1 1 0', '1 0 0 1 1 0 0 1 0 0', '0 0 0 1 0 0 0 0 0 0', '0 0 0 0 0 0 0 0 1 0']
  ],
  11: [
    ['0 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 0 0 0 0', '1 0 0 0 0 1 0 0 0 0 0', '0 0 0 0 1 0 0 0 1 0 0', '0 1 0 0 0 0 0 1 0 0 0', '0 0 0 0 0 0 0 0 0 1 0', '0 0 0 0 0 0 0 0 1 0 0', '0 0 0 0 0 1 1 0 1 0 1', '0 0 1 0 0 1 1 1 0 0 0', '0 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 1 0 0 1'],
  ],
  12: [
    ['1 0 0 0 1 0 0 0 0 0 1 0', '0 0 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 0 0 0 0 0', '1 0 1 1 1 1 0 0 0 0 0 0', '0 1 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 1 0 1 1 0 0', '0 0 0 0 0 0 0 0 1 0 0 0', '0 0 0 0 0 0 1 0 0 0 0 0', '1 0 0 0 1 0 1 1 1 1 0 0', '0 0 0 0 1 1 0 1 0 0 0 0', '0 0 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 1 0 0 0 0 1 0 0'],
    ['0 0 0 0 1 0 0 0 0 0 0 1', '0 0 0 0 0 0 0 0 1 0 0 0', '0 0 0 1 0 0 0 0 1 0 0 0', '0 0 0 0 0 0 0 0 0 0 0 0', '0 0 0 1 0 0 0 0 0 1 0 0', '0 0 0 0 1 0 0 1 0 0 0 0', '0 0 0 0 0 1 0 0 0 0 0 1', '0 0 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 0 0 1 0 0', '1 0 0 1 1 0 0 0 1 0 1 0', '0 1 0 1 0 0 0 0 0 0 1 0', '0 0 0 0 0 0 0 0 0 0 0 0'],
    ['1 0 0 0 0 0 0 1 0 0 0 0', '0 0 0 0 0 0 0 0 0 0 1 0', '0 0 0 0 0 1 0 0 0 0 1 0', '0 0 0 0 0 0 0 0 0 1 0 0', '0 0 0 0 0 0 0 1 0 1 0 0', '1 0 1 0 1 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 1 0 0 0 0', '1 0 0 0 1 1 0 0 0 1 1 0', '0 0 0 0 0 0 0 1 0 1 0 0', '0 0 0 0 0 0 0 1 1 0 0 1', '0 0 0 0 0 0 0 0 1 0 0 0', '1 0 0 1 0 0 0 0 0 0 0 0']
  ],
  13: [
    ['0 0 0 0 0 0 0 1 0 1 0 0 0', '0 0 0 0 0 0 0 0 0 0 0 1 0', '1 0 0 0 0 0 0 0 1 0 0 0 0', '0 0 0 0 1 0 0 0 0 1 0 0 1', '1 0 0 0 0 0 0 0 0 0 1 0 1', '0 0 0 1 0 0 0 0 0 0 1 0 0', '0 0 1 0 0 0 0 0 1 0 0 0 0', '0 1 1 0 0 0 0 1 0 0 1 0 0', '0 0 1 0 0 0 1 0 0 0 0 0 0', '0 0 0 0 0 0 1 0 0 0 1 1 0', '0 0 0 1 0 0 1 1 0 0 0 0 0', '0 0 0 0 0 0 0 0 0 0 1 0 1', '0 1 0 1 1 0 1 0 0 0 0 0 0'],
  ]
};

(async () => {
  let code = `⎕RL←⍬2`;
  code += `⋄
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

  [...document.querySelectorAll('.input__table input')]
    .map(elem => {
      elem.readOnly = true;
      elem.addEventListener('click', () => elem.value = (elem.value) ? '' : 1)
    });

  input_btns.map(elem => elem.disabled = false);
})();

document.querySelector('.btns__solve').addEventListener('click', async () => {
  input_btns.map(elem => elem.disabled = true);

  const input = [...document.querySelectorAll('.input__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => (elem.value === '') ? 0 : +elem.value)
    );

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  JSON.parse(await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`))
    .map((item, i) => {
      const tr = document.createElement('tr');
      item.map((x, j) => {
        const elem = document.createElement('input');
        elem.readOnly = true;
        if (input[i][j]) {
          elem.value = x;
          elem.style.color = '#4169e1';
        } else elem.placeholder = x;
        tr.appendChild(elem);
      });
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

      elem.readOnly = true;
      elem.addEventListener('click', () => elem.value = (elem.value) ? '' : 1)
      elem.value = (+x) ? x : '';

      tr.appendChild(elem);
    })
    tbody.appendChild(tr);
  });

  input_btns.map(elem => elem.disabled = false);
});

document.querySelector('.btns__try').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => +elem.value)
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

  input.map(item => {
    const tr = document.createElement('tr');
    item.map(x => {
      const elem = document.createElement('input');

      elem.readOnly = true;
      if (x) {
        elem.style.color = '#4169e1'
        elem.placeholder = x;
      }

      elem.addEventListener('click', function f() {
        const btn_mode = document.querySelector('.btns__mode').value;
        if (try_label.innerText === 'Correct!') elem.removeEventListener('click', f);
        else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }

          elem.value = (elem.style.color === '#4169e1') ? '' : (elem.value === btn_mode)
            ? '' : btn_mode;
        }
      });

      tr.appendChild(elem);
    })
    tbody.appendChild(tr);
  });

  document.querySelector('.btns__verify').disabled = false;
  document.querySelector('.btns__mode').style.backgroundColor = '#4169e1';
  document.querySelector('.btns__mode').value = 1;

  session_style(3);
});

document.querySelector('.btns__verify').addEventListener('click', async () => {
  const input = [...document.querySelectorAll('.input__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => (elem.value === '') ? 0 : +elem.value)
    );

  const solution = JSON.parse(
    await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(input)}'`)
  );

  const try_matrix = [...document.querySelectorAll('.try__table tr')]
    .map(row => [...row.querySelectorAll('input')]
      .map(elem => +elem.value)
    );

  const try_label = document.querySelector('.try h2');
  const try_table_input = [...document.querySelectorAll('.try__table input')];

  if ((JSON.stringify(solution) === JSON.stringify(try_matrix))) {
    try_label.style.color = '#080';
    try_label.innerText = 'Correct!';


    document.querySelector('.btns__mode').disabled = true;
    document.querySelector('.btns__verify').disabled = true;
  } else {
    try_label.style.color = '#e62020';
    try_label.innerText = 'Wrong!';

    elem.addEventListener('click', elem => {
      if (try_label.innerText === 'Correct!') elem.removeEventListener('click', arguments.callee);

      try_label.innerText = 'Try again!';
      try_label.style.color = '#4169e1';
    })
  }
});
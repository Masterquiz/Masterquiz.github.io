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
  code += `⋄
    format ← {(1⍪2≠⌿⍵)+(2,2×2≠/⍵)}`;
  code += `⋄
    reverse_format ← {
      (x y) ← ⍵
      pos ← ⍳⍴x
      x ← ⊃,/pos⊂¨⍨⍥↓x
      y ← ⊃,/(⍉y)⊂¨⍥↓⌽¨pos
      b ← ∪{⊃,/y/⍨⍵}¨↓∨/¨x∘.∊y
      vec ← ∪{⊃⍵/⍨(⊢∊⌈/)≢¨⍵}¨b∘{⍺/⍨⍵}¨↓∨/¨∘.∊⍨b
      ⊃(⍳≢vec)+.×vec∊⍨¨⊂pos
    }`;

  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify(['', 0, '', code]),
  });
  [state, size, hash] = (await res.json()).slice(0, -1);

  input_btns.map(btn => btn.disabled = false);
})();

function transpose(matrix) {
  return matrix.reduce(
    ($, row) => row.map((_, i) =>
      [...($[i] || []), row[i]]
    ), []
  )
}

// Change default td's setting
document.querySelector('.dimension__button').addEventListener('click', () => {
  [...document.querySelectorAll('.input__table td')]
    .map(td => {
      td.contentEditable = false;
      td.addEventListener('click', () => td.innerText = (+td.innerText) ? '' : '🐄');
    });
});

document.querySelector('.btns__solve').addEventListener('click', async () => {
  input_btns.map(btn => btn.disabled = true);

  const matrix = [...document.querySelectorAll('.input__table tr')]
    .map(tr => [...tr.querySelectorAll('td')]
      .map(td => (td.innerText === '') ? 0 : 1)
    );

  const output_table = document.querySelector('.output__table');
  output_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  output_table.appendChild(table);

  JSON.parse(await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) format solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`))
    .map((item, i) => {
      const tr = document.createElement('tr');
      item.map((x, j) => {
        const td = document.createElement('td');

        td.contentEditable = false;
        if (x & 1) td.style.borderTop = "2px solid #000";
        if (x & 2) td.style.borderLeft = "2px solid #000";

        if (matrix[i][j]) {
          td.innerText = '🐄';
          td.style.color = '#4169e1'
        }

        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

  input_btns.map(btn => btn.disabled = false);
  session_style(2);
});

document.querySelector('.btns__create').addEventListener('click', async () => {
  session_style(1);
  input_btns.map(btn => btn.disabled = true);

  const input_table = document.querySelector('.input__table');
  const width = document.querySelector('.dimension__value').value || input_table.querySelector('tr').childElementCount;

  input_table.innerHTML = '';

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  EXAMPLES[width][EXAMPLES[width].length * Math.random() | 0].map(y => {
    const tr = document.createElement('tr');
    y.split` `.map(x => {
      const td = document.createElement('td');

      td.contentEditable = false;
      td.addEventListener('click', () => td.innerText = (td.innerText) ? '' : '🐄')
      td.innerText = (+x) ? '🐄' : '';

      tr.appendChild(td);
    })
    tbody.appendChild(tr);
  });

  input_btns.map(btn => btn.disabled = false);
});

document.querySelector('.btns__try').addEventListener('click', () => {
  const matrix = [...document.querySelectorAll('.input__table tr')]
    .map(tr => [...tr.querySelectorAll('td')]
      .map(td => (td.innerText === '') ? 0 : 1)
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

  matrix.map(y => {
    const tr = document.createElement('tr');
    y.map(x => {
      const td = document.createElement('td');

      td.contentEditable = false;
      if (x) {
        td.style.color = '#4169e1'
        td.innerText = '🐄';
      }

      td.addEventListener('click', function f(e) {
        if (try_label.innerText === 'Correct!') td.removeEventListener('click', f);
        else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }

          if (e.offsetX < 2 && j > 0) {
            if (td.style.borderLeft === "2px solid rgb(0, 0, 0)") td.style.borderLeft = "1px solid #20202055";
            else td.style.borderLeft = "2px solid #000";
          } else if (e.offsetY <= 2 && i > 0) {
            if (td.style.borderTop === "2px solid rgb(0, 0, 0)") td.style.borderTop = "1px solid #20202055";
            else td.style.borderTop = "2px solid #000";
          }
        }
      });

      tr.appendChild(td);
    })
    tbody.appendChild(tr);
  });

  document.querySelector('.btns__verify').disabled = false;

  session_style(3);
});

document.querySelector('.btns__verify').addEventListener('click', async () => {
  const matrix = [...document.querySelectorAll('.input__table tr')]
    .map(tr => [...tr.querySelectorAll('td')]
      .map(td => (td.innerText === '') ? 0 : 1)
    );

  const solution = JSON.parse(
    await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) solver (↑⍣≡0∘⎕JSON) '${JSON.stringify(matrix)}'`)
  );

  const rows = [...document.querySelectorAll('.try__table tr')]
    .map(tr => [...tr.querySelectorAll('td')].map(td =>
      +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-left-color'))
    ));

  const columns = transpose(
    transpose([...document.querySelectorAll('.try__table tr')].map(tr => [...tr.querySelectorAll('td')]))
      .map(tr => tr.map(td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-top-color'))))
  )

  const try_matrix = JSON.parse(
    await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) reverse_format (↑⍣≡0∘⎕JSON)¨ '${JSON.stringify(rows)}' '${JSON.stringify(columns)}'`)
  );

  const try_label = document.querySelector('.try h2');
  const try_table_input = [...document.querySelectorAll('.try__table input')];

  if ((JSON.stringify(solution) === JSON.stringify(try_matrix))) {
    try_label.style.color = '#080';
    try_label.innerText = 'Correct!';

    this.disabled = true;
  } else {
    try_label.style.color = '#e62020';
    try_label.innerText = 'Wrong!';
  }
});

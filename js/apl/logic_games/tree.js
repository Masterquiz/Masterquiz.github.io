// Game propriety
const MIN_WIDTH = 5;
const MAX_WIDTH = 15;
const EXAMPLES = {
  8: [
    ["0 0 0 0 0 0 0 0", "1 1 1 1 1 1 1 3", "0 0 0 0 0 0 0 2", "1 1 2 0 0 0 3 0", "0 0 1 3 1 1 2 0", "1 1 3 2 0 0 2 0", "1 1 0 2 0 0 2 0", "1 1 1 1 1 3 0 0"],
    ["1 0 0 0 2 0 0 0", "1 3 1 3 1 2 0 0", "0 1 3 0 0 1 2 0", "0 0 3 1 1 1 2 3", "0 3 0 0 0 0 1 2", "0 3 1 1 1 1 3 0", "1 0 0 0 0 0 2 0", "0 0 0 0 0 3 0 0"],
    ["0 2 2 0 0 0 0 0", "0 2 1 2 0 0 0 3", "0 2 0 1 2 0 3 0", "0 1 1 3 2 3 0 0", "0 3 1 2 1 2 0 0", "1 0 0 2 0 1 2 0", "1 2 3 2 0 0 1 2", "0 3 0 1 1 1 1 2"],
  ],
  10: [
    ["0 0 0 2 0 0 0 0 0 0", "0 3 2 1 2 0 0 0 0 0", "1 0 1 1 3 1 2 0 0 0", "1 2 0 3 0 3 0 0 0 3", "0 1 2 2 0 1 3 1 1 0", "0 0 1 3 1 1 3 2 0 0", "0 0 3 0 0 0 2 2 0 0", "0 3 2 0 0 0 3 1 2 3", "1 0 1 1 2 0 2 0 3 0", "0 0 0 0 3 1 0 0 2 0"],
  ]
};

(async () => {
  let code = `⎕RL←⍬2`;
  code += `⋄
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
  // code += `⋄
  //   ∇ sol ← solver m
  //     n ← 1+8<≢m
  //     sol ← 1=⊃{⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,m)⊢(⊂0⍴⍨⍴)m
  //   ∇`;
  // code += `⋄
  //   ∇ mat ← createTree x
  //     mat ← x x⍴(⍳x)@(⍳⍤⍴∊x?⍴)⊢0⍴⍨×⍨x
  //     mat ← {⍵+(0=⍵)×⌈/¨(9⍴0 1)∘/¨3⍪⌿3,/0(,∘⌽∘⍉⍣4)⍵}⍣≡mat
  //   ∇`;
  // code += `⋄
  //   creator ← {(createTree∘≢) {⍵⍵ ⍵:⍵ ⋄ ∇⍺⍺ ⍵} (((1=≢)∧(∧/1∘∊¨))∘{n←1+8<≢m←⍵ ⋄ {⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,⍵)⊢(⊂0⍴⍨⍴)⍵}) ⊢0⍴⍨⍵ ⍵}`
  code += `⋄
    solver ← {
      n←1+8<≢m←⍵
      1={⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,⍵)⊢⊂{0}¨⍵
    }`
  code += `⋄
    createTree ← {
      mat ← {(1+⌈/,⍵)@(⊂(?∘⍴⊃⊢)∘⍸¨(~+/,⍥⊂+⌿)×⍵)⊢⍵}⍣(≢⍵)⊢{0}¨⍵
      {⍵+(0=⍵)×¯1 ¯1↓1 1↓⊃⊃⌈/2 4 5 6 8⌷¨⊂,¯1 0 1∘.⊖¯1 0 1⌽¨⊂0(,∘⌽∘⍉⍣4)⍵}⍣≡mat
    }`;
  code += `⋄
    creator ← {{4::∇createTree ⍵ ⋄ n←1+8<≢m←⍵ ⋄ (1=≢∧(∧/1∘∊¨)) {⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,⍵)⊢⊂{0}¨⍵:⍵ ⋄ ∇createTree ⍵} createTree 0⍴⍨⍵ ⍵}`;
  code += `⋄format ← {(0⍪2≠⌿⍵)+(0,2×2≠/⍵)}`; // Border right and top managed with CSS by default
  // !Doesn't work
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

  input_btns.map(elem => elem.disabled = false);
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
  [...document.querySelectorAll('.input__table tr')]
    .map((tr, i) => [...tr.querySelectorAll('td')]
      .map((td, j) => {
        td.contentEditable = false;
        td.addEventListener('click', e => {
          if (e.offsetX <= 2 && j > 0) {
            if (td.style.borderLeft === "2px solid rgb(0, 0, 0)") td.style.borderLeft = "1px solid #20202055";
            else td.style.borderLeft = "2px solid #000";
          } else if (e.offsetY <= 2 && i > 0) {
            if (td.style.borderTop === "2px solid rgb(0, 0, 0)") td.style.borderTop = "1px solid #20202055";
            else td.style.borderTop = "2px solid #000";
          }
        });
      })
    );
});

document.querySelector('.btns__solve').addEventListener('click', async () => {
  try {
    input_btns.map(btn => btn.disabled = true);

    const matrix = [...document.querySelectorAll('.input__table tr')]
      .map(tr => [...tr.querySelectorAll('td')]
      );

    const rows = matrix.map(tr => tr
      .map(td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-left-color')))
    );

    const columns = transpose(
      transpose(matrix)
        .map(tr => tr.map(td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-top-color'))))
    )

    const output_table = document.querySelector('.output__table');
    output_table.innerHTML = '';

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    output_table.appendChild(table);

    JSON.parse(await executeAPL(`(1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵}) ⊃solver reverse_format (↑⍣≡0∘⎕JSON)¨ '${JSON.stringify(rows)}' '${JSON.stringify(columns)}'`))
      .map((item, i) => {
        const tr = document.createElement('tr');
        item.map((x, j) => {
          const td = document.createElement('td');

          if (columns[i][j]) td.style.borderTop = "2px solid #202020";
          if (rows[i][j]) td.style.borderLeft = "2px solid #202020";
          if (x) td.innerText = '🌳';

          td.appendChild(document.createElement('br'));
          tr.appendChild(td);
        });
        tbody.appendChild(tr);

        session_style(2);
      });
  } catch (error) {
    session_style(1);
    console.error(error);
  } finally { input_btns.map(btn => btn.disabled = false) }
});

document.querySelector('.btns__create').addEventListener('click', async () => {
  input_btns.map(btn => btn.disabled = true);
  session_style(1);

  const input_table = document.querySelector('.input__table');
  const width = document.querySelector('.dimension__value').value || input_table.querySelector('tr').childElementCount;

  if (width <= 7 || width == 9) matrix = await executeAPL(`format creator ${width}`);
  else {
    try { matrix = EXAMPLES[width][EXAMPLES[width].length * Math.random() | 0] }
    catch { alert(`Can't create a Tree with this width.\nBut you can still create one yourself!`) }
  }

  input_table.innerHTML = '';
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  input_table.appendChild(table);

  matrix.map((y, i) => {
    const tr = document.createElement('tr');
    y.split` `.map((x, j) => {
      const td = document.createElement('td');

      if (x & 1) td.style.borderTop = "2px solid #000";
      if (x & 2) td.style.borderLeft = "2px solid #000";

      td.addEventListener('click', e => {
        if (e.offsetX <= 2 && j > 0) {
          if (td.style.borderLeft === "2px solid rgb(0, 0, 0)") td.style.borderLeft = "1px solid #20202055";
          else td.style.borderLeft = "2px solid #000";
        } else if (e.offsetY <= 2 && i > 0) {
          if (td.style.borderTop === "2px solid rgb(0, 0, 0)") td.style.borderTop = "1px solid #20202055";
          else td.style.borderTop = "2px solid #000";
        }
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    })
    tbody.appendChild(tr);
  });

  input_btns.map(btn => btn.disabled = false);
});

document.querySelector('.btns__try').addEventListener('click', () => {
  const matrix = [...document.querySelectorAll('.input__table tr')]
    .map(td => [...td.querySelectorAll('td')]
    );

  const rows = matrix.map(tr => tr
    .map(td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-left-color')))
  );

  const columns = transpose(
    transpose(matrix)
      .map(tr => tr.map(td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-top-color'))))
  )

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

  matrix.map((y, i) => {
    const tr = document.createElement('tr');
    y.map((x, j) => {
      const td = document.createElement('td');

      if (columns[i][j]) td.style.borderTop = "2px solid #000";
      if (rows[i][j]) td.style.borderLeft = "2px solid #000";

      td.addEventListener('click', function f() {
        const btn_mode = document.querySelector('.btns__mode').innerText;
        if (try_label.innerText === 'Correct!') this.removeEventListener('click', f);
        else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }

          if (this.innerText === btn_mode) this.innerText = '';
          else this.innerText = btn_mode;
        }
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    })
    tbody.appendChild(tr);
  });

  document.querySelector('.btns__verify').disabled = false;
  document.querySelector('.btns__mode').innerText = '🌳';

  session_style(3);
});

document.querySelector('.btns__verify').addEventListener('click', async () => {
  try {
    const matrix = [...document.querySelectorAll('.input__table tr')]
      .map(tr => [...tr.querySelectorAll('td')]
      );

    const rows = matrix.map(tr => tr
      .map(td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-left-color')))
    );

    const columns = transpose(
      transpose(matrix)
        .map(tr => tr.map(td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-top-color'))))
    )

    const try_matrix = [...document.querySelectorAll('.try__table tr')]
      .map(tr => [...tr.querySelectorAll('td')])
      .map(y => y.map(x => +(x.innerText === '🌳')));
    const try_label = document.querySelector('.try h2');

    if (+await executeAPL(`{((1+8≤≢⍵)/⍳≢⍵)≡{⍵[⍋⍵]}0~⍨,⍵}((↑⍣≡0∘⎕JSON) '${JSON.stringify(try_matrix)}') × reverse_format (↑⍣≡0∘⎕JSON)¨ '${JSON.stringify(rows)}' '${JSON.stringify(columns)}'`)) {
      try_label.style.color = '#080';
      try_label.innerText = 'Correct!';

      this.disabled = true;
    } else {
      try_label.style.color = '#e62020';
      try_label.innerText = 'Wrong!';
    }
  } catch (error) {
    session_style(1);
    console.error(error);
  } finally {
    input_btns.map(btn => btn.disabled = false);
  }
});

document.querySelector('.btns__mode').addEventListener('click', function f() {
  if (document.querySelector('.try h2').innerText === 'Correct!') this.removeEventListener('click', f);
  else this.innerText = (this.innerText === '🌳') ? '❌' : '🌳';
});
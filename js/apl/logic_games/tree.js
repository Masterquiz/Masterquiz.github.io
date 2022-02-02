// Game propriety
const MIN_WIDTH = 4;
const MAX_WIDTH = 12;
// prettier-ignore
const EXAMPLES = {
  8: [
    ["3 2 2 2 2 2 3 2", "1 0 0 0 0 3 1 0", "1 0 0 3 1 1 1 0", "1 3 2 0 3 0 1 3", "1 1 0 0 2 1 2 1", "1 3 2 2 2 1 0 2", "1 3 2 1 0 3 2 1", "1 2 1 1 3 0 0 2"],
    ["3 3 3 2 2 2 2 2", "1 1 2 1 0 0 0 3", "1 1 0 2 1 0 3 0", "1 2 2 3 1 3 0 0", "1 3 2 1 2 1 0 0", "3 0 0 1 0 2 1 0", "3 1 3 1 0 0 2 1", "1 3 0 2 2 2 2 1"],
    ["3 2 2 2 2 2 2 2", "3 2 2 2 2 2 2 3", "1 0 0 0 0 0 0 1", "3 2 1 0 0 0 3 0", "1 0 2 3 2 2 1 0", "3 2 3 1 0 0 1 0", "3 2 0 1 0 0 1 0", "3 2 2 2 2 3 0 0"],
    ["3 2 2 2 1 2 2 2", "3 3 2 3 2 1 0 0", "1 2 3 0 0 2 1 0", "1 0 3 2 2 2 1 3", "1 3 0 0 0 0 2 1", "1 3 2 2 2 2 3 0", "3 0 0 0 0 0 1 0", "1 0 0 0 0 3 0 0"],
    ["3 1 1 2 2 2 2 2", "1 1 2 1 0 0 0 3", "1 1 0 2 1 0 3 0", "1 2 2 3 1 3 0 0", "1 3 2 1 2 1 0 0", "3 0 0 1 0 2 1 0", "3 1 3 1 0 0 2 1", "1 3 0 2 2 2 2 1"],
    ["3 2 2 2 2 3 2 2", "3 1 0 0 0 3 2 2", "1 2 1 0 3 0 0 0", "1 0 2 3 2 2 2 2", "1 0 0 1 3 3 2 1", "1 0 0 2 1 1 0 2", "1 0 0 3 0 2 1 3", "1 0 3 0 0 0 3 0"],
    ["3 3 2 3 2 3 2 2", "1 1 0 2 1 2 1 0", "1 1 0 0 1 0 1 0", "1 2 1 0 1 0 1 3", "1 0 2 3 2 3 2 0", "1 0 0 2 3 2 1 0", "1 0 0 3 0 0 3 1", "1 0 3 0 0 0 1 2"],
  ],
  10: [
    ["3 2 2 3 2 2 2 2 2 2", "1 3 1 2 1 0 0 0 0 0", "3 0 2 2 3 2 1 0 0 0", "3 1 0 3 0 3 0 0 0 3", "1 2 1 1 0 2 3 2 2 0", "1 0 2 3 2 2 2 1 0 0", "1 0 3 0 0 0 3 0 0 0", "1 3 1 0 0 0 3 2 1 3", "3 0 2 2 1 0 1 0 3 0", "1 0 0 0 3 2 0 0 1 0"],
    ["3 2 2 3 2 2 3 3 2 2", "1 0 0 1 0 0 1 1 0 0", "3 1 3 2 2 3 0 2 1 0", "1 2 0 0 0 1 0 0 2 2", "1 0 0 3 2 2 1 0 0 0", "3 2 2 0 0 0 3 1 0 0", "1 0 0 0 0 3 0 3 2 2", "3 2 1 3 1 1 0 1 0 3", "1 0 3 0 2 1 0 2 2 0", "1 3 0 0 0 2 1 0 0 0"],
    ["3 2 3 2 2 2 3 2 2 2", "1 0 1 0 0 0 1 3 1 0", "1 0 1 0 0 3 2 0 1 0", "3 2 2 1 0 1 3 2 2 2", "1 0 0 1 3 1 1 0 0 0", "1 0 0 2 0 1 1 0 0 3", "1 0 3 1 3 3 0 0 0 1", "1 0 1 3 0 2 2 3 2 1", "3 2 0 1 0 0 0 1 0 1", "1 0 0 1 0 0 0 1 3 0"],
  ],
  11: [
    ["3 3 2 2 2 2 2 3 2 2 2", "1 2 2 2 1 3 2 2 1 0 0", "3 2 1 0 2 1 3 2 1 0 0", "1 0 1 3 2 0 1 0 2 3 1", "1 0 1 1 0 0 1 0 0 1 2", "3 1 3 2 1 0 2 1 3 2 1", "1 2 0 0 1 0 0 2 1 0 2", "1 3 1 3 1 0 0 0 1 0 0", "1 1 2 0 2 1 0 0 1 0 0", "1 2 2 2 3 2 2 2 2 2 1", "1 0 0 0 1 0 0 0 0 0 2"],
    ["3 2 3 3 2 2 2 2 3 2 2", "1 0 1 1 0 0 0 3 0 0 0", "1 0 1 2 1 0 3 2 1 3 3", "1 0 1 0 1 0 1 0 3 0 1", "1 3 2 3 0 0 1 0 1 0 1", "1 1 0 2 1 3 0 0 2 1 1", "3 0 0 0 3 2 1 0 0 2 1", "1 0 0 3 0 0 1 0 0 0 3", "3 2 2 2 2 1 2 3 2 2 0", "1 0 0 0 3 0 0 1 0 0 0", "1 0 0 0 2 1 0 2 1 0 0"],
    ["3 2 2 2 2 3 2 3 2 2 3", "1 0 0 0 0 1 0 1 0 0 1", "1 0 0 3 2 1 0 2 1 3 0", "3 2 2 0 0 1 0 0 2 2 3", "3 3 2 2 3 0 0 3 2 2 0", "1 2 1 0 3 2 2 1 0 0 0", "1 3 0 0 3 1 0 2 1 0 0", "1 1 3 2 0 1 0 0 1 0 0", "1 1 1 0 0 2 2 2 2 2 1", "1 2 3 2 2 2 2 2 2 1 1", "1 3 0 0 0 0 0 0 0 1 2"],
  ],
  12: [
    ["3 2 2 2 2 3 3 2 2 2 2 2", "1 0 0 0 0 1 1 0 0 0 0 0", "1 3 2 2 2 1 2 2 1 0 0 0", "1 3 2 1 0 2 1 0 1 0 0 0", "3 0 0 2 2 2 1 0 3 3 2 2", "3 1 0 0 0 3 2 3 0 2 1 0", "1 2 1 0 0 2 1 1 0 0 1 0", "1 3 0 0 0 0 1 2 1 0 2 2", "3 2 2 1 0 0 1 0 3 2 2 2", "1 3 2 2 2 3 0 0 2 1 0 0", "1 2 1 0 0 1 0 0 0 2 1 0", "1 3 0 0 3 0 0 0 0 3 0 0"],
    // LIMIT ERROR:
    ["3 2 3 2 2 2 2 2 3 2 2 3", "1 0 2 1 0 0 0 0 1 0 0 1", "1 0 0 2 3 2 2 1 2 2 2 1", "3 2 2 3 0 0 0 1 0 0 3 0", "1 0 0 1 0 0 3 0 0 0 1 0", "3 2 1 2 1 0 2 1 0 0 3 2", "1 0 3 2 0 0 0 1 0 0 1 0", "1 0 1 0 0 0 3 2 2 3 0 0", "1 3 2 2 2 2 1 0 0 3 2 1", "1 1 0 0 0 0 1 0 0 2 1 1", "3 0 0 0 0 0 1 0 0 3 0 2", "1 0 0 0 0 0 1 3 2 0 0 0"],
  ],
  13: [
    // LIMIT ERROR:
    ["3 2 2 2 2 2 2 2 3 2 3 2 2", "3 2 1 0 0 0 0 3 0 0 1 0 0", "1 0 2 1 0 0 3 2 2 2 0 0 0", "1 0 0 2 2 3 0 0 0 0 3 2 2", "1 0 0 0 0 2 1 0 0 0 1 0 0", "1 0 0 0 0 3 2 3 2 2 1 0 0", "1 0 0 0 0 1 0 1 0 0 2 1 3", "1 3 2 3 3 0 0 2 1 0 0 2 1", "3 0 0 1 2 2 1 3 0 0 0 0 1", "3 2 1 1 0 3 2 0 0 0 0 3 0", "1 0 2 1 0 2 1 0 0 3 2 1 0", "1 0 0 1 3 2 1 0 3 0 0 2 1", "1 0 3 2 0 0 1 0 1 0 0 0 2"],
  ]
};

(async function loadWS() {
  const code = `
    ⎕RL ← ⍬2
    fromJSON ← (↑⍣≡0∘⎕JSON)
    toJSON ← (1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵})

    cmat ← {⊖⊃⍪/{k,¨⍪\\1+⍵}⍣⍺⊢(⊂⍉⍪⍬),d⍴⊂0 0⍴k←⌽⍳1+d←⍵-⍺}

    ⋄
    ∇ res ← f x;adj;area;cr;vec;y
      y ← ({⊃⍤⍋⊢∘≢⌸⍵}⌷∪)0~⍨,m×0=x
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
    ∇ ⋄

    check ← {
      n=1: ∧/n≥(+/,+⌿)⍵>0
      (∧/n≥(+/,+⌿)⍵>0)>(0 1)(1 1)(1 0)∊⍨|-/⍺
    }

    solver ← {
      n←4 9⍸≢m←⍵
      1={⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,⍵)⊢⊂{0}¨⍵
    }

    createTree ← {
      mat ← {(1+⌈/,⍵)@(⊂(?∘⍴⊃⊢)∘⍸¨(~+/,⍥⊂+⌿)×⍵)⊢⍵}⍣⍵⊢⍵ ⍵⍴0
      {⍵+(0=⍵)×¯1 ¯1↓1 1↓⊃⊃⌈/2 4 5 6 8⌷¨⊂,¯1 0 1∘.⊖¯1 0 1⌽¨⊂0(,∘⌽∘⍉⍣4)⍵}⍣≡mat
    }

    creator ← {{4::∇createTree ≢⍵ ⋄ n←1+8<≢m←⍵ ⋄ (1=≢∧(∧/1∘∊¨)) {⊃,/f¨⍵/⍨0∊¨⍵}⍣(⌈/,⍵)⊢⊂{0}¨⍵:⍵ ⋄ ∇createTree ≢⍵} createTree ⍵}

    format ← {(1,2≠/⍵)+(2⍪2×2≠⌿⍵)}

    reverse_format ← {
      (x y) ← ⍵
      flat ← {⊃,/⍵}
      pos ← ⍳⍴x
      x ← ⊃,/pos⊂¨⍨⍥↓x
      y ← ⊃,/pos⊂¨⍨⍥↓⍥⍉y
      vec ← {∪¨x,∘flat¨(↓∨/¨x∘.∊⍵)/¨⊂⍵}y/⍨1≠≢¨y
      vec ← {flat¨(⊂⍵)⌷⍨¨⊂¨{∪{⍵[⍋⍵]}¨∪¨⍵,∘flat¨(↓∨/¨∘.∊⍨⍵)/¨⊂⍵}⍸¨↓∨/¨∘.∊⍨⍵}vec
      ⊃(⍳≢vec)+.×vec∊⍨¨⊂pos
    }`;

  [state, size, hash] = (await executeAPL(code, true)).slice(0, -1);

  input_btns = [...document.querySelectorAll('.input__btns button')];
  input_btns.map(elem => (elem.disabled = false));
})();

document.querySelector('.dimension__button').addEventListener('click', function customisedTD() {
  [...document.querySelectorAll('.input__table tr')].map((tr, i) =>
    [...tr.querySelectorAll('td')].map((td, j) => {
      td.addEventListener('click', e => {
        if (e.offsetY <= 10 && i > 0) {
          if (td.style.borderTop === '1px solid rgb(0, 0, 0)') {
            td.style.borderTop = '1px solid #20202055';
            value = -2;
          } else {
            td.style.borderTop = '1px solid #000';
            value = 2;
          }
        } else if (e.offsetX <= 10 && j > 0) {
          if (td.style.borderLeft === '1px solid rgb(0, 0, 0)') {
            td.style.borderLeft = '1px solid #20202055';
            value = -1;
          } else {
            td.style.borderLeft = '1px solid #000';
            value = 1;
          }
        }

        if ((e.offsetY <= 10 && i > 0) || (e.offsetX <= 10 && j > 0)) {
          UNDO.push([[i, j], value]);
          document.querySelector('.input__modify .btns__undo').disabled = false;

          REDO = [];
          document.querySelector('.input__modify .btns__redo').disabled = true;
        }
      });
    })
  );
});

document.querySelector('.input__modify .btns__undo').addEventListener('click', function undo() {
  if (UNDO.length) {
    const [[i, j], value] = UNDO.slice(-1)[0];
    REDO.push([[i, j], value]);

    let new_value = UNDO.map(x =>
      JSON.stringify(x[0]) === `[${i},${j}]` && +x[1] === value ? x[1] : ''
    )
      .filter(x => x !== '')
      .slice(-1)[0];

    UNDO.pop();

    const td = [...document.querySelectorAll('.input__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (new_value === 2) td.style.borderTop = '1px solid #20202055';
    else if (new_value === 1) td.style.borderLeft = '1px solid #20202055';
    else if (new_value === -1) td.style.borderLeft = '1px solid #000';
    else if (new_value === -2) td.style.borderTop = '1px solid #000';
  }

  if (!UNDO.length) this.disabled = true;

  document.querySelector('.input__modify .btns__redo').disabled = false;
});

document.querySelector('.input__modify .btns__redo').addEventListener('click', function redo() {
  if (REDO.length) {
    const [[i, j], value] = REDO.slice(-1)[0];
    UNDO.push([[i, j], value]);

    let new_value = REDO.map(x =>
      JSON.stringify(x[0]) === `[${i},${j}]` && +x[1] === value ? x[1] : ''
    )
      .filter(x => x !== '')
      .slice(-1)[0];

    REDO.pop();

    const td = [...document.querySelectorAll('.input__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (new_value === -2) td.style.borderTop = '1px solid #20202055';
    else if (new_value === -1) td.style.borderLeft = '1px solid #20202055';
    else if (new_value === 1) td.style.borderLeft = '1px solid #000';
    else if (new_value === 2) td.style.borderTop = '1px solid #000';
  }

  if (!REDO.length) this.disabled = true;
  document.querySelector('.input__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__solve').addEventListener('click', async function solve() {
  // TODO Manage LIMIT ERROR
  try {
    input_btns.map(btn => (btn.disabled = true));

    const matrix = [...document.querySelectorAll('.input__table tr')].map(tr => [
      ...tr.querySelectorAll('td'),
    ]);

    const rows = matrix.map(tr =>
      tr.map(
        td =>
          +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-left-color'))
      )
    );

    const cols = transpose(
      transpose(matrix).map(tr =>
        tr.map(
          td =>
            +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-top-color'))
        )
      )
    );

    const output_table = document.querySelector('.output__table');
    output_table.innerHTML = '';

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    output_table.appendChild(table);

    JSON.parse(
      await executeAPL(
        `toJSON ⊃solver reverse_format fromJSON¨ '${JSON.stringify(rows)}' '${JSON.stringify(
          cols
        )}'`
      )
    ).map((item, i) => {
      const tr = document.createElement('tr');
      item.map((x, j) => {
        const td = document.createElement('td');

        if (rows[i][j]) td.style.borderLeft = '1px solid #000';
        if (cols[i][j]) td.style.borderTop = '1px solid #000';
        if (x) td.style.backgroundImage = 'url("/img/logic_games/tree.png")';

        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
      });
      tbody.appendChild(tr);

      session_style(2);
    });
  } catch (error) {
    session_style(1);
  } finally {
    input_btns.map(btn => (btn.disabled = false));
  }
});

document.querySelector('.btns__create').addEventListener('click', async function create() {
  try {
    input_btns.map(btn => (btn.disabled = true));
    session_style(1);

    const input_table = document.querySelector('.input__table');
    const width =
      document.querySelector('.dimension__value').value ||
      input_table.querySelector('tr').childElementCount;

    const matrix =
      width <= 7 || width == 9
        ? await executeAPL(`format creator ${width}`)
        : EXAMPLES[width][(EXAMPLES[width].length * Math.random()) | 0];

    input_table.innerHTML = '';
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    input_table.appendChild(table);

    matrix.map((y, i) => {
      const tr = document.createElement('tr');
      y.split` `.map((x, j) => {
        const td = document.createElement('td');

        if (x & 1) td.style.borderLeft = '1px solid #000';
        if (x & 2) td.style.borderTop = '1px solid #000';

        td.addEventListener('click', e => {
          if (e.offsetY <= 10 && i > 0) {
            if (td.style.borderTop === '1px solid rgb(0, 0, 0)') {
              td.style.borderTop = '1px solid #20202055';
              value = -2;
            } else {
              td.style.borderTop = '1px solid #000';
              value = 2;
            }
          } else if (e.offsetX <= 10 && j > 0) {
            if (td.style.borderLeft === '1px solid rgb(0, 0, 0)') {
              td.style.borderLeft = '1px solid #20202055';
              value = -1;
            } else {
              td.style.borderLeft = '1px solid #000';
              value = 1;
            }
          }

          if ((e.offsetY <= 10 && i > 0) || (e.offsetX <= 10 && j > 0)) {
            UNDO.push([[i, j], value]);
            document.querySelector('.input__modify .btns__undo').disabled = false;

            REDO = [];
            document.querySelector('.input__modify .btns__redo').disabled = true;
          }
        });

        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  } catch {
    alert(`Can't create a Tree with this width.\nBut you can still create one yourself!`);
  }

  input_btns.map(btn => (btn.disabled = false));
});

document.querySelector('.btns__try').addEventListener('click', function try_solve() {
  const matrix = [...document.querySelectorAll('.input__table tr')].map(td => [
    ...td.querySelectorAll('td'),
  ]);

  const rows = matrix.map(tr =>
    tr.map(
      td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-left-color'))
    )
  );

  const cols = transpose(
    transpose(matrix).map(tr =>
      tr.map(
        td => +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-top-color'))
      )
    )
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

  for (let i = 0; i < matrix.length; ++i) {
    const tr = document.createElement('tr');
    for (let j = 0; j < matrix[0].length; ++j) {
      const td = document.createElement('td');

      if (rows[i][j]) td.style.borderLeft = '1px solid #000';
      if (cols[i][j]) td.style.borderTop = '1px solid #000';

      td.addEventListener('click', function f() {
        const btn_mode = document.querySelector('.btns__mode').style.backgroundImage;
        if (try_label.innerText === 'Correct!') this.removeEventListener('click', f);
        else {
          if (try_label.innerText === 'Wrong!') {
            try_label.innerText = 'Try again!';
            try_label.style.color = '#4169e1';
          }

          value =
            td.style.backgroundImage === 'url("/img/logic_games/tree.png")'
              ? 1
              : td.style.backgroundImage === 'url("/img/logic_games/erase.png")'
              ? -1
              : 0;

          TRY_UNDO.push([[i, j], value]);
          document.querySelector('.try__modify .btns__undo').disabled = false;

          TRY_REDO = [];
          document.querySelector('.try__modify .btns__redo').disabled = true;

          td.style.backgroundImage = td.style.backgroundImage === btn_mode ? '' : btn_mode;
        }
      });

      td.appendChild(document.createElement('br'));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  document.querySelector('.btns__verify').disabled = false;
  document.querySelector('.btns__mode').style.backgroundImage = 'url("/img/logic_games/tree.png")';

  session_style(3);
});

document.querySelector('.try__modify .btns__undo').addEventListener('click', function try_undo() {
  if (TRY_UNDO.length) {
    const [[i, j], _] = TRY_UNDO.slice(-1)[0];

    const td = [...document.querySelectorAll('.try__table tr')].map(tr =>
      tr.querySelectorAll('td')
    )[i][j];

    if (td.style.backgroundImage === 'url("/img/logic_games/tree.png")') TRY_REDO.push([[i, j], 1]);
    else if (td.style.backgroundImage === 'url("/img/logic_games/erase.png")')
      TRY_REDO.push([[i, j], -1]);
    else TRY_REDO.push([[i, j], 0]);

    let new_value = TRY_UNDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_UNDO.pop();

    if (new_value === 1) td.style.backgroundImage = 'url("/img/logic_games/tree.png")';
    else if (new_value === -1) td.style.backgroundImage = 'url("/img/logic_games/erase.png")';
    else td.style.backgroundImage = '';
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

    if (td.style.backgroundImage === 'url("/img/logic_games/tree.png")') TRY_UNDO.push([[i, j], 1]);
    else if (td.style.backgroundImage === 'url("/img/logic_games/erase.png")')
      TRY_UNDO.push([[i, j], -1]);
    else TRY_UNDO.push([[i, j], 0]);

    let new_value = TRY_REDO.map(x => (JSON.stringify(x[0]) === `[${i},${j}]` ? x[1] : ''))
      .filter(x => x !== '')
      .slice(-1)[0];

    TRY_REDO.pop();

    if (new_value === 1) td.style.backgroundImage = 'url("/img/logic_games/tree.png")';
    else if (new_value === -1) td.style.backgroundImage = 'url("/img/logic_games/erase.png")';
    else td.style.backgroundImage = '';
  }

  if (!TRY_REDO.length) this.disabled = true;
  document.querySelector('.try__modify .btns__undo').disabled = false;
});

document.querySelector('.btns__verify').addEventListener('click', async function verify() {
  // TODO Manage LIMIT ERROR
  try {
    const matrix = [...document.querySelectorAll('.input__table tr')].map(tr => [
      ...tr.querySelectorAll('td'),
    ]);

    const rows = matrix.map(tr =>
      tr.map(
        td =>
          +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-left-color'))
      )
    );

    const cols = transpose(
      transpose(matrix).map(tr =>
        tr.map(
          td =>
            +('rgb(0, 0, 0)' === window.getComputedStyle(td).getPropertyValue('border-top-color'))
        )
      )
    );

    const solution = JSON.parse(
      await executeAPL(
        `toJSON ⊃solver reverse_format fromJSON¨ '${JSON.stringify(rows)}' '${JSON.stringify(
          cols
        )}'`
      )
    );

    const try_matrix = [...document.querySelectorAll('.try__table tr')]
      .map(tr => [...tr.querySelectorAll('td')])
      .map(y => y.map(x => +(x.style.backgroundImage === 'url("/img/logic_games/tree.png")')));

    const try_label = document.querySelector('.try h2');

    if (JSON.stringify(solution) === JSON.stringify(try_matrix)) {
      try_label.style.color = '#080';
      try_label.innerText = 'Correct!';

      this.disabled = true;
    } else {
      try_label.style.color = '#e62020';
      try_label.innerText = 'Wrong!';
    }
  } catch (error) {
    session_style(1);
  } finally {
    input_btns.map(btn => (btn.disabled = false));
  }
});

document.querySelector('.btns__mode').addEventListener('click', function mode() {
  if (document.querySelector('.try h2').innerText === 'Correct!')
    this.removeEventListener('click', mode);
  else
    this.style.backgroundImage =
      this.style.backgroundImage === 'url("/img/logic_games/tree.png")'
        ? 'url("/img/logic_games/erase.png")'
        : 'url("/img/logic_games/tree.png")';
});

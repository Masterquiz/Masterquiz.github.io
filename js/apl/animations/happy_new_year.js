let mat2021 = [
  '   ***   ***   ***    *  ',
  '  *   * *   * *   *  **  ',
  '     *  *   *    *  * *  ',
  '    *   *   *   *     *  ',
  '   *    *   *  *      *  ',
  '  *****  ***  ***** *****',
]

let mat2022 = [
  '   ***   ***   ***   *** ',
  '  *   * *   * *   * *   *',
  '     *  *   *    *     * ',
  '    *   *   *   *     *  ',
  '   *    *   *  *     *   ',
  '  *****  ***  ***** *****',
]

const visualise = picture => document.querySelector('.input textarea').value = picture.join`\n`
const counter = s => [...s].reduce((a, c) => (a[c] = a[c] + 1 || 1) && a, {})

visualise(mat2021);

async function loadWS() {
  let code = `⎕RL←⍬2`;
  code += `⋄
    mat2021 ← (↑⍣≡0∘⎕JSON) '${JSON.stringify(mat2021)}'`;
  code += `⋄
    mat2022 ← (↑⍣≡0∘⎕JSON) '${JSON.stringify(mat2022)}'`;
  code += `⋄
    (vec2021 vec2022) ← (0 0) 0,¨{⍵[?⍨⍴⍵]}¨(⍸=∘'*')¨ mat2021 mat2022`;
  code += `⋄
    mat2022 ←' '⍴⍨⍴mat2022`;
  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify(['', 0, '', code]),
  });
  return (await res.json()).slice(0, -1);
};

document.querySelector('.input button').addEventListener("click", async elem => {
  elem.target.disabled = true;

  if (document.querySelector('.input textarea').value[23] === '*') {
    document.querySelector('.input textarea').value = '';
  };
  [state, size, hash] = await loadWS();

  visualise(mat2021)

  let len2021 = counter(mat2021.join``)['*'];
  let len2022 = counter(mat2022.join``)['*'];

  for (i = 0; i < len2021 / 2; ++i) {
    let code = `vec2021 ← 2↓vec2021 ⋄ ⊢mat2021 ← ' '@(2↑vec2021) ⊢mat2021`;
    const res = await fetch('https://tryapl.org/Exec', {
      'method': 'POST',
      'headers': { "Content-Type": "application/json; charset=utf-8" },
      'body': JSON.stringify([state, size, hash, code]),
    });
    [state, size, hash, mat] = await res.json();
    visualise(mat);
  }

  for (i = 0; i < len2022; ++i) {
    let code = `vec2022 ← 1↓vec2022 ⋄ ⊢mat2022 ← '*'@(1↑vec2022) ⊢mat2022`;
    const res = await fetch('https://tryapl.org/Exec', {
      'method': 'POST',
      'headers': { "Content-Type": "application/json; charset=utf-8" },
      'body': JSON.stringify([state, size, hash, code]),
    });
    [state, size, hash, mat] = await res.json();
    visualise(mat);
  }

  elem.target.disabled = false;
});



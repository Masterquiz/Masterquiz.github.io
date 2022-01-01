let [state, size, hash] = ['', 0, ''];

function visualise(picture) {
  document.querySelector('.input__text').value = picture.join`\n`;
}

const counter = s => [...s].reduce((a, c) => (a[c] = a[c] + 1 || 1) && a, {})

document.addEventListener('DOMContentLoaded', async () => {
  // Populate the WS
  let code = `mat2021 ← ↑'   ***   ***   ***    *  ' '  *   * *   * *   *  **  ' '     *  *   *    *  * *  ' '    *   *   *   *     *  ' '   *    *   *  *      *  ' '  *****  ***  ***** *****'`;
  code += `⋄ mat2022 ← ↑'   ***   ***   ***   *** ' '  *   * *   * *   * *   *' '     *  *   *    *     * ' '    *   *   *   *     *  ' '   *    *   *  *     *   ' '  *****  ***  ***** *****'`;
  code += `⋄ (vec2021 vec2022) ← {⍵[?⍨⍴⍵]}¨(⍸=∘'*')¨ mat2021 mat2022`;
  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify([state, size, hash, code]),
  })
  const data = await res.json();
  [state, size, hash] = data.slice(0, -1);

  visualise(await evaluateAPL(`mat2021`));
});

let btnAnimate = document.querySelector('.input__btn');

btnAnimate.addEventListener("click",
  async () => {
    btnAnimate.disabled = true;

    if (document.querySelector('.input__text').value[23] === '*') {
      document.querySelector('.input__text').value = '';
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    visualise(await evaluateAPL(`mat2021`));

    [len2021, len2022] = (await evaluateAPL(`(+/'*'=∊)¨mat2021 mat2022`))[0].split` `.map(x => +x)

    for (i = 0; i < len2021 / 2; ++i) {
      let code = `mat2021 ← ' '@(2↑vec2021) ⊢mat2021`;
      code += `⋄ vec2021 ← 2↓vec2021`;
      code += `⋄ mat2021`;
      const res = await fetch('https://tryapl.org/Exec', {
        'method': 'POST',
        'headers': { "Content-Type": "application/json; charset=utf-8" },
        'body': JSON.stringify([state, size, hash, code]),
      })
      const data = await res.json();
      [state, size, hash, mat2021] = data;
      visualise(mat2021);
    }

    var res = await fetch('https://tryapl.org/Exec', {
      'method': 'POST',
      'headers': { "Content-Type": "application/json; charset=utf-8" },
      'body': JSON.stringify([state, size, hash, `mat2022 ←' '⍴⍨⍴mat2022`]),
    })
    var data = await res.json();
    [state, size, hash] = data.slice(0, -1);

    for (i = 0; i < len2022; ++i) {
      let code = `mat2022 ← '*'@(1↑vec2022) ⊢mat2022`;
      code += `⋄ vec2022 ← 1↓vec2022`;
      code += `⋄ mat2022`;
      const res = await fetch('https://tryapl.org/Exec', {
        'method': 'POST',
        'headers': { "Content-Type": "application/json; charset=utf-8" },
        'body': JSON.stringify([state, size, hash, code]),
      })
      const data = await res.json();
      [state, size, hash, mat2022] = data;
      visualise(mat2022);
    }

    // Populate the WS
    let code = `mat2021 ← ↑'   ***   ***   ***    *  ' '  *   * *   * *   *  **  ' '     *  *   *    *  * *  ' '    *   *   *   *     *  ' '   *    *   *  *      *  ' '  *****  ***  ***** *****'`;
    code += `⋄ mat2022 ← ↑'   ***   ***   ***   *** ' '  *   * *   * *   * *   *' '     *  *   *    *     * ' '    *   *   *   *     *  ' '   *    *   *  *     *   ' '  *****  ***  ***** *****'`;
    code += `⋄ (vec2021 vec2022) ← {⍵[?⍨⍴⍵]}¨(⍸=∘'*')¨ mat2021 mat2022`;
    res = await fetch('https://tryapl.org/Exec', {
      'method': 'POST',
      'headers': { "Content-Type": "application/json; charset=utf-8" },
      'body': JSON.stringify([state, size, hash, code]),
    })
    data = await res.json();
    [state, size, hash] = data.slice(0, -1);

    btnAnimate.disabled = false;
  });



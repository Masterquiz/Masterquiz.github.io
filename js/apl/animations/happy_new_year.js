let mat2021 = [
  '   ***   ***   ***    *  ',
  '  *   * *   * *   *  **  ',
  '     *  *   *    *  * *  ',
  '    *   *   *   *     *  ',
  '   *    *   *  *      *  ',
  '  *****  ***  ***** *****',
];

let mat2022 = [
  '   ***   ***   ***   *** ',
  '  *   * *   * *   * *   *',
  '     *  *   *    *     * ',
  '    *   *   *   *     *  ',
  '   *    *   *  *     *   ',
  '  *****  ***  ***** *****',
];

/**
 * Display an array in output section
 *
 * @param {Array} image
 */

const display = image => (document.querySelector('.input textarea').value = image.join`\n`);

display(mat2021);

document.querySelector('.input button').addEventListener('click', async e => {
  e.target.disabled = true;

  // If "2022" in textarea, reset
  if (document.querySelector('.input textarea').value[23] === '*')
    document.querySelector('.input textarea').value = '';

  const code = `
    ⎕RL←⍬2

    mat2021 ← (↑⍣≡0∘⎕JSON) '${JSON.stringify(mat2021)}'
    mat2022 ← (↑⍣≡0∘⎕JSON) '${JSON.stringify(mat2022)}'

    (vec2021 vec2022) ← ((⊂⍤?⍨∘≢⌷⊢)∘⍸=∘'*')¨ mat2021 mat2022
    mat2022 ←' '⍴⍨⍴mat2022`;

  [state, size, hash] = (await executeAPL(code, true)).slice(0, -1);

  display(mat2021);

  const [len2021, len2022] = [mat2021, mat2022].map(
    x => x.join``.match(new RegExp('[*]', 'g')).length
  );

  for (i = 0; i < len2021 / 2; ++i) {
    [state, size, hash, image] = await executeAPL(
      `⎕← mat2021 ← ' '@(2↑vec2021) ⊢mat2021 ⋄ vec2021 ← 2↓vec2021`,
      true
    );
    display(image);
  }

  for (i = 0; i < len2022; ++i) {
    [state, size, hash, image] = await executeAPL(
      `⎕← mat2022 ← '*'@(1↑vec2022) ⊢mat2022 ⋄ vec2022 ← 1↓vec2022`,
      true
    );
    display(image);
  }

  e.target.disabled = false;
});

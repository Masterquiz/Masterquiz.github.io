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

const display = async image => {
  document.querySelector('.input textarea').value = image.join`\n`;
  await new Promise(resolve => setTimeout(resolve, 300));
};

display(mat2021);

document.querySelector('.input button').addEventListener('click', async e => {
  e.target.disabled = true;

  // If "2022" in textarea, reset
  if (document.querySelector('.input textarea').value[23] === '*')
    document.querySelector('.input textarea').value = '';

  display(mat2021);

  const animation2021 = JSON.parse(
    await executeAPL(
      `mat2021 ← fromJSON '${JSON.stringify(mat2021)}'`,
      `toJSON toJSON ¨{⍵,⊂{' '@({⍵⌷⍨?≢⍵}⍸'*'=⍵)⊢⍵}⊃⌽⍵}⍣(+/'*'=,mat2021)⊢⊂mat2021`
    )
  );

  const animation2022 = JSON.parse(
    await executeAPL(
      `mat2022 ← fromJSON '${JSON.stringify(mat2022)}'`,
      `toJSON toJSON ¨{⍵,⊂{'*'@({⍵⌷⍨?≢⍵}⍸('*'=mat2022)∧('*'≠⍵))⊢⍵}⊃⌽⍵}⍣(+/'*'=,mat2022)⊢⊂{' '}¨mat2022`
    )
  );

  for (const frame of animation2021) await display(JSON.parse(frame));
  for (const frame of animation2022) await display(JSON.parse(frame));

  e.target.disabled = false;
});

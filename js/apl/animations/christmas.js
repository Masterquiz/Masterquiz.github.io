const pic = [
  '                               ',
  '              ⍟                ',
  '             / \\               ',
  '            /   \\              ',
  '            /   \\              ',
  '           /     \\             ',
  '          <       >            ',
  '         <         >           ',
  '        <___     ___>          ',
  '         <         >           ',
  '        <           >          ',
  '       <___       ___>         ',
  '        <           >          ',
  '       <             >         ',
  '      <_______________>        ',
  '             │ │               ',
  '             └─┘               ',
];

/**
 * Display an array in output section
 *
 * @param {Array} image
 */

function display(image) {
  document.querySelector('.output textarea').value = image.join`\n`;
}

(async () => {
  document.querySelector('.input button').disabled = true;
  document.querySelector('.input textarea').value = pic.join`\n`;

  const code = `
    ⎕RL ← ⍬2

    next ← {
      (height width) ← ⍴⍵
      snow ← ⍸'*'=⍵
      inp ← ↑'*'⎕R' '⍠('Regex' 0)⊢↓⍵
      pos ← 1,¨width?⍨?4
      pos ,← {⍵/⍨height≥⊃¨⍵}safe~⍨1 0∘+¨⌈snow
      pos ,← safe/⍨safe∊snow
      '*'@pos⊢inp
    }

    finish ← {
      (height width) ← ⍴⍵
      snow ← ⍸'*'=⍵
      inp ← ↑'*'⎕R' '⍠('Regex' 0)⊢↓⍵
      pos  ← {⍵/⍨height≥⊃¨⍵} safe~⍨1 0∘+¨snow~safe
      pos ,← safe/⍨safe∊snow
      '*'@pos⊢inp
    }`;
  [state, size, hash] = (await executeAPL(code, true)).slice(0, -1);
  document.querySelector('.input button').disabled = false;
})();

document.querySelector('.input button').addEventListener('click', async e => {
  e.target.disabled = true;

  const inputSection = document.querySelector('.input textarea');
  if (!inputSection.value.replaceAll(' ', '').replaceAll('\n', '').length) {
    image = pic;
    inputSection.value = image.join`\n`;
  } else image = inputSection.value.split`\n`;
  display(image);

  document.querySelector('.output').classList.remove('hide');

  [state, size, hash] = (
    await executeAPL(
      ` mat ← (↑⍣≡0∘⎕JSON) '${JSON.stringify(image)}'
      safe ← (⍸=∘'*'∨<⍀⍤≠∘' ') mat`,
      true
    )
  ).slice(0, -1);

  let finish = false;
  document.querySelector('.output button').addEventListener('click', () => (finish = true));

  for (let i = 0; i < 100 && !finish; ++i) {
    [state, size, hash, image] = await executeAPL(`⎕← mat ← next mat`, true);
    display(image);
  }

  for (let i = 0; i <= image.length; ++i) {
    [state, size, hash, image] = await executeAPL(`⎕← mat ← finish mat`, true);
    display(image);
  }

  setTimeout(() => document.querySelector('.output').classList.add('hide'), 1000);

  e.target.disabled = false;
});

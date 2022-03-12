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

const CODE = `
  next ← {
    (height width) ← ⍴⍵
    snow ← ⍸'*'=⍵
    inp ← ↑'[*]'⎕R' '⊢↓⍵
    pos ← 1,¨width?⍨?4
    pos ,← {⍵/⍨height≥⊃¨⍵}safe~⍨1 0∘+¨⌈snow
    pos ,← safe/⍨safe∊snow
    '*'@pos⊢inp
  }

  finish ← {
    (height width) ← ⍴⍵
    snow ← ⍸'*'=⍵
    inp ← ↑'[*]'⎕R' '⊢↓⍵
    pos  ← {⍵/⍨height≥⊃¨⍵} safe~⍨1 0∘+¨snow~safe
    pos ,← safe/⍨safe∊snow
    '*'@pos⊢inp
  }`;

document.querySelector('.input textarea').value = pic.join`\n`;

/**
 * Display an array in output section
 *
 * @param {Array} image
 */

const display = async image => {
  document.querySelector('.output textarea').value = image.join`\n`;
  await new Promise(resolve => setTimeout(resolve, 500));
};

document.querySelector('.input button').addEventListener('click', async e => {
  e.target.disabled = true;

  const inputSection = document.querySelector('.input textarea');
  if (!inputSection.value.replaceAll(' ', '').replaceAll('\n', '').length) {
    image = pic;
    inputSection.value = image.join`\n`;
  } else image = inputSection.value.split`\n`;
  display(image);

  document.querySelector('.output').classList.remove('hide');

  let finish = false;
  document.querySelector('.output button').addEventListener('click', () => (finish = true));

  const mainAnimation = await executeAPL(
    CODE,
    `
    mat ← fromJSON '${JSON.stringify(image)}'
    safe ← (⍸=∘'*'∨(<⍀≠∘' ')) mat
    toJSON toJSON¨ 1↓{⍵,⊂next ⊃⌽⍵}⍣100 ⊢⊂mat`
  );

  const finishAnimation = await executeAPL(
    CODE,
    `
    mat ← fromJSON '${JSON.stringify(inputSection.value.split`\n`)}'
    safe ← (⍸=∘'*'∨(<⍀≠∘' ')) fromJSON '${JSON.stringify(image)}'
    toJSON toJSON¨ 1↓{⍵,⊂finish ⊃⌽⍵}⍣100 ⊢⊂mat`
  );

  for (const frame of JSON.parse(mainAnimation)) await display(JSON.parse(frame));
  for (const frame of JSON.parse(finishAnimation)) await display(JSON.parse(frame));

  setTimeout(() => document.querySelector('.output').classList.add('hide'), 1000);

  e.target.disabled = false;
});

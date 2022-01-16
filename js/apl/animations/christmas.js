let picture = '';
let pic = [
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

[...document.querySelectorAll('.output textarea, .output button')]
  .map(x => x.classList.toggle('hide'));

(async () => {
  document.querySelector('.input textarea').value = '';
  document.querySelector('.input button').disabled = true;

  let code = `⎕RL←⍬2`;
  code += `⋄
    next ← {'*'@({⍵/⍨height≥⊃¨⍵}(safe/⍨safe∊⍸'*'=⍵),(safe~⍨1 0∘+¨safe~⍨⍸'*'=⍵),1,¨width?⍨?1)⊢↑'[*]'⎕R' '⊢↓⍵}`;
  code += `⋄
    finish ← {'*'@({⍵/⍨height≥⊃¨⍵}(safe/⍨safe∊⍸'*'=⍵),safe~⍨1 0∘+¨safe~⍨⍸'*'=⍵)⊢↑'[*]'⎕R' '⊢↓⍵}`;
  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify(['', 0, '', code]),
  });
  [state, size, hash] = (await res.json()).slice(0, -1);

  document.querySelector('.input button').disabled = false;
})();

function visualise(picture) {
  document.querySelector('.output textarea').value = picture.join`\n`;
}

let btnAnimate = document.querySelector('.input button');

btnAnimate.addEventListener("click", async () => {
  btnAnimate.disabled = true;

  let inputSection = document.querySelector('.input textarea');

  let text = inputSection.value;

  if (text.length) picture = text.split`\n`;
  else {
    picture = pic;
    inputSection.value = picture.join`\n`;
  }

  visualise(picture);
  [...document.querySelectorAll('.output textarea, .output button')]
    .map(x => x.classList.toggle('hide'));

  const res = await fetch('https://tryapl.org/Exec', {
    'method': 'POST',
    'headers': { "Content-Type": "application/json; charset=utf-8" },
    'body': JSON.stringify([state, size, hash, `(height width safe) ← (⍴,∘⊂∘⍸=∘'*'∨<⍀⍤≠∘' ') (↑⍣≡0∘⎕JSON) '${JSON.stringify(picture)}'`]),
  });
  [state, size, hash] = (await res.json()).slice(0, -1);

  let finish = false;
  document.querySelector('.output button').onclick = () => finish = true;

  for (let i = 0; i < 100 && !finish; ++i) {
    picture = await executeAPL(`next (↑⍣≡0∘⎕JSON) '${JSON.stringify(picture)}'`);
    visualise(picture);
  }

  for (let i = 0; i <= picture.length; ++i) {
    visualise(picture);
    picture = await executeAPL(`finish (↑⍣≡0∘⎕JSON) '${JSON.stringify(picture)}'`);
  }

  setTimeout(() => {
    [...document.querySelectorAll('.output textarea, .output button')]
      .map(x => x.classList.toggle('hide'));
  }, 2000);

  btnAnimate.disabled = false;
});
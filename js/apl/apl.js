/**
 * Execute a code via https://tio.run/
 *
 * @param {string}  lang
 * @param {string}  code
 * @param {string}  input
 */

async function TIO(lang, code, input) {
  const encoder = new TextEncoder('utf-8');

  const body = encoder.encode(
    `Vlang\x001\x00${lang}\x00` +
      `F.code.tio\x00${encoder.encode(code).length}\x00${code}` +
      `F.input.tio\x00${encoder.encode(input).length}\x00${input}` +
      'Vargs\x000\x00R'
  );

  return await fetch('https://tio.run/cgi-bin/run/api/', {
    method: 'POST',
    body: pako.deflateRaw(body),
  })
    .then(res => res.text())
    .then(data => {
      const output = data.split(data.slice(0, 16));
      if (output[1]) return output[1].split('\n').slice(0, -1);
      else return output[2].split('\n').slice(0, 3);
    });
}

/**
 * Execute an APL code via https://tio.run/#apl-dyalog
 *
 * @param {string}  code
 * @param {string}  input
 */

const executeAPL = async (code, input) => {
  code = `
    fromJSON ← (↑⍣≡0∘⎕JSON)
    toJSON ← (1⎕JSON{1<≢⍴⍵:∇¨⊂⍤¯1⊢⍵ ⋄ ⍵})
    ${code}`;

  return TIO('apl-dyalog', code, input);
};

/**
 * Execute an APL code via tryapl.org API using global [state, size, hash]
 * or, if undefined, set them to ['', 0, ''].
 *
 * Return the Array [state, size, hash, data] by default,
 * or just the output when preserve = true.
 *
 * @param {string}  code
 * @param {boolean} [preserve = true]
 */

async function exTryAPL(code, preserve = true) {
  console.log('Executing code...');
  if (typeof state === 'undefined') [state, size, hash] = ['', 0, ''];

  const data = await fetch('https://tryapl.org/Exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify([state, size, hash, code]),
  })
    .then(res => res.json())
    .then(data => {
      return preserve ? data : data[3];
    });

  return data;
}

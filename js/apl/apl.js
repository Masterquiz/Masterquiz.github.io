/**
 * Execute an APL code via tryapl.org API using global [state, size, hash]
 * or, if undefined, set them to ['', 0, ''].
 *
 * Return the output by default, or the Array [state, size, hash, data] when preserve = true.
 *
 * @param {string}  code
 * @param {boolean} [preserve = false]
 */

async function executeAPL(code, preserve = false) {
  if (typeof state === 'undefined') [state, size, hash] = ['', 0, ''];
  return await fetch('https://tryapl.org/Exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify([state, size, hash, code]),
  })
    .then(res => res.json())
    .then(data => {
      return preserve ? data : data[3];
    });
}

/**
 * Execute an APL code via https://tio.run/#apl-dyalog
 *
 * @param {string}  code
 * @param {string}  input
 */

async function TIO(code, input) {
  const encoder = new TextEncoder('utf-8');

  let bytes = encoder.encode(
    'Vlang\x001\x00apl-dyalog\x00' +
      `F.code.tio\x00${encoder.encode(code).length}\x00${code}` +
      `F.input.tio\x00${encoder.encode(input).length}\x00${input}` +
      'Vargs\x000\x00R'
  );

  return await fetch('https://tio.run/cgi-bin/run/api/', {
    method: 'POST',
    body: pako.deflateRaw(bytes),
  })
    .then(res => res.text())
    .then(data => {
      let output = data.split(data.slice(0, 16));
      if (output[1]) return output[1].split('\n').slice(0, -1);
      else return output[2].split('\n').slice(0, 3);
    });
}

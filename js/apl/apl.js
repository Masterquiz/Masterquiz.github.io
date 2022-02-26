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

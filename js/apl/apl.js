async function evaluateAPL(code) {
  const res = await fetch("https://tryapl.org/Exec", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify([state, size, hash, code]),
  });
  const data = await res.json();
  return data[3];
}

const apleval = (() => {
  let [ns, len, hash, out] = ['', 0, '', '']; // initialise mutable state
  return (async (input) => {
   [ns, len, hash, out] = await fetch('https://tryapl.org/Exec', {
    'headers': {"Content-Type": "application/json; charset=utf-8"},
    'body': JSON.stringify([ns, len, hash, input]),
    'method': 'POST',
    'mode': 'cors'
   }).then(res => res.json());
   return out;
  })
 })();
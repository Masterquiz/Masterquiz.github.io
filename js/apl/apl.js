let executeAPL = async (code) => {
  const res = await fetch("https://tryapl.org/Exec", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify([state, size, hash, code]),
  });
  const data = await res.json();
  return data[3];
}
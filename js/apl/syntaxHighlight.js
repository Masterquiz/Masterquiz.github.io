[...document.querySelectorAll('code')].map(elem => colorCode(elem));

function html(str) {
  let htmlMap = {};
  let res = '';
  for (let chr of str) {
    if (
      ((chr >= '0') & (chr <= '9')) |
      ((chr >= 'a') & (chr <= 'z')) |
      ((chr >= 'A') & (chr <= 'Z')) |
      (chr === ' ') |
      (chr === '_')
    )
      res += chr;
    else if (chr === '\n') res += '<br>';
    else {
      let m = htmlMap[chr];
      if (!m) m = htmlMap[chr] = new Option(chr).innerHTML;
      res += m;
    }
  }
  return res;
}

function colorCode(elem) {
  const str = elem.innerText;
  let cols = parseAPL(str);
  const wrap = (sub, col) => `<span class=${'A' + col}>${html(sub)}</span>`;
  let code = '';
  let pcol = cols[0];
  let li = 0;
  for (let i = 0; i < str.length; i++) {
    let ncol = cols[i];
    if (ncol && pcol != ncol) {
      code += wrap(str.slice(li, i), pcol);
      li = i;
      pcol = ncol;
    }
  }
  if (pcol) code += wrap(str.slice(li), pcol);
  elem.innerHTML = code;
}

function parseAPL(str) {
  const fns = '⌹⍳⍴!%*+,-<=>?|~⊢⊣⌷≤≥≠∨∧÷×∊↑↓○⌈⌊⊂⊃∩∪⊥⊤⍱⍲⍒⍋⍉⌽⊖⍟⍕⍎⍪≡≢⍷⍸⊆⊇';
  const mop = '¨⍨⌸⌶/\\&⌿⍀';
  const dop = '.@∘⌺⍣⍤⍥⍠';
  const nam = '⎕⍞∆ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
  const dig = '0123456789¯';
  const arr = '⍬';
  const dfn = '⍺⍵∇{}():';
  const dmd = '⋄←→';

  const res = new Array(str.length).fill();
  res[0] = '0';
  for (let i = 0; i < str.length; ) {
    const c = str[i];
    const n = str[i + 1] || '\0';

    if (dig.includes(c) || (c === '.' && dig.includes(n))) {
      res[i] = '5';
      while (dig.includes(str[i]) || str[i] === 'e' || str[i] === 'E' || str[i] === '.') i++;
      continue;
    } else if (fns.includes(c)) res[i] = res[i - 2] === '3' && res[i - 1] === '3' ? '3' : '1';
    else if (mop.includes(c)) {
      res[i] = '2';
      if (res[i - 1] === '1') res[i - 1] = '2';
    } else if (dop.includes(c)) res[i] = '3';
    else if (dfn.includes(c)) res[i] = '7';
    else if (arr.includes(c)) res[i] = '6';
    else if (dmd.includes(c)) res[i] = 'D';
    else if ((c === ')' || c === ']') && /^\s+$/.test(str.substring(str.lastIndexOf('\n', i), i))) {
      res[i] = '0';
      while (str[i]) {
        i++;
        if (str[i] === '\n') break;
        if (str[i] === '"') {
          res[i] = '8';
          i++;
          while (str[i] && str[i] != '"') i++;
          res[i + 1] = '0';
        }
        if (str[i] === "'") {
          res[i] = '8';
          i++;
          while (str[i] && str[i] != "'") i++;
          res[i + 1] = '0';
        }
        if (str[i] === '⍝') {
          res[i] = 'C';
          i++;
          while (str[i] && str[i] != '\n') i++;
          res[i--] = '0';
        }
      }
    } else if (nam.includes(c)) {
      res[i] = '4';
      while (nam.includes(str[i]) || dig.includes(str[i])) i++;
      continue;
    } else if (c === "'") {
      res[i] = '8';
      i++;
      while (str[i] && str[i] != "'" && str[i] != '\n') i++;
    } else if (c === '"') {
      res[i] = '8';
      i++;
      while (str[i] && str[i] != '"' && str[i] != '\n') i += str[i] === '\\' ? 2 : 1;
    } else if (c === '⍝') {
      res[i] = 'C';
      while (str[i] && str[i] != '\n') i++;
    } else if (!' \n\t'.includes(c)) res[i] = '0';
    i++;
  }

  return res;
}

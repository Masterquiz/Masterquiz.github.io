const output_example = document.querySelector('.output_example');

table = document.createElement('table');
tbody = document.createElement('tbody');
table.appendChild(tbody);
document.querySelector('.input_example').appendChild(table);

[
  [3, 2, 3, 3, 3],
  [1, 0, 1, 2, 1],
  [3, 1, 1, 3, 0],
  [1, 2, 2, 1, 0],
  [1, 0, 0, 2, 2],
].map((item, i) => {
  const tr = document.createElement('tr');
  item.map((x, j) => {
    const td = document.createElement('td');
    if (x & 1) td.style.borderLeft = '2px solid #f1fa8c';
    if (x & 2) td.style.borderTop = '2px solid #f1fa8c';

    if ([3, 0, 2, 4, 1][i] === j) {
      td.style.background = 'url(/img/logic_games/trees.png)';
      td.style.backgroundSize = '69%';
      td.style.backgroundRepeat = 'no-repeat';
      td.style.backgroundPosition = 'center';
    }
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});

(async () => {
  [state, size, hash] = (
    await executeAPL('mat ← 5 5⍴1 1 2 3 4 1 1 2 2 4 5 1 2 4 4 5 5 5 4 4 5 5 5 5 5', true)
  ).splice(0, 3);
})();

const pre_list = [...document.querySelectorAll('pre')];

pre_list.map(async pre => {
  const div = document.createElement('div');
  div.innerText = '   ';
  const code = pre.querySelector('code');
  code.parentNode.insertBefore(div, code.nextSibling);

  const code_btns = document.createElement('div');
  code_btns.classList.add('code__btns');
  pre.parentNode.insertBefore(code_btns, pre.nextSibling);

  const btns__copy = document.createElement('span');
  btns__copy.innerHTML = 'content_copy';
  btns__copy.classList.add('btns__copy', 'material-icons');

  btns__copy.addEventListener('click', async e => {
    const btn = e.target;
    btn.style.color = '#ff0090';

    navigator.clipboard.writeText(pre.querySelector('code').textContent);

    await new Promise(resolve => setTimeout(resolve, 270));
    resolve => setTimeout(resolve, 270);
    btn.style.color = '#8be9fd';
  });

  const btns__execute = document.createElement('span');
  btns__execute.innerHTML = 'play_arrow';
  btns__execute.classList.add('btns__execute', 'material-icons');

  btns__execute.addEventListener('click', async e => {
    const btn = e.target;
    btn.disabled = true;
    btn.style.color = '#ff0090';

    let code = pre
      .querySelector('code')
      .textContent.replaceAll('\n', '⋄')
      .replaceAll('⎕←', `⋄''⋄⎕←`)
      .replace(`⋄''⋄⎕←`, '⎕←')
      .replaceAll('\\', '\\');
    [state, size, hash, res] = await executeAPL(code, true);

    if (btn.parentElement.nextSibling.className === 'btn__close') {
      var pre_output = btn.parentElement.nextSibling.nextSibling;
      var code_output = pre_output.querySelector('code');
    } else {
      var pre_output = document.createElement('pre');
      var code_output = document.createElement('code');

      pre_output.classList.add('pre_output');
      code_output.classList.add('code_output');

      pre.parentNode.insertBefore(code_btns, pre.nextSibling);

      // Close button
      var btn_close = document.createElement('div');
      btn_close.classList.add('btn__close');
      const close_icon = document.createElement('close_icon');
      close_icon.innerHTML = 'close';
      close_icon.classList.add('material-icons');
      btn_close.appendChild(close_icon);

      close_icon.addEventListener('click', () => {
        pre_output.previousSibling.remove();
        pre_output.remove();
      });
    }

    code_output.innerHTML = '';
    if (!res.length) res = ['Variable(s)/Function(s) saved'];

    // If there's a value error execute previous codeblocks
    for (const line in res) {
      if (res[line].slice(0, 11) === 'VALUE ERROR') {
        for (i in pre_list) {
          if (pre_list[i].nextSibling.nextElementSibling.className !== 'btn__close') {
            code = pre_list[i]
              .querySelector('code')
              .textContent.replaceAll('\n', '⋄')
              .replaceAll('⎕←', `⋄''⋄⎕←`)
              .replace(`⋄''⋄⎕←`, '⎕←')
              .replaceAll('\\', '\\');
            [state, size, hash, res] = await executeAPL(code, true);
            if (pre_list[i] === pre) break;
          }
        }
        break;
      }
    }

    for (let i = 0; i < res.length; ++i) code_output.innerHTML += res[i] + '\n';
    pre_output.appendChild(code_output);

    code_btns.parentNode.insertBefore(btn_close, code_btns.nextSibling);
    btn_close.parentNode.insertBefore(pre_output, btn_close.nextSibling);

    btn.style.color = '#ff79c6';
  });

  [btns__copy, btns__execute].map(elem => code_btns.appendChild(elem));
});

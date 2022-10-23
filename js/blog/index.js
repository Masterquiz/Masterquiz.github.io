const pre_list = [...document.querySelectorAll('.code')];

pre_list.map(async div_code => {
  const div = document.createElement('div');
  div.innerText = '   ';
  const code = div_code.querySelector('code');
  code.parentNode.insertBefore(div, code.nextSibling);

  const code_btns = document.createElement('div');
  code_btns.classList.add('code__btns');
  div_code.parentNode.insertBefore(code_btns, div_code.nextSibling);

  const btns__copy = document.createElement('span');
  btns__copy.innerHTML = 'content_copy';
  btns__copy.classList.add('btns__copy', 'material-icons');

  btns__copy.addEventListener('click', async e => {
    const btn = e.target;
    btn.style.color = '#ff0090';

    navigator.clipboard.writeText(div_code.querySelector('code').textContent);

    await new Promise(resolve => setTimeout(resolve, 270));
    resolve => setTimeout(resolve, 270);
    btn.style.color = '#ff79c6';
  });

  const btns__execute = document.createElement('span');
  btns__execute.innerHTML = 'play_arrow';
  btns__execute.classList.add('btns__execute', 'material-icons');

  btns__execute.addEventListener('click', async e => {
    const btn = e.target;
    btn.disabled = true;
    btn.style.color = '#ff0090';

    console.log(div_code.querySelector('code').textContent);

    let code = div_code
      .querySelector('code')
      .textContent.replaceAll('\n', '⋄')
      .replaceAll('⎕←', `⋄''⋄⎕←`)
      .replace(`⋄''⋄⎕←`, '⎕←')
      .replaceAll('\\', '\\');
    [state, size, hash, res] = await exTryAPL(code, true);

    if (btn.parentElement.nextSibling.className === 'btn__close') {
      var btn_close = btn.parentElement.nextSibling;

      var pre_output = btn_close.nextSibling;
      var code_output = pre_output.querySelector('code');
    } else {
      var pre_output = document.createElement('pre');
      var code_output = document.createElement('code');

      pre_output.classList.add('pre_output');
      code_output.classList.add('code_output');

      div_code.parentNode.insertBefore(code_btns, div_code.nextSibling);

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
    for (const line of res) {
      if (line.slice(0, 11) === 'VALUE ERROR') {
        for (list of pre_list) {
          if (list.nextSibling.nextElementSibling.className !== 'btn__close') {
            code = list
              .querySelector('code')
              .textContent.replaceAll('\n', '⋄')
              .replaceAll('⎕←', `⋄''⋄⎕←`)
              .replace(`⋄''⋄⎕←`, '⎕←')
              .replaceAll('\\', '\\');
            [state, size, hash, res] = await exTryAPL(code, true);
            if (list === div_code) break;
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

document.addEventListener('DOMContentLoaded', (e) => {
  document.querySelector(".dimInput").value = "";
  session_style(1);

  makeInpTable(MIN_WIDTH);
});

function session_style(mode) {
  const outputSection = document.querySelector(".outputSection");
  const trySection = document.querySelector(".trySection");
  switch (mode) {
    case 1:
      outputSection.classList.add("hide");
      trySection.classList.add("hide");
      break;
    case 2:
      outputSection.classList.remove("hide");
      trySection.classList.add("hide");
      break;
    case 3:
      trySection.classList.remove("hide");
      outputSection.classList.add("hide");
      break;
    default:
      outputSection.classList.remove("hide");
      trySection.classList.remove("hide");
      break;
  }
}

function makeInpTable(width, height = width, type = 'number') {
  document.querySelector(".tableInp").innerHTML = "";

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  document.querySelector(".tableInp").appendChild(table);

  for (i = 0; i < height; ++i) {
    let row = document.createElement("tr");
    for (j = 0; j < width; ++j) {
      let input = document.createElement("input");
      input.classList.add("inp");
      input.type = type;
      input.placeholder = DEFAULT_INP_VALUE;
      input.setAttribute('onclick', "select()");
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

function makeInpTable2(matrix, type = 'value') { // !Better solution to create a Table from Array?
  document.querySelector(".tableInp").innerHTML = "";

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  document.querySelector(".tableInp").appendChild(table);

  const width = matrix[0].length;
  const height = matrix.length;
  for (i = 0; i < height; ++i) {
    let row = document.createElement("tr");
    for (j = 0; j < width; ++j) {
      let input = document.createElement("input");
      input.classList.add("inp");
      input.readOnly = true;
      if (type === 'value') input.value = matrix[i][j];
      else input.placeholder = matrix[i][j];
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

function makeOutTable(matrix) {
  document.querySelector(".tableOut").innerHTML = "";

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  document.querySelector(".tableOut").appendChild(table);

  const width = matrix[0].length;
  const height = matrix.length;
  for (i = 0; i < height; ++i) {
    let row = document.createElement("tr");
    for (j = 0; j < width; ++j) {
      let input = document.createElement("input");
      input.classList.add("out");
      input.readOnly = true;
      input.placeholder = matrix[i][j];
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

function makeTryTable(type, matrix) {
  document.querySelector(".tableTry").innerHTML = "";

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  document.querySelector(".tableTry").appendChild(table);

  const width = matrix[0].length;
  const height = matrix.length;
  for (i = 0; i < height; ++i) {
    let row = document.createElement("tr");
    for (j = 0; j < width; ++j) {
      let input = document.createElement("input");
      input.classList.add("try");
      input.type = type;
      input.placeholder = matrix[i][j];
      input.onclick = "this.select()";
      row.appendChild(input);
    }
    tbody.appendChild(row);
  }
}

function changeDim() {
  document.querySelector(".dimInput").blur();

  let width = document.querySelector(".dimInput").value || MIN_WIDTH;
  if (!width) width = MIN_WIDTH;

  session_style(1);
  if (MIN_WIDTH <= width && width <= MAX_WIDTH) makeInpTable(width);
  else alert("Dimension not valid!\nTry again with a number between " + MIN_WIDTH + " and " + MAX_WIDTH);
}

document.querySelector(".dimInput").addEventListener("keyup", function (e) {
  if (e.keyCode === 13) document.querySelector(".dimButton").click();
});

function restart() {
  session_style(1);
  Array.from(document.querySelectorAll(".inp")).map(x => { x.value = ""; x.placeholder = DEFAULT_INP_VALUE })
}
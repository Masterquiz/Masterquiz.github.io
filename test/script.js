// Incompetenza ~Emanuele Fant | 30/03/2022

const capitalize = word => word.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, c => c.toUpperCase());

window.addEventListener('load', () => {
  gapi.load('client:auth2', initClient);
});

function handleCredentialResponse(response) {
  document.querySelector('.g-signin2').style.display = 'none';
  const { email, given_name, family_name } = JSON.parse(atob(response.credential.split`.`[1]));

  SheetDB.read('https://sheetdb.io/api/v1/vhlwbey389lk8', {
    sheet: 'Elenco',
    search: { Email: email },
  })
    .then(values => {
      const inputs = document.querySelectorAll('form input');
      inputs[0].value = email;

      const value = values.filter(row => row[0] === email)[0];

      if (value) {
        inputs[1].value = value[1];
        inputs[2].value = value[2];

        document.querySelector('.thanks-box h1').innerText = 'BENTORNATO A UFO';
      } else {
        inputs[1].value = given_name;
        inputs[2].value = family_name;

        document.querySelector('.thanks-box h1').innerText = 'BENVENUTO A UFO';
      }
    })
    .catch(error => console.error(error));
}

const initClient = () => {
  gapi.client
    .init({
      clientId: '585871178834-6ccf5b0dcukd6grao01d4fsbgcee0oj2.apps.googleusercontent.com',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    })
    .then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    })
    .catch(error => console.error(error));
};

const updateSigninStatus = isSignedIn => {
  if (isSignedIn) {
    document.querySelector('form').addEventListener('submit', async e => {
      e.preventDefault();

      const values = [...document.querySelectorAll('form input')].map(input => input.value);

      await SheetDB.write('https://sheetdb.io/api/v1/vhlwbey389lk8', {
        sheet: 'Presenze',
        data: {
          Data: new Date().toLocaleDateString('en-UK', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
          Email: values[0],
          Nome: capitalize(values[1]),
          Cognome: capitalize(values[2]),
          Laboratorio: document.querySelector('form select').value,
        },
      })
        .then(res => console.log(res))
        .catch(error => console.error(error));

      document.querySelector('.contact-box').style.display = 'none';
      document.querySelector('.thanks-box').style.display = 'flex';
    });
  } else document.querySelector('.g-signin2').style.display = 'flex';
};

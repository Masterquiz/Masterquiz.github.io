// Incompetenza ~Emanuele Fant | 30/03/2022

const capitalize = word => word.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, c => c.toUpperCase());

window.addEventListener('load', () => {
  gapi.load('client:auth2', initClient);
});

function handleCredentialResponse(response) {
  document.querySelector('.g-signin2').style.display = 'none';
  const responsePayload = JSON.parse(atob(response.credential.split`.`[1]));

  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: '1_Eh8OUx9bTaYxgYN7l0x49z7lc8VekoMeDQ1uhgLyqk',
      range: 'Elenco!B3:D',
    })
    .then(res => {
      return JSON.parse(res.body)['values'];
    })
    .then(values => {
      const email = responsePayload.email;
      document.querySelector('#email').value = email;
      localStorage.setItem('email', email);

      const value = values.filter(row => row[0] === email)[0];

      if (value) {
        document.querySelector('#name').value = value[1];
        document.querySelector('#surname').value = value[2];

        document.querySelector('.thanks-box h1').innerText = 'BENTORNATO A UFO';
      } else {
        document.querySelector('#name').value = responsePayload.given_name;
        document.querySelector('#surname').value = responsePayload.family_name;
      }
    })
    .catch(error => console.error(error));
}

const initClient = () => {
  gapi.client
    .init({
      apiKey: 'AIzaSyDKx7AMwVu65LAGW-Ar9C9kOZ8os7Vw5us',
      clientId: '585871178834-6ccf5b0dcukd6grao01d4fsbgcee0oj2.apps.googleusercontent.com',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    })
    .then(
      () => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      error => console.error(JSON.stringify(error, null, 2))
    );
};

const updateSigninStatus = isSignedIn => {
  if (isSignedIn) {
    document.querySelector('#form').addEventListener('submit', async e => {
      e.preventDefault();
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        addToRecord();

        document.querySelector('.contact-box').style.display = 'none';
        document.querySelector('.thanks-box').style.display = 'flex';
      }
    });
  } else document.querySelector('.g-signin2').style.display = 'flex';
};

const addToRecord = () => {
  gapi.client.sheets.spreadsheets.values
    .append(
      {
        spreadsheetId: '1_Eh8OUx9bTaYxgYN7l0x49z7lc8VekoMeDQ1uhgLyqk',
        range: 'Presenze!B2:E2',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
      },
      {
        range: 'Presenze!B2:E2',
        majorDimension: 'ROWS',
        values: [
          [
            new Date().toLocaleDateString('en-UK', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }),
            document.querySelector('#email').value,
            capitalize(document.querySelector('#name').value),
            capitalize(document.querySelector('#surname').value),
            document.querySelector('#activity').value,
          ],
        ],
      }
    )
    .then(response => console.log(response.result.updates))
    .catch(error => console.error(error));
};

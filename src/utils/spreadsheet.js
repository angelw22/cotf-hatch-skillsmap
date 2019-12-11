/* global gapi */


var CLIENT_ID = '281675621296-k6tpcg8m2h9ei0vrdoh160mvgn8tgp9v.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDS4uWW_gtdcJMQ5V7lHesMmRvElqxj4-g';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


export function load(cb) {
    window.gapi.client.load('sheets', 'v4', () => {
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1OUu2JiKmCg-8ArTspCNklEkw-qCv05NeWRJHC_7AR00',
        range: 'UXD Track!A2:E',
      }).then((response) => {
          console.log(response)
      })
    })
}

export function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        listMajors();
    }, function(error) {
        console.log()
    }); 
}

export function listMajors() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1OUu2JiKmCg-8ArTspCNklEkw-qCv05NeWRJHC_7AR00',
      range: 'UXD Track!A2:E',
    }).then(function(response) {
      console.log(response)
    }, function(response) {
        console.log('error ', response)
    });
  }

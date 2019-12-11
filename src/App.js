import React, { Component } from 'react';
import './App.css';
import CardPage from './components/cardPage';


// var CLIENT_ID = '680140181637-gdfe7aqj7r1aabj8h7n1nq76eq41onll.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyCheO_PyYACghxdC8qT0vzClBzEk_V-1eA';
// // var CLIENT_ID = '281675621296-k6tpcg8m2h9ei0vrdoh160mvgn8tgp9v.apps.googleusercontent.com';
// // var API_KEY = 'AIzaSyDS4uWW_gtdcJMQ5V7lHesMmRvElqxj4-g';
// var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }


  // componentDidMount() {
  //   gapi.load('client', () => {
  //     gapi.client.init({
  //       apiKey: API_KEY,
  //       clientId: CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES
  //     }).then(function () {
  //       gapi.client.sheets.spreadsheets.values.get({
  //         spreadsheetId: '1OUu2JiKmCg-8ArTspCNklEkw-qCv05NeWRJHC_7AR00',
  //         range: 'UXD Track!A2:E',
  //       }).then(function(response) {
  //         console.log(response)
  //       }, function(response) {
  //           console.log('error ', response)
  //       });
  //     }, function(error) {
  //         console.log('error', error)
  //     }); 
  //   });
  // }

  

  render() {
    return (
      <div className="app">
          <CardPage />
      </div>
    );
  }

}

export default App;

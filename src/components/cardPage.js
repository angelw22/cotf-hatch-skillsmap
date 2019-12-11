import React from 'react';
// import '../App.css';
// import Swiper from 'react-id-swiper';
import CardSwiper from './cardSwiper';
import 'swiper/css/swiper.css';

import { gapi } from 'gapi-script';
// import { thisExpression } from '@babel/types';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './navBar';
import Modal from 'react-modal';
// import { thisExpression } from '@babel/types';

var CLIENT_ID = '680140181637-gdfe7aqj7r1aabj8h7n1nq76eq41onll.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCheO_PyYACghxdC8qT0vzClBzEk_V-1eA';
// var CLIENT_ID = '281675621296-k6tpcg8m2h9ei0vrdoh160mvgn8tgp9v.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyDS4uWW_gtdcJMQ5V7lHesMmRvElqxj4-g';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const SHEETS = ['UXD Track', 'Design Track', 'Web Design Track'];
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay: {zIndex: 1000}
};


Modal.setAppElement('#root')

class CardPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
			data: [],
			sorted: [],
      column_titles: [],
      active_range: 'UXD Track',
      show: false,
      modalIsOpen: false,
      modal_content: {}
    }
    
    this.loadCards = this.loadCards.bind(this)
    this.changeTopic = this.changeTopic.bind(this)
    this.loadData = this.loadData.bind(this)
    this.triggerModal = this.triggerModal.bind(this)
  }

  componentDidMount() {
    this.loadData();
  }
  
  loadData () {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1OUu2JiKmCg-8ArTspCNklEkw-qCv05NeWRJHC_7AR00',
          range: this.state.active_range,
        }).then((response) => {
          let blob = response.result.values
					this.setState({data: blob})
          this.setState({column_titles: blob.shift()});
        }, function(response) {
            console.log('error ', response)
        });
      }, function(error) {
          console.log('error', error)
      }); 
    });
  }

  loadCards () {
    if (this.state.data) {
      this.setState({show: !this.state.show}) 
    }
  }

  changeTopic (topic) {
    this.setState({active_range: topic})
    this.loadData();
  }

  triggerModal(state, info) {
    if (this.state.modalIsOpen !== state) {
      this.setState({modalIsOpen: state});
      this.setState({modal_content: info})
    }
  }

  render() {
    return (	
      <div>
          <CardSwiper 
            data={this.state.data} 
            headers={this.state.column_titles} 
            active_topic={this.state.active_range}
            modal_data={this.triggerModal}
          />
          {/* <button onClick={() => this.triggerModal(true)}>Modal is open: {this.state.modalIsOpen}</button> */}
          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => this.triggerModal(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
            <div>
              {this.state.modal_content ? 
              <div>
                <h3>Title:</h3>{this.state.modal_content.title}
                <h3>Description:</h3>{this.state.modal_content.description}
                <h3>Requirement:</h3>{this.state.modal_content.requirement}
              </div>
              :''}
            {/* <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form> */}
            </div>
            <div><button onClick={() => this.triggerModal(false)}>ok</button></div>

          </Modal>
        {/* {this.state.show ? <CardSwiper data={this.state.data} headers={this.state.column_titles} active={this.state.active_range}/> : 'nope'} */}
        {/* <button onClick={this.updateTopic}>{this.state.active_range}</button> */}
        <NavBar titles={ SHEETS } updateTopic={this.changeTopic}/>

      </div>

    );
  }

}

export default CardPage;

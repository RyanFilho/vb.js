import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import Editor from './Editor';
import Tokens from './Tokens'; 
import Messages from './Messages';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			code: "Class Program\n    Sub Main(args As String())\n        Console.WriteLine(\"aaa\")\n    End Sub\nEnd Class\n",
			tokens: [],
			messages: [],
		};  
		this.updateCode = this.updateCode.bind(this);
		this.updateGrids = this.updateGrids.bind(this);		
		this.getTokenFromCloud = this.getTokenFromCloud.bind(this);
	}

	updateCode(newCode){
		this.setState({code: newCode });
	}

	updateGrids(data){		
		this.setState({tokens: data.tokens });
		this.setState({messages: data.messages });
	}

	handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
	}

	getTokenFromCloud() {
		var myHeaders = new Headers();		
		var myInit = { method: 'POST',
					   headers: myHeaders,
					   mode: '	cors',
					   cache: 'default',
					   body: JSON.stringify({ code: this.state.code }),
					   
					};	
		fetch("https://us-central1-vbjs-6639a.cloudfunctions.net/lexAnalyser", myInit)
		// fetch("http://localhost:5000/vbjs-6639a/us-central1/lexAnalyser", myInit)		
		.then(this.handleErrors)
		.then(data =>	data.json())
		.then(this.updateGrids)
		.catch(error =>	console.log('We can\'t get tokens from the server. Error: ' + error.message));
	}

	render() {
		return (
			<Grid>	
				<Row className="show-grid">					
					<Col xs={12} md={6}>
						<h1>Code</h1>
						<Editor code={this.state.code} sendNewCode={this.updateCode}/>
						<br/>
						<Button bsStyle="primary" onClick={this.getTokenFromCloud}>Token Analyser</Button>
						&nbsp;
						<Button bsStyle="primary">Sintax Analyser</Button>
					</Col>
					<Col xs={12} md={6}>
						<h1>Messages</h1>
						<Messages messages={this.state.messages}/>
					</Col>
				</Row>							
				<Row className="show-grid">					
					<Col xs={12} md={6}>
						<h1>Tokens</h1>
						<Tokens tokens={this.state.tokens}/>
					</Col>					
				</Row>					
			</Grid>		
		);
	}
}

export default App;

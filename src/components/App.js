import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import Editor from './Editor';
import Tokens from './Tokens'; 

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			code: "Class Program\n    Sub Main(args As String())\n        Console.WriteLine(\"aaa\")\n    End Sub\nEnd Class\n",
			tokens: []
		};  
		this.updateCode = this.updateCode.bind(this);
		this.updateTokens = this.updateTokens.bind(this);		
		this.getTokenFromCloud = this.getTokenFromCloud.bind(this);
	}

	updateCode(newCode){
		this.setState({code: newCode });
	}

	updateTokens(newTokens){
		this.setState({tokens: newTokens });
	}

	getTokenFromCloud() {
		var myHeaders = new Headers();		
		var myInit = { method: 'POST',
					   headers: myHeaders,
					   mode: 'cors',
					   cache: 'default',
					   body: JSON.stringify({ code: this.state.code }),
					   
					};	
		fetch("http://localhost:5000/vbjs-6639a/us-central1/lexAnalyser", myInit)
		.then(function(data){
			return data.json();
		})
		.then(this.updateTokens)
		.catch(function(error) {
			console.log(error);
			console.log('Não foi possível obter os tokens do servidor. Error: ' + error.message);
		});
	}

	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={12} md={6}>
						<Editor code={this.state.code} sendNewCode={this.updateCode}/>
					</Col>
					<Col xs={12} md={6}>
						<Tokens tokens={this.state.tokens}/>
					</Col>
				</Row>			
				<Row className="show-grid">
					<Col xs={12}>
					<Button bsStyle="primary" onClick={this.getTokenFromCloud}>Análisar Tokens</Button>
					</Col>					
				</Row>		
			</Grid>		
		);
	}
}

export default App;

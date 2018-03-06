import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import Editor from './Editor';
import Tokens from './Tokens'; 
import Errors from './Errors';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			code: "Class Program\n    Sub Main(args As String())\n        Console.WriteLine(\"aaa\")\n    End Sub\nEnd Class\n",
			tokens: [],
			errors: [],
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
		this.setState({errors: data.errors });
	}

	getTokenFromCloud() {
		var myHeaders = new Headers();		
		var myInit = { method: 'POST',
					   headers: myHeaders,
					   mode: 'cors',
					   cache: 'default',
					   body: JSON.stringify({ code: this.state.code }),
					   
					};	
		fetch("https://us-central1-vbjs-6639a.cloudfunctions.net/lexAnalyser", myInit)
		.then(function(data){
			return data.json();
		})
		.then(this.updateGrids)
		.catch(function(error) {
			console.log(error);
			console.log('Não foi possível obter os tokens do servidor. Error: ' + error.message);
		});
	}

	render() {
		return (
			<Grid>	
				<Row className="show-grid">
					<h1>Código</h1>
					<Col xs={12}>
						<Editor code={this.state.code} sendNewCode={this.updateCode}/>
					</Col>
				</Row>			
				<Row className="show-grid">
					<Col xs={12}>
						<Button bsStyle="primary" onClick={this.getTokenFromCloud}>Análisar Tokens</Button>
					</Col>					
				</Row>	
				<Row className="show-grid">					
					<Col xs={12} md={6}>
						<h1>Tokens</h1>
						<Tokens tokens={this.state.tokens}/>
					</Col>
					<Col xs={12} md={6}>
						<h1>Erros</h1>
						<Errors errors={this.state.errors}/>
					</Col>
				</Row>					
			</Grid>		
		);
	}
}

export default App;

import React, { Component } from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import Editor from './Editor';
import Tokens from './Tokens';

class App extends Component {

	tranferNewCode(newCode) {
		
	}
	render() {
		return (
			<Grid>
				<Row className="show-grid">
					<Col xs={12} md={6}>
						<Editor sendNewCode={}/>
					</Col>
					<Col xs={12} md={6}>
						<Tokens/>
					</Col>
				</Row>			
				<Row className="show-grid">
					<Col xs={12}>
					<Button bsStyle="primary">Análisar Tokens</Button>
					</Col>					
				</Row>		
			</Grid>		
		);
	}
}

export default App;

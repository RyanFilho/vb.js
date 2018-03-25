import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Tokens extends Component {  
	render() {
        var newRows = [];
        if (this.props.tokens) {
            this.props.tokens.forEach((element,index) => {
                newRows.push(
                    <tr key={index}>
                        <td>{element.id}</td>
                        <td>{element.type}</td>
                        <td>{element.value}</td>
                        <td>{element.line}</td>
                        <td>{element.col}</td>
                    </tr>
                )
            });
        }
		return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#Id</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Linha</th>
                        <th>Coluna</th>
                    </tr>
                </thead>
                <tbody>
                   {newRows}
                </tbody>
            </Table>
		);
	}
}

export default Tokens;




import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Errors extends Component {  
	render() {
        var newRows = [];
        this.props.errors.forEach((element,index) => {
            newRows.push(
                <tr key={index}>
                    <td>{element.id}</td>
                    <td>{element.error}</td>
                    <td>{element.line}</td>
                    <td>{element.col}</td>
                </tr>
            )
        });
		return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#Id</th>
                        <th>Error</th>
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

export default Errors;




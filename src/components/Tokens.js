import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Tokens extends Component {  
	render() {
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
                    <tr>
                        <td>1</td>
                        <td>Id</td>
                        <td>a</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Op</td>
                        <td>=</td>
                        <td>1</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Literal</td>
                        <td>2</td>
                        <td>1</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </Table>
		);
	}
}

export default Tokens;




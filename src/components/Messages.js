import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Messages extends Component {  
	render() {
        var newRows = [];
        this.props.messages.forEach((element,index) => {
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
                        <th>Message</th>
                        <th>Line</th>
                        <th>Column</th>
                    </tr>
                </thead>
                <tbody>
                   {newRows}
                </tbody>
            </Table>
		);
	}
}

export default Messages;




import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/vb/vb'

class Editor extends Component {
	render() {
		var options = {
      lineNumbers: true,
      mode: 'vb',
		};
		return <CodeMirror value={this.props.code} onChange={this.props.sendNewCode} options={options} />
	}
}

export default Editor;

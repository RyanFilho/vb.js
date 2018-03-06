import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/vb/vb'

class Editor extends Component {
  constructor(props){
    super(props);
    this.state = {
        code: "' testing a comment",
    };  
    this.updateCode = this.updateCode.bind(this);
  }
	updateCode(newCode) {
		this.setState({
			code: newCode,
		});
		this.props.sendNewCode(newCode);
	}
	render() {
		var options = {
      lineNumbers: true,
      mode: 'vb',
		};
		return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
	}
}

export default Editor;

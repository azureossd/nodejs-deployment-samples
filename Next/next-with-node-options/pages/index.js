const env = process.env.NODE_OPTIONS
const server = require('http').maxHeaderSize

export default class extends React.Component {
  static getInitialProps () {
    //return { env }
    return { server }
  }
  render () {
    //return <div>Printing process.env.NODE_OPTIONS { this.props.env }</div>
    return <div>Printing http.maxHeaderSize { this.props.server }</div>
  }
}
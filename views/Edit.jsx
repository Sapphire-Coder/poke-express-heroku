const React = require('react')

class Edit extends React.Component {
    render() {
        return (
            <div>
                <form action = {`/pokemon/${this.props.pokemon._id}?_method=PUT`} method = 'POST'>
                    Name: <input type = 'text' name = 'name' defaultValue = {this.props.pokemon.name}/><br/>
                    Image: <input type = 'url' name = 'img' defaultValue = {this.props.pokemon.img}/><br/>
                    <input type = 'submit' value = 'Complete Changes'/>
                </form>
            </div>
        )
    }
}
module.exports = Edit
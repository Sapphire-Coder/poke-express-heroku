const React = require('react')
class Show extends React.Component {
    render() {
        const { pokemon } = this.props
        return (
            <div>
                <h1>Gotta Catch 'Em All</h1>
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <img src = {`${pokemon.img}.jpg`}></img><br/>
                <a href = {'/pokemon'}>Back</a>
            </div>
        )
    }
}

module.exports = Show
const React = require('react')
class Index extends React.Component {
    render() {
        const { pokemon } = this.props
        return (
            <div>
                <h1>Here is a list of the Pokemon!</h1>
                <ul>
                    {pokemon.map((poke, i) => {
                        return (
                            <li key = {i}>
                                <a href = {`/pokemon/${poke.id}`}>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</a>
                                <form action = {`/pokemon/${poke._id}?_method=DELETE`} method = "POST">
                                    <input type = "submit" value = "Delete"/>
                                </form>
                            </li>
                        )
                    })}
                </ul>
                <a href = {'/pokemon/new'}>Submit a new Pokemon!</a>
            </div>
        )
    }
}

module.exports = Index
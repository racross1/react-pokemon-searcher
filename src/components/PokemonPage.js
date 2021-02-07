import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

let allPokemons = []
//better to have this as a separate state variable?
//currently global var since it won't change
//used to reset search instead of calling new fetch or refreshing page

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    inputVal: ''
  }
  
  componentDidMount(){
    this.getPokemon()
  }

  getPokemon = () => {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(allPokemon => {
      allPokemons = allPokemon
      this.setState({pokemon: allPokemon})})
  }

  createPokemon = (e) => {
    let newPokemon = {
      name: e.target.name.value,
      hp: e.target.hp.value,
      sprites: {
        front: e.target.frontUrl.value,
        back: e.target.backUrl.value
      } 
    }

    e.target.reset()

    fetch('http://localhost:3000/pokemon', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPokemon),
    })
    .then(resp => resp.json())
    .then(newPokemon => {
      let allPokemon = [newPokemon, ...this.state.pokemon]
      this.setState({
        pokemon: allPokemon
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  filterPokemon = () => {
    if (this.state.inputVal === '') {
      this.setState({pokemon: allPokemons})
    } else {
      let filteredPokemon = this.state.pokemon.filter(p => {
      return p.name.toLowerCase().includes(this.state.inputVal.toLowerCase())
    })
    
    this.setState({
      pokemon: filteredPokemon
    })
  }}

  setInputValState = (input) => {
   this.setState({
     inputVal: input
   })
  }

  handleKeyPress = (e) => {
    e.key === 'Enter'? this.filterPokemon() : null 
  }

  
  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm createPokemon={this.createPokemon}/>
        <br />
        <Search handleKeyPress={this.handleKeyPress} setInputValState={this.setInputValState}/>
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
      </Container>
    )
  }
}

export default PokemonPage

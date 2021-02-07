import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  state = {
    name: '',
    hp: '',
    sprites: {
      front: '',
      back: ''
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name] : e.target.value
    })
    console.log('change')
  }

  handleChangeImg = (e) => {
    
    this.setState({
      sprites: {[e.target.name]: e.target.value}
    })
    console.log("img change")
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.props.createPokemon}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name"/>
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm

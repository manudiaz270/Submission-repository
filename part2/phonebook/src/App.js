import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
const Filter = (props) => {
    return(
        <input value={props.value} onChange={props.onChange}/>
    )
}
const Form = (props) => {
    return(
        <form onSubmit={props.onSubmit}>
         <div> name: <input value={props.nameValue} onChange={props.nameChange} /> </div>
          <div> number: <input value={props.numberValue} onChange={props.numberChange}/> </div>
          <div><button type="submit">add</button></div>
      </form>
    )
}
const Persons = ({filteredData, handleDelete}) => {
    return(
        <ul>
            {filteredData.map(person => <li key={Math.random()}> {person.name} {person.number}</li>)}
        </ul>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    personService
        .getAll()
        .then(response => {
            setPersons(response)
            setFilteredData(response)
            console.log(persons);
        })
  }, [])
//   const handleDelete = (id) => {
//     personService
//         .erase(id)
//   }
  const handleSubmit = (event) => {
    event.preventDefault()
    if(!persons.some(person => person.name === newName)){
    const personObject ={
        name: newName,
        number: newNumber,
        id: Math.random()
    }
    personService   
    .create(personObject)    
    .then(response => {      
            setPersons(persons.concat(response))
            setFilteredData(persons.concat(response))
    })
    }else{alert(`${newName} is already added to phonebook`)}
    setNewName('')
    setNewNumber('')
    }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
    const entry = event.target.value.toLowerCase()
    setFilteredData(persons.filter((person) => {
        if(entry === ''){
            return person
        }
        else{
            return person.name.toLowerCase().includes(entry)
        }
    }))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchInput} onChange={handleSearchChange}/>
      <h2>Add new number</h2>
      <Form onSubmit={handleSubmit} nameValue={newName} nameChange={handleNameChange} numberChange={handleNumberChange}
            numberValue={newNumber}/>
      <h2>Numbers</h2>
      <Persons filteredData={filteredData}/>
    </div>
  )
}


export default App
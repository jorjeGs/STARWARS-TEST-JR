import './App.css'
import { useEffect, useState } from 'react'
import { getAllCharacters, searchCharacter } from './services/characters'

function App() {

  const [characters, setCharacters] = useState([])
  const [next, setNext] = useState('')
  const [previous, setPrevious] = useState('')
  const [loading , setLoading] = useState(false)

  useEffect(() => {

    getCharacters()

  }, [])

  const getCharacters = async (url) => {
    //set loading
    setLoading(true)
    const { results, next, previous } = await getAllCharacters(url)
    setCharacters(results)
    setNext(next)
    setPrevious(previous)
    //set loading
    setLoading(false)
  }

  const handleNext = () => {
    const url = next
    getCharacters(url)
  }

  const handlePrevius = () => {
    const url = previous
    getCharacters(url)
  }

  const handleReset = () => {
    getCharacters()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    //obtener input y luego su valor
    const input = event.target.search
    const search = input.value

    //call to api search endpoint
    const { results, next, previous } =  await searchCharacter(search)
    setCharacters(results)
    setNext(next)
    setPrevious(previous)
    //set loading
    setLoading(false)
    //limpiar input
    input.value = ''
  }

  return (
    <>
      <main>
        <section>
          <h1>Junior React Test</h1>
          <p>API StarWars</p>
        </section>
        <div className='search'>
          <form onSubmit={handleSubmit} aria-label='Search Character Form' >
            <label htmlFor='search'>Search Character: </label>
            <input type='text' id='search' name='search' required placeholder='Anakin' />
            {
              loading ? <button className='btn' disabled>Search</button> : <button className='btn' type='submit'>Search</button>
            }
          </form>
          <button className='btn' onClick={handleReset} disabled={loading} >Reset</button>
        </div>
        <div className='page-controllers'>
          {
            previous ? <button className='btn' onClick={handlePrevius}>Previous</button>
              : <button className='btn' disabled>Previous</button>
          }
          {
            next ? <button className='btn' onClick={handleNext}>Next</button>
              : <button className='btn' disabled>Next</button>
          }
        </div>
        <div className='listed-characters'>
          <h2>All Characters</h2>
          <ul className='listed-characters-list'>
            {
              loading? <p>Loading...</p> :
              characters.map((character) => {
                return (
                  <li key={character.name}>
                    <div className='character-name'>
                      <p><strong>{character.name}</strong></p>
                    </div>
                    <div className='character-info'>
                      <p>{character.height}</p>
                      <p>{character.birth_year}</p>
                      <p>{character.gender}</p>
                    </div>
                  </li>)
              })}
          </ul>
        </div>

      </main>
    </>
  )
}

export default App

const ALL_CHAR_API_ENDPOINT = 'https://swapi.dev/api/people/'
const BASE_SEARCH_CHAR_API = 'https://swapi.dev/api/people/?search='

export const getAllCharacters = async (url = ALL_CHAR_API_ENDPOINT) => {
    const response = await fetch(url)
    const data = await response.json()
    return { results: data.results, next: data.next, previous: data.previous }
}

export const searchCharacter = async (searchTerm) => {
    const response = await fetch(`${BASE_SEARCH_CHAR_API}${searchTerm}`)
    const data = await response.json()
    return { results: data.results, next: data.next, previous: data.previous }
}

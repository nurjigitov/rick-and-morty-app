// Rick and Morty API integration
const BASE_URL = "https://rickandmortyapi.com/api"

export interface Character {
  id: number
  name: string
  status: "Alive" | "Dead" | "unknown"
  species: string
  type: string
  gender: "Female" | "Male" | "Genderless" | "unknown"
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface ApiResponse<T> {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T[]
}

// Characters API
export async function getCharacters(page = 1, name?: string): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams()
  params.append("page", page.toString())
  if (name) params.append("name", name)

  const url = `${BASE_URL}/character?${params}`
  console.log("[v0] Fetching characters from:", url)

  try {
    const response = await fetch(url)
    console.log("[v0] Response status:", response.status)

    if (response.status === 404 && name) {
      console.log("[v0] No characters found for search term:", name)
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      }
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API Error:", errorText)
      throw new Error(`Failed to fetch characters: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("[v0] Characters fetched successfully:", data.results?.length || 0)
    return data
  } catch (error) {
    console.error("[v0] Fetch error:", error)
    throw error
  }
}

export async function getCharacter(id: number): Promise<Character> {
  const url = `${BASE_URL}/character/${id}`
  console.log("[v0] Fetching character from:", url)

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch character: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error("[v0] Character fetch error:", error)
    throw error
  }
}

// Episodes API
export async function getEpisodes(page = 1, name?: string): Promise<ApiResponse<Episode>> {
  const params = new URLSearchParams()
  params.append("page", page.toString())
  if (name) params.append("name", name)

  const url = `${BASE_URL}/episode?${params}`

  try {
    const response = await fetch(url)

    if (response.status === 404 && name) {
      console.log("[v0] No episodes found for search term:", name)
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      }
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error("[v0] Episodes fetch error:", error)
    throw error
  }
}

export async function getEpisode(id: number): Promise<Episode> {
  const url = `${BASE_URL}/episode/${id}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch episode: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error("[v0] Episode fetch error:", error)
    throw error
  }
}

// Locations API
export async function getLocations(page = 1, name?: string): Promise<ApiResponse<Location>> {
  const params = new URLSearchParams()
  params.append("page", page.toString())
  if (name) params.append("name", name)

  const url = `${BASE_URL}/location?${params}`

  try {
    const response = await fetch(url)

    if (response.status === 404 && name) {
      console.log("[v0] No locations found for search term:", name)
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      }
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error("[v0] Locations fetch error:", error)
    throw error
  }
}

export async function getLocation(id: number): Promise<Location> {
  const url = `${BASE_URL}/location/${id}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    console.error("[v0] Location fetch error:", error)
    throw error
  }
}

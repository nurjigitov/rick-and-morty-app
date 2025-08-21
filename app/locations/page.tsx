"use client"

import { useState, useEffect } from "react"
import { getLocations, type Location, type ApiResponse } from "@/lib/api"
import { LocationCard } from "@/components/location-card"
import { SearchBar } from "@/components/search-bar"
import { Pagination } from "@/components/pagination"
import { Loader2 } from "lucide-react"

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchLocations = async (page: number, name?: string) => {
    try {
      setLoading(true)
      setError(null)
      const response: ApiResponse<Location> = await getLocations(page, name)
      setLocations(response.results)
      setTotalPages(response.info.pages)
    } catch (err) {
      setError("Не удалось загрузить локации. Попробуйте еще раз.")
      console.error("Error fetching locations:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLocations(currentPage, searchQuery || undefined)
  }, [currentPage, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Локации Rick & Morty</h1>
        <SearchBar onSearch={handleSearch} placeholder="Поиск локаций..." className="max-w-md" />
      </div>

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchLocations(currentPage, searchQuery || undefined)}
            className="text-primary hover:underline"
          >
            Попробовать снова
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Загрузка локаций...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>

          {locations.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {searchQuery ? "Локации не найдены" : "Нет локаций для отображения"}
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  )
}

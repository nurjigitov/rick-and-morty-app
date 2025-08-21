import { notFound } from "next/navigation"
import Link from "next/link"
import { getLocation, getCharacter } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Users, Globe } from "lucide-react"
import Image from "next/image"

interface LocationPageProps {
  params: { id: string }
}

export default async function LocationPage({ params }: LocationPageProps) {
  try {
    const location = await getLocation(Number.parseInt(params.id))

    // Получаем информацию о первых нескольких жителях
    const residentIds = location.residents
      .slice(0, 12)
      .map((url) => {
        const match = url.match(/\/(\d+)$/)
        return match ? Number.parseInt(match[1]) : null
      })
      .filter(Boolean) as number[]

    const residents = await Promise.all(residentIds.map((id) => getCharacter(id).catch(() => null))).then((results) =>
      results.filter(Boolean),
    )

    const getTypeColor = (type: string) => {
      const lowerType = type.toLowerCase()
      if (lowerType.includes("planet")) return "bg-blue-500"
      if (lowerType.includes("dimension")) return "bg-purple-500"
      if (lowerType.includes("space")) return "bg-indigo-500"
      if (lowerType.includes("microverse")) return "bg-pink-500"
      if (lowerType.includes("resort")) return "bg-green-500"
      return "bg-gray-500"
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/locations">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к локациям
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Location Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-4">{location.name}</h1>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Тип:</span>
                      <span className="text-muted-foreground">{location.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Измерение:</span>
                      <span className="text-muted-foreground">{location.dimension}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Жителей:</span>
                      <span className="text-muted-foreground">{location.residents.length}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getTypeColor(location.type)} text-white border-0 text-lg px-4 py-2`}
                >
                  {location.type}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Residents */}
          {location.residents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Жители ({location.residents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {residents.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {residents.map((resident) => (
                      <Link key={resident.id} href={`/characters/${resident.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-3">
                            <div className="relative aspect-square mb-2">
                              <Image
                                src={resident.image || "/placeholder.svg"}
                                alt={resident.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <h4 className="font-medium text-sm line-clamp-2 text-center">{resident.name}</h4>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Информация о жителях недоступна</p>
                )}
                {location.residents.length > 12 && (
                  <p className="text-sm text-muted-foreground mt-4">
                    И еще {location.residents.length - 12} жителей...
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Дополнительная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Создана: {new Date(location.created).toLocaleDateString("ru-RU")}</p>
                <p>ID: {location.id}</p>
                <p>Всего жителей: {location.residents.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

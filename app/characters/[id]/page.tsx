import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getCharacter, getEpisode } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, Tv } from "lucide-react"

interface CharacterPageProps {
  params: { id: string }
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  try {
    const character = await getCharacter(Number.parseInt(params.id))

    // Получаем информацию о первых нескольких эпизодах
    const episodeIds = character.episode
      .slice(0, 6)
      .map((url) => {
        const match = url.match(/\/(\d+)$/)
        return match ? Number.parseInt(match[1]) : null
      })
      .filter(Boolean) as number[]

    const episodes = await Promise.all(episodeIds.map((id) => getEpisode(id).catch(() => null))).then((results) =>
      results.filter(Boolean),
    )

    const getStatusColor = (status: string) => {
      switch (status) {
        case "Alive":
          return "bg-green-500"
        case "Dead":
          return "bg-red-500"
        default:
          return "bg-gray-500"
      }
    }

    const getStatusText = (status: string) => {
      switch (status) {
        case "Alive":
          return "Жив"
        case "Dead":
          return "Мертв"
        default:
          return "Неизвестно"
      }
    }

    const getGenderText = (gender: string) => {
      switch (gender) {
        case "Male":
          return "Мужской"
        case "Female":
          return "Женский"
        case "Genderless":
          return "Бесполый"
        default:
          return "Неизвестно"
      }
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/characters">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к персонажам
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Character Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(character.status)} text-white border-0`}>
                      {getStatusText(character.status)}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Вид:</span>
                      <span className="ml-2 text-muted-foreground">{character.species}</span>
                    </div>
                    <div>
                      <span className="font-medium">Пол:</span>
                      <span className="ml-2 text-muted-foreground">{getGenderText(character.gender)}</span>
                    </div>
                    {character.type && (
                      <div>
                        <span className="font-medium">Тип:</span>
                        <span className="ml-2 text-muted-foreground">{character.type}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Origin and Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Происхождение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{character.origin.name}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Текущая локация
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{character.location.name}</p>
                </CardContent>
              </Card>
            </div>

            {/* Episodes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tv className="h-5 w-5" />
                  Эпизоды ({character.episode.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {episodes.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {episodes.map((episode) => (
                      <Link key={episode.id} href={`/episodes/${episode.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h4 className="font-medium line-clamp-1">{episode.name}</h4>
                                <p className="text-sm text-muted-foreground">{episode.episode}</p>
                              </div>
                              <Badge variant="outline">{episode.air_date}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Информация об эпизодах недоступна</p>
                )}
                {character.episode.length > 6 && (
                  <p className="text-sm text-muted-foreground mt-4">И еще {character.episode.length - 6} эпизодов...</p>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Дополнительная информация
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>Создан: {new Date(character.created).toLocaleDateString("ru-RU")}</p>
                  <p>ID: {character.id}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

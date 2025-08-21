import { notFound } from "next/navigation"
import Link from "next/link"
import { getEpisode, getCharacter } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Users, Tv } from "lucide-react"
import Image from "next/image"

interface EpisodePageProps {
  params: { id: string }
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  try {
    const episode = await getEpisode(Number.parseInt(params.id))

    // Получаем информацию о первых нескольких персонажах
    const characterIds = episode.characters
      .slice(0, 12)
      .map((url) => {
        const match = url.match(/\/(\d+)$/)
        return match ? Number.parseInt(match[1]) : null
      })
      .filter(Boolean) as number[]

    const characters = await Promise.all(characterIds.map((id) => getCharacter(id).catch(() => null))).then((results) =>
      results.filter(Boolean),
    )

    const getSeasonFromEpisode = (episodeCode: string) => {
      const match = episodeCode.match(/S(\d+)E(\d+)/)
      if (match) {
        return {
          season: Number.parseInt(match[1]),
          episode: Number.parseInt(match[2]),
        }
      }
      return null
    }

    const episodeInfo = getSeasonFromEpisode(episode.episode)

    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/episodes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к эпизодам
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Episode Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{episode.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4" />
                      <span>{episode.episode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{episode.air_date}</span>
                    </div>
                  </div>
                </div>
                {episodeInfo && (
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Сезон {episodeInfo.season}, Эпизод {episodeInfo.episode}
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Characters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Персонажи ({episode.characters.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {characters.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {characters.map((character) => (
                    <Link key={character.id} href={`/characters/${character.id}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-3">
                          <div className="relative aspect-square mb-2">
                            <Image
                              src={character.image || "/placeholder.svg"}
                              alt={character.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <h4 className="font-medium text-sm line-clamp-2 text-center">{character.name}</h4>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Информация о персонажах недоступна</p>
              )}
              {episode.characters.length > 12 && (
                <p className="text-sm text-muted-foreground mt-4">
                  И еще {episode.characters.length - 12} персонажей...
                </p>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Дополнительная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Создан: {new Date(episode.created).toLocaleDateString("ru-RU")}</p>
                <p>ID: {episode.id}</p>
                <p>Всего персонажей: {episode.characters.length}</p>
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

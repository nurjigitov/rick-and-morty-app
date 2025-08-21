import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import type { Episode } from "@/lib/api"

interface EpisodeCardProps {
  episode: Episode
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
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
    <Link href={`/episodes/${episode.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {episode.name}
            </h3>
            {episodeInfo && (
              <Badge variant="secondary" className="shrink-0">
                S{episodeInfo.season}E{episodeInfo.episode}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{episode.air_date}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{episode.characters.length} персонажей</span>
            </div>

            <div className="text-sm">
              <span className="font-medium text-foreground">Эпизод:</span>
              <span className="text-muted-foreground ml-1">{episode.episode}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

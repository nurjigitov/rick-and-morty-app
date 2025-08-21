import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Character } from "@/lib/api"

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
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

  return (
    <Link href={`/characters/${character.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative aspect-square">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className={`${getStatusColor(character.status)} text-white border-0`}>
              {getStatusText(character.status)}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {character.name}
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Вид:</span> {character.species}
            </p>
            <p>
              <span className="font-medium">Пол:</span>{" "}
              {character.gender === "Male" ? "Мужской" : character.gender === "Female" ? "Женский" : character.gender}
            </p>
            <p className="line-clamp-1">
              <span className="font-medium">Локация:</span> {character.location.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

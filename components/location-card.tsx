import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Globe } from "lucide-react"
import type { Location } from "@/lib/api"

interface LocationCardProps {
  location: Location
}

export function LocationCard({ location }: LocationCardProps) {
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
    <Link href={`/locations/${location.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {location.name}
            </h3>
            <Badge variant="secondary" className={`${getTypeColor(location.type)} text-white border-0 shrink-0`}>
              {location.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span className="line-clamp-1">{location.dimension}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{location.residents.length} жителей</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Тип:</span>
              <span className="text-muted-foreground">{location.type}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

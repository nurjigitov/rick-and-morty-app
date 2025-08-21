import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Tv, MapPin, Search, Star, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Rick & Morty
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/characters" className="text-muted-foreground hover:text-foreground transition-colors">
                Characters
              </Link>
              <Link href="/episodes" className="text-muted-foreground hover:text-foreground transition-colors">
                Episodes
              </Link>
              <Link href="/locations" className="text-muted-foreground hover:text-foreground transition-colors">
                Locations
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/rick-morty-portal.png" alt="Portal background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-2 gap-4 opacity-80">
              <img
                src="/rick-scientist-portrait.png"
                alt="Rick Sanchez"
                className="w-24 h-24 rounded-full border-4 border-primary/30 hover:scale-110 transition-transform"
              />
              <img
                src="/morty-nervous-portrait.png"
                alt="Morty Smith"
                className="w-24 h-24 rounded-full border-4 border-secondary/30 hover:scale-110 transition-transform"
              />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Explore the Multiverse
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Dive into the chaotic world of Rick and Morty. Discover characters, episodes, and locations from across
            infinite dimensions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/characters">
                <Users className="mr-2 h-5 w-5" />
                Browse Characters
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Link href="/episodes">
                <Tv className="mr-2 h-5 w-5" />
                Watch Episodes
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-muted/20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Meet the Characters</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From genius scientists to interdimensional beings
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all">
              <img
                src="/rick-sanchez-full-body.png"
                alt="Rick Sanchez"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">Rick</div>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-secondary/30 transition-all">
              <img
                src="/morty-smith-full-body.png"
                alt="Morty Smith"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">Morty</div>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all">
              <img
                src="/generic-redhead.png"
                alt="Summer Smith"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">Summer</div>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-secondary/30 transition-all">
              <img
                src="/beth-smith-blonde-coat.png"
                alt="Beth Smith"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">Beth</div>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all">
              <img
                src="/jerry-smith-brown-hair-sweater.png"
                alt="Jerry Smith"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">Jerry</div>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg border-2 border-transparent group-hover:border-secondary/30 transition-all">
              <img
                src="/mr-meeseeks-smile.png"
                alt="Mr. Meeseeks"
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">Meeseeks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">What You Can Explore</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Navigate through the vast Rick and Morty universe with our comprehensive database
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img
                src="/rick-morty-collage.png"
                alt="Characters background"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Characters</CardTitle>
              <CardDescription>Meet all the crazy characters from across the multiverse</CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/characters">
                  <Search className="mr-2 h-4 w-4" />
                  Explore Characters
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img src="/rick-morty-scenes.png" alt="Episodes background" className="w-full h-full object-cover" />
            </div>
            <CardHeader className="text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Tv className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Episodes</CardTitle>
              <CardDescription>Browse through all episodes and their wild adventures</CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/episodes">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Episodes
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20 md:col-span-2 lg:col-span-1 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img src="/rick-morty-dimensions.png" alt="Locations background" className="w-full h-full object-cover" />
            </div>
            <CardHeader className="text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Locations</CardTitle>
              <CardDescription>Discover strange worlds and dimensions from the show</CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/locations">
                  <Search className="mr-2 h-4 w-4" />
                  Find Locations
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/30 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src="/rick-morty-multiverse.png" alt="Multiverse background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Explore the Numbers</h3>
            <p className="text-muted-foreground">Infinite possibilities across dimensions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 group">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-primary mr-2 group-hover:animate-pulse" />
                <div className="text-4xl font-bold text-primary">800+</div>
              </div>
              <div className="text-muted-foreground">Characters</div>
            </div>
            <div className="space-y-2 group">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-secondary mr-2 group-hover:animate-pulse" />
                <div className="text-4xl font-bold text-secondary">50+</div>
              </div>
              <div className="text-muted-foreground">Episodes</div>
            </div>
            <div className="space-y-2 group">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary mr-2 group-hover:animate-pulse" />
                <div className="text-4xl font-bold text-primary">100+</div>
              </div>
              <div className="text-muted-foreground">Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Built with Next.js and powered by the Rick and Morty API</p>
          <p className="text-sm text-muted-foreground mt-2">© 2024 Rick & Morty Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

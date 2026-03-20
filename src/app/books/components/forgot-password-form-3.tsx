"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, BookOpen, Star } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Book {
  id: number
  title: string
  author: string
  cover: string
  genre?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const trendingBooks: Book[] = [
  {
    id: 1,
    title: "A Palm from Our Future",
    author: "Simon Noah",
    cover: "https://covers.openlibrary.org/b/id/8739161-M.jpg",
    genre: "Fiction",
  },
  {
    id: 2,
    title: "The Black Universe",
    author: "Chris Mar Evans",
    cover: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
    genre: "Sci-Fi",
  },
  {
    id: 3,
    title: "Nefarious Games",
    author: "Ana Park",
    cover: "https://covers.openlibrary.org/b/id/10909258-M.jpg",
    genre: "Thriller",
  },
  {
    id: 4,
    title: "The Four of Us",
    author: "Claudia Wilson",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 5,
    title: "Midnight Garden",
    author: "Lena Cole",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Mystery",
  },
  {
    id: 6,
    title: "Broken Threads",
    author: "Marco Vidal",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Drama",
  },
    {
    id: 10,
    title: "Our Last Summer",
    author: "Celine Dubois",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 11,
    title: "The Quiet Hours",
    author: "James Farrow",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Fiction",
  },
  {
    id: 12,
    title: "Urban Roots",
    author: "Zara Okonkwo",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Biography",
  },
    {
    id: 10,
    title: "Our Last Summer",
    author: "Celine Dubois",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 11,
    title: "The Quiet Hours",
    author: "James Farrow",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Fiction",
  },
  {
    id: 12,
    title: "Urban Roots",
    author: "Zara Okonkwo",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Biography",
  },
    {
    id: 10,
    title: "Our Last Summer",
    author: "Celine Dubois",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 11,
    title: "The Quiet Hours",
    author: "James Farrow",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Fiction",
  },
  {
    id: 12,
    title: "Urban Roots",
    author: "Zara Okonkwo",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Biography",
  },
    {
    id: 10,
    title: "Our Last Summer",
    author: "Celine Dubois",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 11,
    title: "The Quiet Hours",
    author: "James Farrow",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Fiction",
  },
  {
    id: 12,
    title: "Urban Roots",
    author: "Zara Okonkwo",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Biography",
  },
]

const recommendedBooks: Book[] = [
  {
    id: 7,
    title: "Journaling",
    author: "Laura Stoddard",
    cover: "https://covers.openlibrary.org/b/id/8739161-M.jpg",
    genre: "Self-Help",
  },
  {
    id: 8,
    title: "Things I Never Said",
    author: "Emilie Claessens",
    cover: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
    genre: "Memoir",
  },
  {
    id: 9,
    title: "Daily Beauty Tips",
    author: "Olivia Wilson",
    cover: "https://covers.openlibrary.org/b/id/10909258-M.jpg",
    genre: "Lifestyle",
  },
  {
    id: 10,
    title: "Our Last Summer",
    author: "Celine Dubois",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 11,
    title: "The Quiet Hours",
    author: "James Farrow",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Fiction",
  },
  {
    id: 12,
    title: "Urban Roots",
    author: "Zara Okonkwo",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Biography",
  },
    {
    id: 10,
    title: "Our Last Summer",
    author: "Celine Dubois",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 11,
    title: "The Quiet Hours",
    author: "James Farrow",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Fiction",
  },
  {
    id: 12,
    title: "Urban Roots",
    author: "Zara Okonkwo",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Biography",
  },
    {
    id: 10,
    title: "Our Last Summer",
    author: "Celine Dubois",
    cover: "https://covers.openlibrary.org/b/id/8739398-M.jpg",
    genre: "Romance",
  },
  {
    id: 11,
    title: "The Quiet Hours",
    author: "James Farrow",
    cover: "https://xesriqgabqpgkbkubpll.supabase.co/storage/v1/object/public/tets/Academic-Book-Cover-Template-edit-online.png",
    genre: "Fiction",
  },
  {
    id: 12,
    title: "Urban Roots",
    author: "Zara Okonkwo",
    cover: "https://covers.openlibrary.org/b/id/10527843-M.jpg",
    genre: "Biography",
  },
]

const bookOfYear = [
  { rank: 1, title: "Happiness is Habit", author: "Margarita Perez", genre: "Self-Help", color: "#f59e0b" },
  { rank: 2, title: "The Value of Design", author: "Patrick Ness", genre: "Philosophy", color: "#8b5cf6" },
  { rank: 3, title: "The Guardian of Life", author: "Eric Drooker", genre: "Fiction", color: "#10b981" },
  { rank: 4, title: "Friend", author: "Daniel Gallego", genre: "Drama", color: "#3b82f6" },
  { rank: 5, title: "How to be Creative", author: "Kumbokaima", genre: "Self-Improvement", color: "#f43f5e" },
]

// ─── Book Card ─────────────────────────────────────────────────────────────────

const BOOK_COLORS = [
  "#c0392b","#27ae60","#2980b9","#8e44ad","#e67e22","#16a085",
  "#d35400","#1abc9c","#2c3e50","#f39c12","#7f8c8d","#e74c3c",
]

function BookCard({ book }: { book: Book }) {
  return (
    <div className="flex-none w-[clamp(90px,22vw,130px)] snap-start group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-muted shadow-sm group-hover:shadow-md transition-shadow duration-200"
        style={{ aspectRatio: "2/3" }}>
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const img = e.currentTarget
            img.style.display = "none"
            const parent = img.parentElement
            if (parent && !parent.querySelector(".fallback-label")) {
              parent.style.background = BOOK_COLORS[book.id % BOOK_COLORS.length]
              const label = document.createElement("div")
              label.className = "fallback-label"
              label.style.cssText =
                "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;font-size:11px;font-weight:700;color:white;line-height:1.3;"
              label.textContent = book.title
              parent.appendChild(label)
            }
          }}
        />
        {book.genre && (
          <div className="absolute top-1.5 left-1.5">
            <span className="text-[9px] font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm leading-none">
              {book.genre}
            </span>
          </div>
        )}
      </div>
      <p className="mt-1.5 text-[11px] font-semibold text-foreground leading-tight line-clamp-2">{book.title}</p>
      <p className="text-[10px] text-muted-foreground line-clamp-1">by {book.author}</p>
    </div>
  )
}

// ─── Horizontal Scroll Row ─────────────────────────────────────────────────────

function HorizontalScrollRow({ books, title, showSeeAll = true }: {
  books: Book[]
  title: string
  showSeeAll?: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const w = scrollRef.current.querySelector<HTMLElement>(".snap-start")?.offsetWidth ?? 140
    scrollRef.current.scrollBy({ left: dir === "right" ? w + 12 : -(w + 12), behavior: "smooth" })
  }

  return (
    
    <section className="space-y-3 w-full min-w-0 ">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2 flex-shrink-0">
          {showSeeAll && (
            <button className="text-xs text-muted-background font-medium hover:underline whitespace-nowrap">
              See All
            </button>
          )}
          <div className="flex gap-1">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-border bg-primary p-1 shadow-sm hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-3 w-3 hover:text-primary text-primary-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-border bg-primary p-1 shadow-sm hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-3 w-3 hover:text-primary text-primary-foreground " />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BookReaderApp({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full min-h-screen bg-background text-foreground", className)}
      {...props}
    >


      {/* Body: responsive two-column */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-5 w-full min-w-0">

          {/* ── Main content (left) ── */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">

            {/* Continue Reading Card */}
            <Card className="overflow-hidden border border-border shadow-sm w-full">
              <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                        Continue Reading
                      </p>
                      <h2 className="text-base sm:text-lg font-bold leading-snug text-foreground mb-1.5">
                        The Beauty of the Night
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        Growing up in a small rice-farming village in 1960s Iran, eleven-year-old Saba Hafizi and her twin sister, Mahtab, are captivated by America. They dream of a life beyond the village, full of freedom.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-4 rounded-full font-semibold flex-shrink-0"
                      >
                        <BookOpen className="h-3 w-3 mr-1.5" />
                        Read Now
                      </Button>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">• Page 53 of 184</span>
                    </div>
                  </div>

                  {/* Book cover */}
                  <div className="flex-none w-[80px] sm:w-[100px]">
                    <div
                      className="relative rounded-xl overflow-hidden shadow-lg"
                      style={{
                        aspectRatio: "2/3",
                        background: "linear-gradient(160deg, #1e293b 0%, #0f172a 60%, #1a3a2a 100%)",
                      }}
                    >
                      <div className="absolute inset-0 flex items-end p-2">
                        <div className="w-full">
                          <p className="text-[7px] text-emerald-400 font-semibold uppercase tracking-wider mb-0.5">The</p>
                          <p className="text-xs font-black text-white leading-none">Beauty</p>
                          <p className="text-[8px] font-light text-slate-300 leading-tight">of the Night</p>
                        </div>
                      </div>
                      {/* Stars */}
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white pointer-events-none"
                          style={{
                            width: i % 3 === 0 ? 2 : 1,
                            height: i % 3 === 0 ? 2 : 1,
                            top: `${(i * 13 + 7) % 85}%`,
                            left: `${(i * 23 + 5) % 90}%`,
                            opacity: 0.3 + (i % 5) * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-4 pb-4">
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${(53 / 184) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending & Recommended */}
            <HorizontalScrollRow books={trendingBooks} title="Trending Now" />


            <HorizontalScrollRow books={recommendedBooks} title="Recommended for You" />
              <HorizontalScrollRow books={recommendedBooks} title="Latest Academic Work" />
          </div>

          {/* ── Sidebar (right) ── */}
          <div className="flex flex-col gap-4 w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">

            {/* Join Community CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-emerald-600 p-5 text-white shadow-md">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-500/40 pointer-events-none" />
              <div className="absolute -bottom-8 -left-4 h-28 w-28 rounded-full bg-emerald-700/40 pointer-events-none" />
              <div className="relative">
                <h2 className="text-lg font-extrabold leading-snug mb-4">
                  Join our book lovers community here now
                </h2>
                <Button
                  size="sm"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold text-xs h-8 px-5 rounded-full shadow"
                >
                  Join Now
                </Button>
              </div>
            </div>

            {/* Book of the Year */}
            <Card className="border border-border shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  Book of the Year
                </h2>
                <div className="flex flex-col gap-3">
                  {bookOfYear.map((book) => (
                    <div key={book.rank} className="flex items-center gap-3 group cursor-pointer">
                      <div
                        className="w-8 h-10 rounded-md flex-none shadow-sm"
                        style={{ backgroundColor: book.color, opacity: 0.85 }}
                      />
                      <div className="flex items-start gap-1.5 min-w-0 flex-1">
                        <span className="text-xs font-bold text-muted-foreground mt-0.5 w-3 flex-none">{book.rank}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground leading-tight group-hover:text-emerald-500 transition-colors line-clamp-1">
                            {book.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            <span className="uppercase tracking-wide opacity-60 mr-1">{book.genre}</span>
                            by {book.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
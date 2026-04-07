"use client"

import { useState, useEffect } from "react"
import { Search, X, ChevronDown, Check, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContinueReadingCard } from "./ContinueReadingCard"
import { HorizontalScrollRow } from "./HorizontalScrollRow"
import { CommunityCTA, BookOfYearList } from "./Sidebar"
import { bookOfYear } from "./data"
import { VerticalBookRow } from "./VerticalScollRow"
import { usePhysicalBookSearch, usePhysicalBookList } from "@/hooks/use-physicalbooks"
import type { PhysicalBookItem } from "@/hooks/use-physicalbooks"
import { groupByCategory, toBook } from "../types/mapbooks"
import type { Book } from "../types/book"
import { BookDetailPage } from "./bookdetail"
import { useCategoryList } from "@/hooks/useCategory"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const CURRENT_BOOK = {
  title: "The Beauty of the Night",
  description:
    "Growing up in a small rice-farming village in 1960s Iran, eleven-year-old Saba Hafizi and her twin sister, Mahtab, are captivated by America. They dream of a life beyond the village, full of freedom.",
  currentPage: 53,
  totalPages: 184,
}

export function BookReaderApp({ className, ...props }: React.ComponentProps<"div">) {
  const [query, setQuery] = useState("")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  // A query OR a category selection both trigger server-side search/filter
  const isSearching = query.trim().length > 0 || selectedCategoryId !== null

  const { data: searchData, isLoading: searchLoading, search } = usePhysicalBookSearch()
  // fetchAll accepts an optional category param — pass it so the list is server-filtered
  const { data: allBooks, fetchAll } = usePhysicalBookList()
  const { data: categories, fetchAll: fetchCategories } = useCategoryList()

  // Initial load — no category
  useEffect(() => {
    fetchAll()
    fetchCategories()
  }, [fetchAll, fetchCategories])

  // Re-run server search whenever query OR category changes
  useEffect(() => {
    if (!isSearching) return

    const timer = setTimeout(() => {
      search({
        query: query.trim() || undefined,
        // Pass category as string ID to match your API shape (same as useResearchSearch)
        category: selectedCategoryId !== null ? String(selectedCategoryId) : undefined,
      })
    }, 400)

    return () => clearTimeout(timer)
  }, [query, selectedCategoryId, isSearching, search])

  // Default view: group all books (no client-side category filtering needed —
  // category is handled server-side via search when selected)
  const groups = groupByCategory(allBooks ?? [])

  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId)

  // Search results come back already filtered from the server
  const searchResults = searchData?.results ?? []

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSelectPhysical = (item: PhysicalBookItem) => {
    setSelectedBook(toBook(item))
  }

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book)
  }

  const handleCategorySelect = (id: number | null) => {
    setSelectedCategoryId(id)
  }

  // ── Detail page ───────────────────────────────────────────────────────────
  if (selectedBook) {
    return (
      <BookDetailPage
        book={selectedBook}
        onBack={() => setSelectedBook(null)}
      />
    )
  }

  // ── Main view ─────────────────────────────────────────────────────────────
  return (
    <div className={cn("w-full min-h-screen bg-background text-foreground", className)} {...props}>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">

        {/* ── Search bar + Category filter ── */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2">
          <div className="flex items-center gap-2 max-w-xl">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books, authors, topics…"
                className="w-full h-9 rounded-md border border-border pl-8 pr-8 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category filter dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 gap-1.5 rounded-md border-border text-xs font-normal shrink-0 transition",
                    selectedCategoryId && "border-primary/50 bg-primary/5 text-primary"
                  )}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {selectedCategory ? selectedCategory.name : "Category"}
                  </span>
                  {selectedCategoryId && (
                    <Badge
                      variant="secondary"
                      className="h-4 w-4 rounded-md p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground ml-0.5"
                    >
                      1
                    </Badge>
                  )}
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  Filter by category
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* All categories option */}
                <DropdownMenuItem
                  onClick={() => handleCategorySelect(null)}
                  className="flex items-center justify-between text-xs cursor-pointer"
                >
                  <span>All categories</span>
                  {selectedCategoryId === null && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Category list */}
                {!categories && (
                  <div className="px-2 py-3 flex flex-col gap-1.5 animate-pulse">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-3 bg-muted rounded w-full" />
                    ))}
                  </div>
                )}

                {categories?.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="flex items-center justify-between text-xs cursor-pointer"
                  >
                    <span>{category.name}</span>
                    {selectedCategoryId === category.id && (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}

                {categories?.length === 0 && (
                  <div className="px-2 py-3 text-xs text-muted-foreground text-center">
                    No categories found
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Active filter pill */}
          {selectedCategoryId && (
            <div className="flex items-center gap-1.5 mt-2 max-w-xl">
              <span className="text-xs text-muted-foreground">Filtering by:</span>
              <button
                onClick={() => handleCategorySelect(null)}
                className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary rounded-md px-2.5 py-0.5 hover:bg-primary/20 transition"
              >
                {selectedCategory?.name}
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* ── Search / category results ── */}
        {isSearching ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground px-1">
              {searchLoading
                ? "Searching…"
                : `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}${query.trim() ? " for " : ""}`}
              {!searchLoading && query.trim() && (
                <span className="font-semibold text-foreground">"{query}"</span>
              )}
              {!searchLoading && selectedCategoryId && (
                <span> in <span className="font-semibold text-foreground">{selectedCategory?.name}</span></span>
              )}
            </p>

            {searchLoading && (
              <div className="flex flex-col gap-3 px-2 pt-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3 items-start animate-pulse">
                    <div className="rounded-md bg-muted flex-none" style={{ width: 52, height: 74 }} />
                    <div className="flex flex-col gap-2 flex-1 pt-1">
                      <div className="h-2.5 bg-muted rounded w-1/3" />
                      <div className="h-3 bg-muted rounded w-3/4" />
                      <div className="h-2.5 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!searchLoading && searchResults.length > 0 && (
              <div className="flex flex-col">
                {searchResults.map((book) => (
                  <VerticalBookRow
                    key={book.id}
                    book={book}
                    onSelect={handleSelectPhysical}
                  />
                ))}
              </div>
            )}

            {!searchLoading && searchResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
                <Search className="h-8 w-8 opacity-20" />
                <p className="text-xs">
                  {query.trim()
                    ? `No books found for "${query}"${selectedCategoryId ? ` in "${selectedCategory?.name}"` : ""}`
                    : `No books found in "${selectedCategory?.name}"`}
                </p>
                {selectedCategoryId && (
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    Clear category filter
                  </button>
                )}
              </div>
            )}
          </div>

        ) : (

          /* ── Default view ── */
          <div className="flex flex-col lg:flex-row gap-5 w-full min-w-0">
            <div className="flex flex-col gap-5 flex-1 min-w-0">
              <ContinueReadingCard {...CURRENT_BOOK} />

              {groups.map((group) => (
                <HorizontalScrollRow
                  key={group.category ?? "__none__"}
                  title={group.category_name}
                  books={group.books}
                  onSelect={handleSelectBook}
                />
              ))}

              {/* Empty state */}
              {allBooks && groups.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
                  <SlidersHorizontal className="h-8 w-8 opacity-20" />
                  <p className="text-xs">No books available</p>
                </div>
              )}

              {/* Skeleton while loading */}
              {!allBooks && (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-3 animate-pulse">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="flex gap-3 overflow-x-hidden">
                      {Array.from({ length: 9 }).map((_, j) => (
                        <div key={j} className="flex-none w-[clamp(90px,22vw,130px)] flex flex-col gap-1.5">
                          <div className="rounded-lg bg-muted w-full" style={{ aspectRatio: "2/3" }} />
                          <div className="h-2.5 bg-muted rounded w-3/4" />
                          <div className="h-2 bg-muted rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">
              <CommunityCTA />
              <BookOfYearList entries={bookOfYear} />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
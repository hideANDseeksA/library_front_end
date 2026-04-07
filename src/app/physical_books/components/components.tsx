// ─────────────────────────────────────────────────────────────────────────────
// ResearchPage — main page, wires all components together
// ─────────────────────────────────────────────────────────────────────────────

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BookOpen } from "lucide-react"

import { usePapers } from "./papers"              // ← replaces static import
import { HorizontalScrollRow } from "./HorizontalScrollRow"
import { VerticalPaperRow } from "./VerticalPaperRow"
import { BestThesesSidebar } from "./BestThesesSidebar"
import { PaperDetailPage } from "./PaperDetailPage"
import type { Paper } from "./paper"

export function ResearchPage({ className, ...props }: React.ComponentProps<"div">) {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)

  const { trendingPapers, allPapers, bestTheses, isLoading, error } = usePapers()

  if (selectedPaper) {
    return <PaperDetailPage paper={selectedPaper} onBack={() => setSelectedPaper(null)} />
  }

  return (
    <div className={cn("w-full min-h-screen bg-background text-foreground", className)} {...props}>
      <div className="px-4 sm:px-6 lg:px-8 pb-8">

        {/* ── Loading / error states ── */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
            Loading research...
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-20 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* ── Main layout (only render when data is ready) ── */}
        {!isLoading && !error && (
          <div className="flex flex-col lg:flex-row gap-6 w-full min-w-0">

            {/* ── Main content ── */}
            <div className="flex flex-col gap-5 flex-1 min-w-0">

              {/* Horizontal trending row */}
              <HorizontalScrollRow
                papers={trendingPapers}
                title="Trending Research"
                onSelect={setSelectedPaper}
              />

              {/* Vertical all-papers list */}
              <section>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    All Publications
                  </h2>
                  <span className="text-xs text-muted-foreground">{allPapers.length} papers</span>
                </div>
                <div className="flex flex-col">
                  {allPapers.map((paper) => (
                    <VerticalPaperRow key={paper.id} paper={paper} onSelect={setSelectedPaper} />
                  ))}
                </div>
              </section>
            </div>

            {/* ── Sidebar ── */}
            <div className="flex flex-col gap-4 w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">
              <BestThesesSidebar
                allPapers={[...trendingPapers, ...allPapers]}
                bestTheses={bestTheses}                    // ← new prop
                onSelect={setSelectedPaper}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default ResearchPage
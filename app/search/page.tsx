"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { filterSearchResults } from "@/lib/search-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredResults = filterSearchResults(query);
  const hasSearched = query.trim().length > 0;

  return (
    <main className="flex min-h-screen flex-col w-full bg-background pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-12">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search OsmeKos..."
            className="w-full pl-16 pr-16 py-6 text-xl md:text-2xl font-heading bg-white rounded-full border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="flex flex-col gap-6">
          {!hasSearched ? (
            <div className="py-24 text-center flex flex-col items-center gap-4 text-muted-foreground">
              <Search className="w-12 h-12 opacity-20" />
              <p className="text-lg">Try searching for &ldquo;Ceramides&rdquo;, &ldquo;Shea Butter&rdquo;, or &ldquo;Our Story&rdquo;.</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {filteredResults.length} {filteredResults.length === 1 ? "Result" : "Results"}
              </span>
              <ul className="flex flex-col gap-4">
                {filteredResults.map((result) => (
                  <li key={result.title}>
                    <Link 
                      href={result.href}
                      className="group block p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <h3 className="text-xl font-heading font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                        {result.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="py-24 text-center flex flex-col items-center gap-4 text-muted-foreground">
              <X className="w-12 h-12 opacity-20" />
              <p className="text-lg">No results found for &ldquo;{query}&rdquo;.</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-primary hover:underline text-sm font-medium mt-2"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

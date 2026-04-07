// ─────────────────────────────────────────────────────────────────────────────
// Department Color Map
// Usage: import { getDeptTheme, DEPARTMENT_THEMES } from "@/lib/departmentThemes"
// ─────────────────────────────────────────────────────────────────────────────

export const DEPARTMENT_THEMES: Record<
  string,
  { bgColor: string; textColor: string; accentColor: string; label: string }
> = {
  "College of Education":   { bgColor: "#1A3A6B", textColor: "#FFFFFF", accentColor: "#93C5FD", label: "COEd" },
  "College of Computer Studies":                    { bgColor: "#14532D", textColor: "#FFFFFF", accentColor: "#6EE7B7", label: "CCS"  },
  "Criminology":            { bgColor: "#5C1A1A", textColor: "#FFFFFF", accentColor: "#FCA5A5", label: "CRIM" },
  "Liberal Arts":           { bgColor: "#3B0764", textColor: "#FFFFFF", accentColor: "#C4B5FD", label: "CLA"  },
  "CBAA":                   { bgColor: "#dab204", textColor: "#FFFFFF", accentColor: "#fffaea", label: "CBAA" },
  "Senior High School":     { bgColor: "#7F1D1D", textColor: "#FFFFFF", accentColor: "#FCA5A5", label: "SHS"  },
  "College of Engineering": { bgColor: "#4e0055", textColor: "#FFFFFF", accentColor: "#c06be7", label: "GS"   },
  "College of Medicine":    { bgColor: "#064E3B", textColor: "#FFFFFF", accentColor: "#34D399", label: "COM"  },
  "College of Nursing":     { bgColor: "#cc5d03", textColor: "#FFFFFF", accentColor: "#F9A8D4", label: "CMN"  },
  "College of Law":         { bgColor: "#1E293B", textColor: "#E2E8F0", accentColor: "#94A3B8", label: "LAW"  },
}

export function getDeptTheme(dept: string) {
  return (
    DEPARTMENT_THEMES[dept] ?? {
      bgColor: "#1A2744",
      textColor: "#FFFFFF",
      accentColor: "#5BA3D9",
      label: dept,
    }
  )
}
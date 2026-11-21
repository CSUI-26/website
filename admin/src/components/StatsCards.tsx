import React from "react";
import { Users, Code, Terminal, Globe2, Brain } from "lucide-react";
import type { Member } from "../types/member";

interface StatsCardsProps {
  members: Member[];
  selectedMajor: string;
  onSelectMajor: (major: string) => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  members,
  selectedMajor,
  onSelectMajor,
}) => {
  const stats = React.useMemo(() => {
    let cs = 0;
    let is_ = 0;
    let kki = 0;
    let ai = 0;

    for (const m of members) {
      if (m.major === "Ilmu Komputer") cs++;
      else if (m.major === "Sistem Informasi") is_++;
      else if (m.major === "Ilmu Komputer KKI") kki++;
      else if (m.major === "Kecerdasan Artifisial") ai++;
    }

    return { total: members.length, cs, is: is_, kki, ai };
  }, [members]);

  const cards = [
    {
      id: "ALL",
      label: "All Members",
      count: stats.total,
      icon: Users,
      color: "#38bdf8",
      badgeClass: "badge-cs",
    },
    {
      id: "Ilmu Komputer",
      label: "Computer Science",
      count: stats.cs,
      icon: Code,
      color: "#38bdf8",
      badgeClass: "badge-cs",
    },
    {
      id: "Sistem Informasi",
      label: "Information System",
      count: stats.is,
      icon: Terminal,
      color: "#c084fc",
      badgeClass: "badge-is",
    },
    {
      id: "Ilmu Komputer KKI",
      label: "KKI (International)",
      count: stats.kki,
      icon: Globe2,
      color: "#fbbf24",
      badgeClass: "badge-kki",
    },
    {
      id: "Kecerdasan Artifisial",
      label: "Artificial Intelligence",
      count: stats.ai,
      icon: Brain,
      color: "#f472b6",
      badgeClass: "badge-ai",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        margin: "0 1.5rem 1.5rem 1.5rem",
      }}
    >
      {cards.map((card) => {
        const isSelected = selectedMajor === card.id;
        const IconComponent = card.icon;

        return (
          <button
            key={card.id}
            type="button"
            className="glass-panel"
            onClick={() => onSelectMajor(card.id)}
            style={{
              padding: "1.1rem 1.25rem",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.2s ease",
              borderColor: isSelected ? card.color : "rgba(255, 255, 255, 0.1)",
              background: isSelected ? "rgba(30, 41, 59, 0.85)" : "var(--bg-surface)",
              boxShadow: isSelected ? `0 0 20px ${card.color}25` : "none",
            }}
          >
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem", textTransform: "uppercase", fontWeight: 600 }}>
                {card.label}
              </p>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f8fafc" }}>
                {card.count}
              </h3>
            </div>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: `${card.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.color,
                border: `1px solid ${card.color}35`,
              }}
            >
              <IconComponent size={20} />
            </div>
          </button>
        );
      })}
    </div>
  );
};

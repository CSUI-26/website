import React, { useState, useMemo } from "react";
import {
  Search,
  Edit2,
  Trash2,
  Eye,
  Globe,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "./Icons";
import type { Member } from "../types/member";

interface MemberTableProps {
  members: Member[];
  selectedMajor: string;
  onSelectMajor: (major: string) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (member: Member) => void;
  onPreviewMember: (member: Member) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  members,
  selectedMajor,
  onSelectMajor,
  onEditMember,
  onDeleteMember,
  onPreviewMember,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Filter members by selectedMajor and searchQuery
  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return members.filter((m) => {
      const matchesMajor = selectedMajor === "ALL" || m.major === selectedMajor;
      if (!matchesMajor) return false;
      if (!q) return true;

      const nameMatch = m.name?.toLowerCase().includes(q);
      const nicknameMatch = m.nama_panggilan?.toLowerCase().includes(q);
      const npmMatch = m.npm?.toLowerCase().includes(q);
      const nicheMatch = m.niche?.toLowerCase().includes(q);
      const emailMatch = m.email?.toLowerCase().includes(q);

      return nameMatch || nicknameMatch || npmMatch || nicheMatch || emailMatch;
    });
  }, [members, selectedMajor, searchQuery]);

  // Reset to page 1 when filter/search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedMajor, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, currentPage, pageSize]);

  const getMajorBadgeClass = (major: string) => {
    switch (major) {
      case "Ilmu Komputer":
        return "badge-cs";
      case "Sistem Informasi":
        return "badge-is";
      case "Ilmu Komputer KKI":
        return "badge-kki";
      case "Kecerdasan Artifisial":
        return "badge-ai";
      default:
        return "badge-cs";
    }
  };

  const getShortMajor = (major: string) => {
    switch (major) {
      case "Ilmu Komputer":
        return "CS";
      case "Sistem Informasi":
        return "IS";
      case "Ilmu Komputer KKI":
        return "KKI";
      case "Kecerdasan Artifisial":
        return "AI";
      default:
        return major;
    }
  };

  return (
    <div className="glass-panel" style={{ margin: "0 1.5rem 2rem 1.5rem", padding: "1.5rem" }}>
      {/* Controls Bar: Search & Filter Pills */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "280px", flex: "1 1 320px", maxWidth: "480px" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Search by name, nickname, NPM, or niche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.65rem 1rem 0.65rem 2.6rem",
              background: "rgba(0, 0, 0, 0.35)",
              border: "var(--border-glass)",
              borderRadius: "var(--radius-md)",
              color: "#f8fafc",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <Filter size={15} style={{ color: "var(--text-muted)", marginRight: "0.25rem" }} />
          {[
            { id: "ALL", label: "All" },
            { id: "Ilmu Komputer", label: "CS" },
            { id: "Sistem Informasi", label: "IS" },
            { id: "Ilmu Komputer KKI", label: "KKI" },
            { id: "Kecerdasan Artifisial", label: "AI" },
          ].map((tab) => {
            const isActive = selectedMajor === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectMajor(tab.id)}
                style={{
                  padding: "0.4rem 0.85rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  borderRadius: "var(--radius-full)",
                  background: isActive ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.04)",
                  color: isActive ? "#38bdf8" : "var(--text-secondary)",
                  border: isActive ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: "auto", borderRadius: "var(--radius-md)", border: "var(--border-glass)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ background: "rgba(0, 0, 0, 0.4)", borderBottom: "var(--border-glass)" }}>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontWeight: 600 }}>Member</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontWeight: 600 }}>NPM</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontWeight: 600 }}>Major</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontWeight: 600 }}>Niche</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontWeight: 600 }}>Socials</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-muted)", fontWeight: 600, textAlign: "right" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "3rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No members found matching your search criteria.
                </td>
              </tr>
            ) : (
              paginatedMembers.map((member) => {
                const photoUrl = member.foto?.url || "";
                return (
                  <tr
                    key={member.npm}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {/* Member Name + Photo */}
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            flexShrink: 0,
                          }}
                        >
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt={member.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60";
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#38bdf8",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                              }}
                            >
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "#f8fafc" }}>
                            {member.name}
                          </div>
                          {member.nama_panggilan && (
                            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                              "{member.nama_panggilan}"
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* NPM */}
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "#38bdf8", fontSize: "0.85rem" }}>
                      {member.npm}
                    </td>

                    {/* Major Badge */}
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span className={`badge ${getMajorBadgeClass(member.major)}`}>
                        {getShortMajor(member.major)}
                      </span>
                    </td>

                    {/* Niche */}
                    <td style={{ padding: "0.75rem 1rem", maxWidth: "220px" }}>
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "var(--text-secondary)",
                          fontSize: "0.8rem",
                        }}
                        title={member.niche}
                      >
                        {member.niche || "-"}
                      </div>
                    </td>

                    {/* Socials */}
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <div style={{ display: "flex", gap: "0.4rem", color: "var(--text-muted)" }}>
                        {member.instagram && (
                          <a
                            href={`https://instagram.com/${member.instagram.replace(/^@/, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-muted)" }}
                            title={`Instagram: ${member.instagram}`}
                          >
                            <InstagramIcon size={15} />
                          </a>
                        )}
                        {member.linkedin && member.linkedin !== "-" && (
                          <a
                            href={member.linkedin.startsWith("http") ? member.linkedin : `https://${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-muted)" }}
                            title="LinkedIn"
                          >
                            <LinkedinIcon size={15} />
                          </a>
                        )}
                        {member.github && member.github !== "-" && (
                          <a
                            href={member.github.startsWith("http") ? member.github : `https://github.com/${member.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-muted)" }}
                            title="GitHub"
                          >
                            <GithubIcon size={15} />
                          </a>
                        )}
                        {member.website && member.website !== "-" && (
                          <a
                            href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#38bdf8" }}
                            title={`Website: ${member.website}`}
                          >
                            <Globe size={15} />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => onPreviewMember(member)}
                          title="Preview Member Profile"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => onEditMember(member)}
                          title="Edit Member"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon"
                          onClick={() => onDeleteMember(member)}
                          style={{ color: "var(--accent-red)" }}
                          title="Delete Member"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1.25rem",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
        }}
      >
        <div>
          Showing {filteredMembers.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, filteredMembers.length)} of {filteredMembers.length} members
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ padding: "0.35rem 0.75rem", opacity: currentPage === 1 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>
          <span style={{ fontWeight: 600, color: "#f8fafc", padding: "0 0.5rem" }}>
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{ padding: "0.35rem 0.75rem", opacity: currentPage === totalPages ? 0.4 : 1 }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

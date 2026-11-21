import React from "react";
import { X, Globe, Mail, Quote } from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "./Icons";
import type { Member } from "../types/member";

interface MemberPreviewModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
}

export const MemberPreviewModal: React.FC<MemberPreviewModalProps> = ({
  isOpen,
  member,
  onClose,
}) => {
  if (!isOpen || !member) return null;

  const photoUrl = member.foto?.url || "";
  const nicheList = member.niche
    ? member.niche.split(/[,/]/).map((n) => n.trim()).filter(Boolean)
    : [];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        padding: "1rem",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "540px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          position: "relative",
        }}
      >
        <button
          type="button"
          className="btn-icon"
          onClick={onClose}
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
        >
          <X size={18} />
        </button>

        {/* Member Header */}
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <div
            style={{
              width: "86px",
              height: "86px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(56, 189, 248, 0.4)",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.25)",
              flexShrink: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={member.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                  fontSize: "1.75rem",
                }}
              >
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <span
              className="badge badge-cs"
              style={{ marginBottom: "0.35rem", display: "inline-block" }}
            >
              {member.major}
            </span>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>
              {member.nama_panggilan || member.name}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {member.name} &bull; <span style={{ fontFamily: "monospace", color: "#38bdf8" }}>{member.npm}</span>
            </p>
            {member.email && (
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#60a5fa",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  marginTop: "0.2rem",
                }}
              >
                <Mail size={13} />
                <span>{member.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Niches */}
        {nicheList.length > 0 && (
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
              Niches & Interests
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {nicheList.map((niche) => (
                <span
                  key={niche}
                  style={{
                    padding: "0.2rem 0.65rem",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "var(--border-glass)",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quotes */}
        {member.quotes && (
          <div
            style={{
              padding: "0.85rem 1rem",
              background: "rgba(0, 0, 0, 0.3)",
              borderLeft: "3px solid #38bdf8",
              borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
              fontStyle: "italic",
              fontSize: "0.875rem",
              color: "var(--text-primary)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <Quote size={16} color="#38bdf8" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>"{member.quotes}"</span>
          </div>
        )}

        {/* Description / Bio */}
        {member.deskripsi && (
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
              About
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
              {member.deskripsi}
            </p>
          </div>
        )}

        {/* Social Links Row */}
        <div style={{ display: "flex", gap: "0.5rem", borderTop: "var(--border-glass)", paddingTop: "1rem" }}>
          {member.instagram && (
            <a
              href={`https://instagram.com/${member.instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
            >
              <InstagramIcon size={14} />
              <span>Instagram</span>
            </a>
          )}
          {member.linkedin && member.linkedin !== "-" && (
            <a
              href={member.linkedin.startsWith("http") ? member.linkedin : `https://${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
          )}
          {member.github && member.github !== "-" && (
            <a
              href={member.github.startsWith("http") ? member.github : `https://github.com/${member.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
          )}
          {member.website && member.website !== "-" && (
            <a
              href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
            >
              <Globe size={14} />
              <span>Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

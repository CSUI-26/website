import React, { useState, useEffect } from "react";
import { X, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import type { Member } from "../types/member";

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Member) => Promise<void>;
  initialData?: Member | null;
}

export const MemberFormModal: React.FC<MemberFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState<Member>({
    npm: "",
    name: "",
    nama_panggilan: "",
    major: "Ilmu Komputer",
    email: "",
    instagram: "",
    line: "",
    github: "",
    linkedin: "",
    website: "",
    niche: "",
    quotes: "",
    deskripsi: "",
    foto: {
      url: "",
      config: { x: 50, y: 50, zoom: 1, aspect: "1:1" },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        website: initialData.website || "",
        foto: {
          url: initialData.foto?.url || "",
          config: initialData.foto?.config || { x: 50, y: 50, zoom: 1, aspect: "1:1" },
        },
      });
    } else {
      setFormData({
        npm: "",
        name: "",
        nama_panggilan: "",
        major: "Ilmu Komputer",
        email: "",
        instagram: "",
        line: "",
        github: "",
        linkedin: "",
        website: "",
        niche: "",
        quotes: "",
        deskripsi: "",
        foto: {
          url: "",
          config: { x: 50, y: 50, zoom: 1, aspect: "1:1" },
        },
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof Member,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFotoConfigChange = (
    field: "x" | "y" | "zoom" | "aspect",
    value: number | string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      foto: {
        ...prev.foto,
        config: {
          ...prev.foto.config,
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Member name is required.");
      return;
    }
    if (!formData.npm.trim()) {
      setError("Member NPM is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const derivedGeneral = formData.niche
        ? formData.niche.split(/[,/]/).map((t) => t.trim()).filter(Boolean)
        : [];
      const payload: Member = {
        ...formData,
        general_niches:
          formData.general_niches && formData.general_niches.length > 0
            ? formData.general_niches
            : derivedGeneral,
      };
      await onSubmit(payload);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        padding: "1rem",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "var(--border-glass)",
            background: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Sparkles size={18} style={{ color: "#38bdf8" }} />
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc" }}>
              {isEditing ? `Edit Member: ${initialData?.name}` : "Add New Member"}
            </h2>
          </div>
          <button type="button" className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            overflowY: "auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {error && (
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#f87171",
                fontSize: "0.85rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Section 1: Basic Identifiers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                NPM (Student ID) *
              </label>
              <input
                type="text"
                required
                value={formData.npm}
                disabled={isEditing}
                onChange={(e) => handleChange("npm", e.target.value)}
                placeholder="e.g. 2606859093"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: isEditing ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Fabian Alvaro Muhammad"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Nickname (Nama Panggilan)
              </label>
              <input
                type="text"
                value={formData.nama_panggilan}
                onChange={(e) => handleChange("nama_panggilan", e.target.value)}
                placeholder="e.g. Fabian"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Major (Jurusan) *
              </label>
              <select
                value={formData.major}
                onChange={(e) => handleChange("major", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              >
                <option value="Ilmu Komputer">Ilmu Komputer</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Ilmu Komputer KKI">Ilmu Komputer KKI</option>
                <option value="Kecerdasan Artifisial">Kecerdasan Artifisial</option>
              </select>
            </div>
          </div>

          {/* Section 2: Contact & Socials */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="e.g. pabiantalvaro@outlook.com"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Instagram
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                placeholder="e.g. fabiantakesnotes"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                LinkedIn URL or Username
              </label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="e.g. in/fabian-alvaro-muhammad"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                Website Portfolio URL
              </label>
              <input
                type="text"
                value={formData.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="e.g. https://fabianalvaro.framer.website/"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                GitHub Username
              </label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="e.g. fabianalvaro"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                LINE ID
              </label>
              <input
                type="text"
                value={formData.line}
                onChange={(e) => handleChange("line", e.target.value)}
                placeholder="e.g. pabiant22"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.35)",
                  border: "var(--border-glass)",
                  borderRadius: "var(--radius-sm)",
                  color: "#f8fafc",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Section 3: Niches, Quotes & Bio */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
              Niches (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.niche}
              onChange={(e) => handleChange("niche", e.target.value)}
              placeholder="e.g. UI/UX, Software Engineering, GameDev"
              style={{
                width: "100%",
                padding: "0.55rem 0.85rem",
                background: "rgba(0, 0, 0, 0.35)",
                border: "var(--border-glass)",
                borderRadius: "var(--radius-sm)",
                color: "#f8fafc",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
              Quotes
            </label>
            <input
              type="text"
              value={formData.quotes}
              onChange={(e) => handleChange("quotes", e.target.value)}
              placeholder="e.g. if you want it done right you should just do it yourself"
              style={{
                width: "100%",
                padding: "0.55rem 0.85rem",
                background: "rgba(0, 0, 0, 0.35)",
                border: "var(--border-glass)",
                borderRadius: "var(--radius-sm)",
                color: "#f8fafc",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
              Description / Bio
            </label>
            <textarea
              rows={3}
              value={formData.deskripsi}
              onChange={(e) => handleChange("deskripsi", e.target.value)}
              placeholder="Write a brief introduction..."
              style={{
                width: "100%",
                padding: "0.55rem 0.85rem",
                background: "rgba(0, 0, 0, 0.35)",
                border: "var(--border-glass)",
                borderRadius: "var(--radius-sm)",
                color: "#f8fafc",
                fontSize: "0.875rem",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* Section 4: Photo Settings with Live Preview */}
          <div
            style={{
              padding: "1rem",
              background: "rgba(0, 0, 0, 0.25)",
              border: "var(--border-glass)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <ImageIcon size={16} color="#38bdf8" />
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f8fafc" }}>
                Member Photo & Crop Settings
              </span>
            </div>

            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {formData.foto?.url ? (
                  <img
                    src={formData.foto.url}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `scale(${formData.foto.config.zoom})`,
                      objectPosition: `${formData.foto.config.x}% ${formData.foto.config.y}%`,
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>No Photo</span>
                )}
              </div>

              <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  type="text"
                  value={formData.foto?.url || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      foto: { ...prev.foto, url: e.target.value },
                    }))
                  }
                  placeholder="Photo URL (Google Drive / Direct Image link)"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    background: "rgba(0, 0, 0, 0.4)",
                    border: "var(--border-glass)",
                    borderRadius: "var(--radius-sm)",
                    color: "#f8fafc",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Zoom: {formData.foto.config.zoom}x
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={formData.foto.config.zoom}
                    onChange={(e) => handleFotoConfigChange("zoom", parseFloat(e.target.value))}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              marginTop: "0.5rem",
              paddingTop: "1rem",
              borderTop: "var(--border-glass)",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <Save size={16} />
              <span>{isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Member"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

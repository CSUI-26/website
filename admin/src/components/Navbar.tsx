import React from "react";
import { Plus, Download, ExternalLink, Database } from "lucide-react";

interface NavbarProps {
  onOpenAddModal: () => void;
  onExportJson: () => void;
  totalMembers: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onExportJson,
  totalMembers,
}) => {
  return (
    <header className="glass-panel" style={{ margin: "1rem 1.5rem", padding: "0.85rem 1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(56, 189, 248, 0.4)",
            }}
          >
            <Database size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#f8fafc" }}>
                cruda-lumping
              </h1>
              <span className="badge badge-cs" style={{ fontSize: "0.68rem" }}>Admin CMS</span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Zenith Member Database &middot; {totalMembers} members loaded
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href="https://zenith-csui.web.app/members"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            title="View live public directory"
          >
            <ExternalLink size={15} />
            <span>Live Site</span>
          </a>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onExportJson}
            title="Download current database as data.json"
          >
            <Download size={15} />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
          >
            <Plus size={16} />
            <span>Add Member</span>
          </button>
        </div>
      </div>
    </header>
  );
};

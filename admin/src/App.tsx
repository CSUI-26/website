import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Member } from "./types/member";
import { Navbar } from "./components/Navbar";
import { StatsCards } from "./components/StatsCards";
import { MemberTable } from "./components/MemberTable";
import { MemberFormModal } from "./components/MemberFormModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { MemberPreviewModal } from "./components/MemberPreviewModal";
import rawFallbackData from "../../src/data.json";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";

export const App: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMajor, setSelectedMajor] = useState("ALL");

  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewingMember, setPreviewingMember] = useState<Member | null>(null);

  // Notification state
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Realtime Firestore subscription
  useEffect(() => {
    const membersRef = collection(db, "members");
    const unsubscribe = onSnapshot(
      membersRef,
      (snapshot) => {
        const list: Member[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as Member);
        });

        // Sort alphabetically by name
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        setMembers(list);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore read error:", error);
        showToast("error", `Firestore read error: ${error.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // One-click Seed existing data.json into Firestore
  const handleSeedDatabase = async () => {
    if (!window.confirm(`Populate Cloud Firestore with all ${rawFallbackData.length} existing members from data.json?`)) {
      return;
    }

    try {
      setIsSeeding(true);
      const allMembers = rawFallbackData as Member[];
      const chunkSize = 400; // Batch limit in Firestore is 500

      for (let i = 0; i < allMembers.length; i += chunkSize) {
        const chunk = allMembers.slice(i, i + chunkSize);
        const batch = writeBatch(db);

        for (const member of chunk) {
          const docId = member.npm;
          if (!docId) continue;
          const docRef = doc(db, "members", docId);
          batch.set(docRef, member);
        }

        await batch.commit();
      }

      showToast("success", `Successfully seeded ${allMembers.length} members into Firestore!`);
    } catch (err: unknown) {
      console.error("Seeding error:", err);
      showToast("error", err instanceof Error ? err.message : "Failed to seed database");
    } finally {
      setIsSeeding(false);
    }
  };

  // Create or Update Member
  const handleSaveMember = async (member: Member) => {
    const docId = member.npm.trim();
    if (!docId) {
      throw new Error("NPM cannot be empty");
    }

    const cleanMember: Record<string, unknown> = {
      npm: member.npm.trim(),
      name: member.name.trim(),
      nama_panggilan: member.nama_panggilan?.trim() || "",
      major: member.major,
      email: member.email?.trim() || "",
      instagram: member.instagram?.trim() || "",
      line: member.line?.trim() || "",
      github: member.github?.trim() || "",
      linkedin: member.linkedin?.trim() || "",
      website: member.website?.trim() || "",
      niche: member.niche?.trim() || "",
      general_niches: member.general_niches || [],
      quotes: member.quotes?.trim() || "",
      deskripsi: member.deskripsi?.trim() || "",
      foto: member.foto || { url: "", config: { x: 50, y: 50, zoom: 1, aspect: "1:1" } },
    };

    const docRef = doc(db, "members", docId);
    await setDoc(docRef, cleanMember, { merge: true });

    showToast(
      "success",
      editingMember
        ? `Updated member "${member.name}" successfully!`
        : `Created new member "${member.name}"!`
    );
  };

  // Delete Member
  const handleDeleteMember = async (npm: string) => {
    const docRef = doc(db, "members", npm);
    await deleteDoc(docRef);
    showToast("success", `Member with NPM ${npm} deleted from database.`);
  };

  // Export to JSON
  const handleExportJson = () => {
    const dataToExport = members.length > 0 ? members : (rawFallbackData as Member[]);
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, "\t")
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast("success", "Exported database to data.json!");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-md)",
            background: toast.type === "success" ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)",
            color: "white",
            fontWeight: 600,
            fontSize: "0.875rem",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        totalMembers={members.length}
        onOpenAddModal={() => {
          setEditingMember(null);
          setIsAddEditOpen(true);
        }}
        onExportJson={handleExportJson}
      />

      {/* Database Empty Banner (Prompting One-Click Seed) */}
      {!loading && members.length === 0 && (
        <div
          className="glass-panel"
          style={{
            margin: "0 1.5rem 1.5rem 1.5rem",
            padding: "1.5rem 2rem",
            border: "1px dashed rgba(56, 189, 248, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            background: "rgba(15, 23, 42, 0.75)",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.25rem" }}>
              Firestore Database is Currently Empty
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Initialize Cloud Firestore with all {rawFallbackData.length} existing cohort members from{" "}
              <code>data.json</code> with one click.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            style={{ padding: "0.7rem 1.4rem" }}
          >
            <UploadCloud size={18} />
            <span>{isSeeding ? "Seeding Database..." : `Seed ${rawFallbackData.length} Members`}</span>
          </button>
        </div>
      )}

      {/* Quick Stats Overview */}
      <StatsCards
        members={members}
        selectedMajor={selectedMajor}
        onSelectMajor={setSelectedMajor}
      />

      {/* Main Members Table */}
      <MemberTable
        members={members}
        selectedMajor={selectedMajor}
        onSelectMajor={setSelectedMajor}
        onEditMember={(m) => {
          setEditingMember(m);
          setIsAddEditOpen(true);
        }}
        onDeleteMember={(m) => {
          setDeletingMember(m);
          setIsDeleteOpen(true);
        }}
        onPreviewMember={(m) => {
          setPreviewingMember(m);
          setIsPreviewOpen(true);
        }}
      />

      {/* Modals */}
      <MemberFormModal
        isOpen={isAddEditOpen}
        initialData={editingMember}
        onClose={() => {
          setIsAddEditOpen(false);
          setEditingMember(null);
        }}
        onSubmit={handleSaveMember}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        member={deletingMember}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingMember(null);
        }}
        onConfirm={handleDeleteMember}
      />

      <MemberPreviewModal
        isOpen={isPreviewOpen}
        member={previewingMember}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewingMember(null);
        }}
      />
    </div>
  );
};

"use client";

import { useState, type FormEvent } from "react";
import { Bell, ChevronDown, Sparkles } from "lucide-react";
import { initialConversations, type Conversation } from "@/data/conversations";
import { ChatPanel } from "./ChatPanel";
import { ConversationSidebar } from "./ConversationSidebar";

const emojiOptions = ["😊", "👍", "🎉", "🔥", "✨", "💡"];

export function ChatWorkspace() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "unread">("all");
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];

  const visibleConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterMode === "all" || (conversation.unread !== undefined && conversation.unread > 0);

    return matchesSearch && matchesFilter;
  });

  function selectConversation(id: number) {
    setActiveId(id);
    setMobileListOpen(false);
    setChatMenuOpen(false);
    setConversations((items) =>
      items.map((item) => (item.id === id ? { ...item, unread: undefined } : item)),
    );
  }

  function createNewConversation() {
    const nextId = Math.max(...conversations.map((conversation) => conversation.id), 0) + 1;
    const newConversation: Conversation = {
      id: nextId,
      name: "New chat",
      role: "Fresh thread",
      initials: "NC",
      color: "sage",
      preview: "Start typing to begin your conversation.",
      time: "Now",
      messages: [{ author: "them", text: "Hi! Let’s get this thread started.", time: "Now" }],
    };

    setConversations((items) => [newConversation, ...items]);
    setActiveId(nextId);
    setMobileListOpen(false);
    setChatMenuOpen(false);
    setDraft("");
  }

  function addEmoji() {
    const nextEmoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    setDraft((current) => `${current}${current ? " " : ""}${nextEmoji}`);
  }

  function addAttachment() {
    const attachmentText = "📎 Shared a mock file";
    setDraft((current) => `${current}${current ? " " : ""}${attachmentText}`);
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();

    if (!text) return;

    setConversations((items) =>
      items.map((item) =>
        item.id === activeId
          ? {
              ...item,
              preview: text,
              time: "Now",
              messages: [...item.messages, { author: "me", text, time: "Now" }],
            }
          : item,
      ),
    );

    setDraft("");
    setChatMenuOpen(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">
          <Sparkles size={17} strokeWidth={2.5} />
          <span>morrow</span>
        </div>

        <div className="topbar-actions">
          <button
            className={`icon-button quiet ${notificationsEnabled ? "active" : ""}`}
            aria-label="Notifications"
            onClick={() => setNotificationsEnabled((current) => !current)}
          >
            <Bell size={19} />
            {notificationsEnabled && <i />}
          </button>

          <div className="user-chip">
            <span className="avatar avatar-sage small">AL</span>
            <span className="user-name">Alex Lee</span>
            <ChevronDown size={15} />
          </div>
        </div>
      </header>

      <section className="workspace">
        <ConversationSidebar
          conversations={visibleConversations}
          activeId={activeId}
          search={search}
          mobileListOpen={mobileListOpen}
          filterMode={filterMode}
          onSearchChange={setSearch}
          onSelectConversation={selectConversation}
          onFilterChange={setFilterMode}
          onNewConversation={createNewConversation}
        />

        <ChatPanel
          conversation={activeConversation}
          draft={draft}
          mobileListOpen={mobileListOpen}
          chatMenuOpen={chatMenuOpen}
          onDraftChange={setDraft}
          onSubmit={sendMessage}
          onToggleMobileList={() => setMobileListOpen(true)}
          onCloseMobileList={() => setMobileListOpen(false)}
          onToggleChatMenu={() => setChatMenuOpen((current) => !current)}
          onAttachFile={addAttachment}
          onAddEmoji={addEmoji}
        />
      </section>
    </main>
  );
}

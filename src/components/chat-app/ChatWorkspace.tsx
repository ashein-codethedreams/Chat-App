"use client";

import { useState, type FormEvent } from "react";
import { Bell, ChevronDown, Sparkles } from "lucide-react";
import { initialConversations } from "@/data/conversations";
import { ChatPanel } from "./ChatPanel";
import { ConversationSidebar } from "./ConversationSidebar";

export function ChatWorkspace() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [mobileListOpen, setMobileListOpen] = useState(false);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];

  const visibleConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase()),
  );

  function selectConversation(id: number) {
    setActiveId(id);
    setMobileListOpen(false);
    setConversations((items) =>
      items.map((item) => (item.id === id ? { ...item, unread: undefined } : item)),
    );
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
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">
          <Sparkles size={17} strokeWidth={2.5} />
          <span>morrow</span>
        </div>

        <div className="topbar-actions">
          <button className="icon-button quiet" aria-label="Notifications">
            <Bell size={19} />
            <i />
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
          onSearchChange={setSearch}
          onSelectConversation={selectConversation}
        />

        <ChatPanel
          conversation={activeConversation}
          draft={draft}
          mobileListOpen={mobileListOpen}
          onDraftChange={setDraft}
          onSubmit={sendMessage}
          onToggleMobileList={() => setMobileListOpen(true)}
          onCloseMobileList={() => setMobileListOpen(false)}
        />
      </section>
    </main>
  );
}

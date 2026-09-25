"use client";

import { FormEvent, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Sparkles,
  X,
} from "lucide-react";

type Message = { author: "them" | "me"; text: string; time: string };

type Conversation = {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  online?: boolean;
  preview: string;
  time: string;
  unread?: number;
  messages: Message[];
};

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Product designer",
    initials: "MC",
    color: "coral",
    online: true,
    preview: "The new direction feels really strong.",
    time: "10:42 AM",
    messages: [
      { author: "them", text: "Hey! I just wrapped the first pass on the new workspace. Want to take a look?", time: "10:31 AM" },
      { author: "me", text: "Absolutely. I have a few quiet minutes before my next call.", time: "10:36 AM" },
      { author: "them", text: "The new direction feels really strong. It is clearer without losing any personality.", time: "10:42 AM" },
    ],
  },
  {
    id: 2,
    name: "Andre Williams",
    role: "Engineering lead",
    initials: "AW",
    color: "blue",
    preview: "I can ship that by Thursday.",
    time: "Yesterday",
    messages: [{ author: "them", text: "I can ship that by Thursday. The API is already in good shape.", time: "Yesterday" }],
  },
  {
    id: 3,
    name: "Sofia Patel",
    role: "Content strategist",
    initials: "SP",
    color: "yellow",
    preview: "Sending over the final notes now.",
    time: "Tue",
    unread: 2,
    messages: [{ author: "them", text: "Sending over the final notes now. There are a couple of headline options to review.", time: "Tue" }],
  },
  {
    id: 4,
    name: "Launch crew",
    role: "6 members",
    initials: "LC",
    color: "purple",
    preview: "Nia: Nice work, everyone!",
    time: "Mon",
    messages: [{ author: "them", text: "Nia: Nice work, everyone! We are in a great place for the review.", time: "Mon" }],
  },
];

export default function Home() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const activeConversation = conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];
  const visibleConversations = conversations.filter((conversation) => conversation.name.toLowerCase().includes(search.toLowerCase()));

  function selectConversation(id: number) {
    setActiveId(id);
    setMobileListOpen(false);
    setConversations((items) => items.map((item) => (item.id === id ? { ...item, unread: undefined } : item)));
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setConversations((items) => items.map((item) => item.id === activeId ? { ...item, preview: text, time: "Now", messages: [...item.messages, { author: "me", text, time: "Now" }] } : item));
    setDraft("");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark"><Sparkles size={17} strokeWidth={2.5} /><span>morrow</span></div>
        <div className="topbar-actions">
          <button className="icon-button quiet" aria-label="Notifications"><Bell size={19} /><i /></button>
          <div className="user-chip"><span className="avatar avatar-sage small">AL</span><span className="user-name">Alex Lee</span><ChevronDown size={15} /></div>
        </div>
      </header>

      <section className="workspace">
        <aside className={`conversation-panel ${mobileListOpen ? "mobile-open" : ""}`}>
          <div className="panel-heading"><div><p className="eyebrow">Your inbox</p><h1>Messages <span>4</span></h1></div><button className="new-button" aria-label="New message"><Plus size={19} /></button></div>
          <label className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search conversations" /></label>
          <div className="filter-row"><button className="filter-active">All <span>4</span></button><button>Unread <span>2</span></button></div>
          <div className="conversation-list">
            {visibleConversations.map((conversation) => (
              <button key={conversation.id} className={`conversation ${conversation.id === activeId ? "selected" : ""}`} onClick={() => selectConversation(conversation.id)}>
                <span className={`avatar avatar-${conversation.color}`}>{conversation.initials}{conversation.online && <i />}</span>
                <span className="conversation-copy"><span className="conversation-title"><strong>{conversation.name}</strong><time>{conversation.time}</time></span><span className="conversation-preview">{conversation.preview}</span></span>
                {conversation.unread && <b className="unread-count">{conversation.unread}</b>}
              </button>
            ))}
          </div>
          <div className="panel-footer"><span className="status-dot" />All systems operational <span className="footer-version">v1.0</span></div>
        </aside>

        <section className="chat-panel">
          <header className="chat-header"><button className="icon-button mobile-menu" aria-label="Show conversations" onClick={() => setMobileListOpen(true)}><Menu size={20} /></button><span className={`avatar avatar-${activeConversation.color}`}>{activeConversation.initials}{activeConversation.online && <i />}</span><div className="chat-person"><strong>{activeConversation.name}</strong><span>{activeConversation.online ? "Online now" : activeConversation.role}</span></div><div className="chat-actions"><button className="icon-button" aria-label="More options"><MoreHorizontal size={20} /></button></div></header>
          <div className="message-area">
            <div className="day-divider"><span>Today</span></div>
            <div className="message-stack">{activeConversation.messages.map((message, index) => <div className={`message-row ${message.author === "me" ? "mine" : "theirs"}`} key={`${message.time}-${index}`}><div className={`message-bubble ${message.author === "me" ? "mine" : "theirs"}`}>{message.text}</div><time>{message.time}</time></div>)}</div>
          </div>
          <form className="composer" onSubmit={sendMessage}><div className="composer-input"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." rows={1} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} /><div className="composer-tools"><button type="button" aria-label="Attach file"><Paperclip size={18} /></button><button type="button" aria-label="Add emoji"><Smile size={18} /></button><span>Enter to send</span></div></div><button className="send-button" aria-label="Send message" type="submit"><Send size={18} /></button></form>
        </section>
      </section>
      {mobileListOpen && <button className="mobile-overlay" aria-label="Close conversations" onClick={() => setMobileListOpen(false)}><X size={18} /></button>}
    </main>
  );
}

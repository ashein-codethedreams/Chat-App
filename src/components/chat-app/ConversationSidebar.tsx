import { Plus, Search } from "lucide-react";
import type { Conversation } from "@/data/conversations";

type ConversationSidebarProps = {
  conversations: Conversation[];
  activeId: number;
  search: string;
  mobileListOpen: boolean;
  onSearchChange: (value: string) => void;
  onSelectConversation: (id: number) => void;
};

export function ConversationSidebar({
  conversations,
  activeId,
  search,
  mobileListOpen,
  onSearchChange,
  onSelectConversation,
}: ConversationSidebarProps) {
  return (
    <aside className={`conversation-panel ${mobileListOpen ? "mobile-open" : ""}`}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Your inbox</p>
          <h1>
            Messages <span>{conversations.length}</span>
          </h1>
        </div>
        <button className="new-button" aria-label="New message">
          <Plus size={19} />
        </button>
      </div>

      <label className="search-field">
        <Search size={17} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search conversations"
        />
      </label>

      <div className="filter-row">
        <button className="filter-active">
          All <span>{conversations.length}</span>
        </button>
        <button>
          Unread <span>2</span>
        </button>
      </div>

      <div className="conversation-list">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className={`conversation ${conversation.id === activeId ? "selected" : ""}`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <span className={`avatar avatar-${conversation.color}`}>
              {conversation.initials}
              {conversation.online && <i />}
            </span>
            <span className="conversation-copy">
              <span className="conversation-title">
                <strong>{conversation.name}</strong>
                <time>{conversation.time}</time>
              </span>
              <span className="conversation-preview">{conversation.preview}</span>
            </span>
            {conversation.unread && <b className="unread-count">{conversation.unread}</b>}
          </button>
        ))}
      </div>

      <div className="panel-footer">
        <span className="status-dot" />
        All systems operational <span className="footer-version">v1.0</span>
      </div>
    </aside>
  );
}

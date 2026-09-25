import type { FormEvent } from "react";
import { Menu, MoreHorizontal, X } from "lucide-react";
import type { Conversation } from "@/data/conversations";
import { MessageComposer } from "./MessageComposer";

type ChatPanelProps = {
  conversation: Conversation;
  draft: string;
  mobileListOpen: boolean;
  chatMenuOpen: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleMobileList: () => void;
  onCloseMobileList: () => void;
  onToggleChatMenu: () => void;
  onAttachFile: () => void;
  onAddEmoji: () => void;
};

export function ChatPanel({
  conversation,
  draft,
  mobileListOpen,
  chatMenuOpen,
  onDraftChange,
  onSubmit,
  onToggleMobileList,
  onCloseMobileList,
  onToggleChatMenu,
  onAttachFile,
  onAddEmoji,
}: ChatPanelProps) {
  return (
    <>
      <section className="chat-panel">
        <header className="chat-header">
          <button
            className="icon-button mobile-menu"
            aria-label="Show conversations"
            onClick={onToggleMobileList}
          >
            <Menu size={20} />
          </button>

          <span className={`avatar avatar-${conversation.color}`}>
            {conversation.initials}
            {conversation.online && <i />}
          </span>

          <div className="chat-person">
            <strong>{conversation.name}</strong>
            <span>{conversation.online ? "Online now" : conversation.role}</span>
          </div>

          <div className="chat-actions">
            <button
              className={`icon-button ${chatMenuOpen ? "active" : ""}`}
              aria-label="More options"
              onClick={onToggleChatMenu}
            >
              <MoreHorizontal size={20} />
            </button>
            {chatMenuOpen && (
              <div className="chat-menu">
                <button type="button">Mark as unread</button>
                <button type="button">Mute thread</button>
                <button type="button">Archive chat</button>
              </div>
            )}
          </div>
        </header>

        <div className="message-area">
          <div className="day-divider">
            <span>Today</span>
          </div>

          <div className="message-stack">
            {conversation.messages.map((message, index) => (
              <div
                className={`message-row ${message.author === "me" ? "mine" : "theirs"}`}
                key={`${message.time}-${index}`}
              >
                <div className={`message-bubble ${message.author === "me" ? "mine" : "theirs"}`}>
                  {message.text}
                </div>
                <time>{message.time}</time>
              </div>
            ))}
          </div>
        </div>

        <MessageComposer
          draft={draft}
          onDraftChange={onDraftChange}
          onSubmit={onSubmit}
          onAttachFile={onAttachFile}
          onAddEmoji={onAddEmoji}
        />
      </section>

      {mobileListOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close conversations"
          onClick={onCloseMobileList}
        >
          <X size={18} />
        </button>
      )}
    </>
  );
}

import type { FormEvent } from "react";
import { Paperclip, Smile, Send } from "lucide-react";

type MessageComposerProps = {
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onAttachFile: () => void;
  onAddEmoji: () => void;
};

export function MessageComposer({
  draft,
  onDraftChange,
  onSubmit,
  onAttachFile,
  onAddEmoji,
}: MessageComposerProps) {
  return (
    <form className="composer" onSubmit={onSubmit}>
      <div className="composer-input">
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="Write a message..."
          rows={1}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />

        <div className="composer-tools">
          <button type="button" aria-label="Attach file" onClick={onAttachFile}>
            <Paperclip size={18} />
          </button>
          <button type="button" aria-label="Add emoji" onClick={onAddEmoji}>
            <Smile size={18} />
          </button>
          <span>Enter to send</span>
        </div>
      </div>

      <button className="send-button" aria-label="Send message" type="submit">
        <Send size={18} />
      </button>
    </form>
  );
}

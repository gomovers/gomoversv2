import { useCallback, useState, type ComponentType } from "react";
import { MessageCircle, X } from "lucide-react";
import { trackChatStep } from "./track";

type PanelComponent = ComponentType<{ onClose: () => void }>;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [Panel, setPanel] = useState<PanelComponent | null>(null);
  const [loadingPanel, setLoadingPanel] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    trackChatStep("open");
    if (!Panel) {
      setLoadingPanel(true);
      import("./ChatWidgetPanel").then((mod) => {
        setPanel(() => mod.ChatWidgetPanel);
        setLoadingPanel(false);
      });
    }
  }, [Panel]);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      {open && Panel && <Panel onClose={handleClose} />}

      {open && !Panel && loadingPanel && (
        <div
          className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-xl ring-1 ring-border sm:bottom-28 sm:right-6"
          aria-live="polite"
          aria-label="Loading chat"
        >
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      )}

      <button
        type="button"
        onClick={open ? handleClose : handleOpen}
        aria-label={open ? "Close chat" : "Chat with GoMovers"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl transition hover:opacity-90 active:scale-95 sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}

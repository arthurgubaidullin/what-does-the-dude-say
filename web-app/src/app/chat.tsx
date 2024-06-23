export function Chat(props?: { class?: string }) {
  return (
    <div>
      <div className={`chat chat-start ${props?.class ?? ''}`}>
        <div className="chat-header">
          Obi-Wan Kenobi <time className="text-xs opacity-50">2 hours ago</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-header">
          Obi-Wan Kenobi <time className="text-xs opacity-50">2 hour ago</time>
        </div>
        <div className="chat-bubble">I loved you.</div>
      </div>
    </div>
  );
}

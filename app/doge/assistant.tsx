"use client";

import { Message, useAssistant } from "ai/react";

const roleToColorMap: Record<Message["role"], string> = {
  system: "#FF9B99",
  user: "white",
  function: "#A8ACC7",
  assistant: "#FFFD82",
  data: "#F2929A",
  tool: "#A8ACC7",
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case "assistant":
      return "Doge";
    default:
      return role;
  }
};

export default function Assistant() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: "/api/doge" });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m: Message) => (
        <div
          key={m.id}
          className="whitespace-pre-wrap"
          style={{ color: roleToColorMap[m.role] }}
        >
          <strong>{`${getRoleLabel(m.role)}: `}</strong>
          {m.role !== "data" && m.content}
          {m.role === "data" && (
            <>
              {/* here you would provide a custom display for your app-specific data:*/}
              {(m.data as any).description}
              <br />
              <pre className={"bg-gray-900 text-wrap"}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )}
          <br />
          <br />
        </div>
      ))}

      {status === "in_progress" && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}

      <form onSubmit={submitMessage}>
        <input
          disabled={status !== "awaiting_message"}
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="What is the temperature in the living room?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

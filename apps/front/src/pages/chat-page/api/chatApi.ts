// api/chatApi.ts

interface MessageType {
  role: "user" | "assistant";
  content: string;
}

interface PropsType {
  messages: MessageType[];
  onToken: (token: string) => void;
  onDone: () => void;
  onError?: (error: unknown) => void;
}

export async function chatApi({
  messages,
  onToken,
  onDone,
  onError,
}: PropsType) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.body) {
      throw new Error("ReadableStream not supported");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        onToken(chunk);
      }
    }

    onDone();
  } catch (error) {
    onError?.(error);
    throw error;
  }
}

import { useState, useEffect, useRef } from "react";

export function useGradioWebSocket(url: string) {
    const [connected, setConnected] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    console.log("connected to web socket secure 2",connected)
    useEffect(() => {
        const ws = new window.WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);
        ws.onmessage = (event: MessageEvent) => setMessage(event.data);

        return () => ws.close();
    }, [url]);

    const sendMessage = (msg: string) => {
        if (socketRef.current && connected) {
            socketRef.current.send(msg);
        }
    };

    

    return { connected, message, sendMessage };
}

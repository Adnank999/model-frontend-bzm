import { useGradioWebSocket } from "@/hooks/useGradioWebSocket";
import React, { useState, useEffect, useRef } from "react";



export default function SecondWebSocketHandler({ fnIndex68,imagePreviewData, onProcessCompleted,setLoading,setPreview }) {
    const { connected, message, sendMessage } = useGradioWebSocket("ws://127.0.0.1:8888/queue/join");

    // console.log("data2 ref",fnIndex68)

    useEffect(() => {
        if (!message) return;
        let msgObj;
        // console.log("SecondWebSocketHandler mounted, socket connecting...");
        try {
            msgObj = typeof message === "string" ? JSON.parse(message) : message;
        } catch {
            return;
        }

        if (msgObj.msg === "send_hash") {
            // console.log("second has request")
            sendMessage(JSON.stringify(fnIndex68.current));
        } else if (msgObj.msg === "send_data") {
            sendMessage(JSON.stringify(imagePreviewData.current));
        } else if (msgObj.msg === "process_starts") {
            // Wait for process completed
        } else if (msgObj.msg === "process_completed") {
            onProcessCompleted(msgObj.output);
            setPreview(null)
            setLoading(false)
            
        }
    }, [message, fnIndex68, sendMessage,imagePreviewData, onProcessCompleted]);

    return null;
}

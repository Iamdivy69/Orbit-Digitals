"use client"; // This line makes it safe for lazy loading

import dynamic from "next/dynamic";

// This tells the browser: "Only load the ChatWidget when on the client side"
const ChatWidget = dynamic(() => import("./ChatWidget"), { 
  ssr: false 
});

export default function ChatLoader() {
  return <ChatWidget />;
}
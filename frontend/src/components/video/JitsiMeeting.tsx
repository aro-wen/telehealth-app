"use client";

import { useEffect, useRef } from "react";

interface JitsiMeetingProps {
  roomName: string;
}

export function JitsiMeeting({ roomName }: JitsiMeetingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      if (containerRef.current) {
        apiRef.current = new (window as any).JitsiMeetExternalAPI(
          "meet.jit.si",
          {
            roomName,
            parentNode: containerRef.current,
            configOverwrite: {
              startWithAudioMuted: true,
              startWithVideoMuted: false,
            },
            interfaceConfigOverwrite: {
              TOOLBAR_BUTTONS: [
                "microphone",
                "camera",
                "desktop",
                "fullscreen",
                "hangup",
              ],
            },
          },
        );
      }
    };
    document.head.appendChild(script);

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
      document.head.removeChild(script);
    };
  }, [roomName]);

  return <div ref={containerRef} className="w-full h-full" />;
}

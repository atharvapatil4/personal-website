"use client";

import React, { useEffect, useState } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const formattedTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/Los_Angeles",
      });
      setCurrentTime(formattedTime);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <time className="site-time" suppressHydrationWarning>
      SF {currentTime || "--"}
    </time>
  );
};

export default CurrentTime;

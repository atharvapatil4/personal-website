"use client";
import React, { useEffect, useState } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  const fetchTime = async () => {
    try {
      const response = await fetch(
        "https://worldtimeapi.org/api/timezone/America/Los_Angeles",
      );
      const data = await response.json();
      const time = new Date(data.utc_datetime);
      const formattedTime = time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "America/Los_Angeles",
      });
      setCurrentTime(formattedTime);
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  useEffect(() => {
    fetchTime();
    const interval = setInterval(fetchTime, 1000); // Refresh every second
    return () => clearInterval(interval);
  }, []);

  return (
    <a href="https://24timezones.com/San-Francisco/time" className="italic">
      TIME IN SAN FRANCISCO - {currentTime} PST
    </a>
  );
};

export default CurrentTime;
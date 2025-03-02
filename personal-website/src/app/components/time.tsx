"use client";
import React, { useEffect, useState } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTime = async () => {
    try {
      const response = await fetch(
        "https://worldtimeapi.org/api/timezone/America/Los_Angeles"
      );
      const data = await response.json();
      // Use datetime instead of utc_datetime to get the correct local time
      const time = new Date(data.datetime);
      const formattedTime = time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setCurrentTime(formattedTime);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching time:", error);
      // Add fallback to local time if API fails
      const fallbackTime = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "America/Los_Angeles",
      });
      setCurrentTime(fallbackTime);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTime();
    const interval = setInterval(fetchTime, 1000); // Refresh every second
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <a className="italic">Loading time...</a>;
  }

  return <a className="italic">TIME IN SAN FRANCISCO – {currentTime} PST</a>;
};

export default CurrentTime;

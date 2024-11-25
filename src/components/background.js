import React, { useEffect, useState } from "react";

const Background = () => {
  const [backgroundStyle, setBackgroundStyle] = useState({});

  useEffect(() => {
    const generateRandomGradient = () => {
      const colors = Array.from({ length: 3 }, () =>
        `rgb(${Math.random() * 64}, ${Math.random() * 64}, ${Math.random() * 64})`
      );

      const gradient = `linear-gradient(${Math.random() * 360}deg, ${colors.join(", ")})`;
      const radialGradient = `radial-gradient(circle at center, rgba(128, 128, 128, 0.3), rgba(0, 0, 0, 0) 70%)`;

      return { background: `${radialGradient}, ${gradient}` };
    };

    setBackgroundStyle(generateRandomGradient());
  }, []);

  return (
    <div
      style={{
        ...backgroundStyle,
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    ></div>
  );
};

export default Background;

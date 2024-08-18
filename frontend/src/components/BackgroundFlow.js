import { useEffect } from 'react';

const BackgroundFlow = () => {
  useEffect(() => {
    const container = document.getElementById('background-flow');

    // Generate 20 lines
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = `flow-line line-${i}`;
      line.style.animationDelay = `${i * 3.5}s`; // Slightly delay each line
      line.innerText = `To create an animated background with 20 horizontal lines, each flowing across the screen from one side to the other, similar to vehicular travel or a smooth flow, we'll use CSS animations. Each line will represent data being "parsed" from one side to the other. Here's how you can achieve that:To create an animated background with 20 horizontal lines, each flowing across the screen from one side to the other, similar to vehicular travel or a smooth flow, we'll use CSS animations. Each line will represent data being "parsed" from one side to the other. Here's how you can achieve that:`;
      container.appendChild(line);
    }
  }, []);

  return <div id="background-flow" className="absolute inset-0 overflow-hidden z-0"></div>;
};

export default BackgroundFlow;

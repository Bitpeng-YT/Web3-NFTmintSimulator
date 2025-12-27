import React, { useState } from 'react';

  const CANVAS_SIZE = 256;

  // Utility to generate a random color in hex
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };

  // Utility to generate a random integer between min and max inclusive
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate a single NFT image as data URL
  const generateImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = randomColor();
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Random shapes
    const shapes = randInt(3, 7);
    for (let i = 0; i < shapes; i++) {
      const shapeType = randInt(0, 2); // 0: rect, 1: circle, 2: triangle
      ctx.fillStyle = randomColor();
      ctx.strokeStyle = randomColor();
      ctx.lineWidth = randInt(2, 6);

      switch (shapeType) {
        case 0: // rectangle
          ctx.fillRect(randInt(0, CANVAS_SIZE - 50), randInt(0, CANVAS_SIZE - 50), randInt(20, 80), randInt(20, 80));
          break;
        case 1: // circle
          ctx.beginPath();
          ctx.arc(randInt(50, CANVAS_SIZE - 50), randInt(50, CANVAS_SIZE - 50), randInt(20, 60), 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case 2: // triangle
          ctx.beginPath();
          ctx.moveTo(randInt(0, CANVAS_SIZE), randInt(0, CANVAS_SIZE));
          ctx.lineTo(randInt(0, CANVAS_SIZE), randInt(0, CANVAS_SIZE));
          ctx.lineTo(randInt(0, CANVAS_SIZE), randInt(0, CANVAS_SIZE));
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
      }
    }

    return canvas.toDataURL('image/png');
  };

  // Generate a random NFT name
  const generateName = () => {
    const adjectives = ['Crypto', 'Pixel', 'Neon', 'Quantum', 'Stellar', 'Galactic'];
    const nouns = ['Bird', 'Dragon', 'Phoenix', 'Robot', 'Alien', 'Wizard'];
    const adj = adjectives[randInt(0, adjectives.length - 1)];
    const noun = nouns[randInt(0, nouns.length - 1)];
    const number = randInt(1000, 9999);
    return `${adj} ${noun} #${number}`;
  };

  const App = () => {
    const [nfts, setNfts] = useState([]);

    const mint = () => {
      const image = generateImage();
      const name = generateName();
      setNfts(prev => [...prev, { image, name }]);
    };

    const downloadImage = (dataUrl, filename) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="app">
        <h1>NFT Mint Simulator</h1>
        <button className="mint-btn" onClick={mint}>Mint</button>
        <div className="nft-grid">
          {nfts.map((nft, idx) => (
            <div key={idx} className="nft-card">
              <img src={nft.image} alt={nft.name} />
              <p className="nft-name">{nft.name}</p>
              <button
                className="download-btn"
                onClick={() => downloadImage(nft.image, `${nft.name}.png`)}
              >
                Download Image
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default App;

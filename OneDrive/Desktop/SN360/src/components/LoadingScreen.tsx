import React, { useEffect, useRef, useState } from 'react';
import { Shield } from 'lucide-react';

const DANGER_COLOR = '#E63946';
const SAFE_COLOR = '#00b894';

function lerpColor(a: string, b: string, t: number) {
  // Linear interpolate between two hex colors
  const ah = a.replace('#', '');
  const bh = b.replace('#', '');
  const ar = parseInt(ah.substring(0, 2), 16);
  const ag = parseInt(ah.substring(2, 4), 16);
  const ab = parseInt(ah.substring(4, 6), 16);
  const br = parseInt(bh.substring(0, 2), 16);
  const bg = parseInt(bh.substring(2, 4), 16);
  const bb = parseInt(bh.substring(4, 6), 16);
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb})`;
}

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [blips, setBlips] = useState<{angle: number, key: number}[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const radarRef = useRef<SVGSVGElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    let blipKey = 0;
    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / 2500, 1);
      setProgress(Math.floor(pct * 100));
      // Add blips at random angles, fade out as progress increases
      if (Math.random() < 0.08 && pct < 0.95) {
        setBlips((b) => [...b, { angle: Math.random() * 360, key: blipKey++ }]);
      }
      if (pct < 1) {
        frame = requestAnimationFrame(animate);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Remove blips as progress increases
  useEffect(() => {
    if (progress > 0) {
      setBlips((b) => b.filter(() => Math.random() > 0.08 || progress > 90));
    }
  }, [progress]);

  // Radar rotation
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => (r + 2) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Radar ping sound
  useEffect(() => {
    if (!soundOn) return;
    const interval = setInterval(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 2200);
    return () => clearInterval(interval);
  }, [soundOn]);

  // Auto-redirect on completion
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  }, [progress]);

  const color = lerpColor(DANGER_COLOR, SAFE_COLOR, progress / 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 text-white transition-all font-[Inter,sans-serif]" style={{background: 'radial-gradient(ellipse at center, #222 60%, #111 100%)'}}>
      {/* SVG World Map Overlay */}
      <svg width="340" height="180" viewBox="0 0 340 180" className="absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{zIndex:0}}>
        <ellipse cx="170" cy="90" rx="160" ry="70" fill="#00b894" opacity="0.12" />
        <ellipse cx="170" cy="90" rx="120" ry="50" fill="#E63946" opacity="0.08" />
        <path d="M30,90 Q60,30 170,40 Q280,50 310,90 Q280,130 170,140 Q60,150 30,90 Z" fill="#fff" opacity="0.08" />
      </svg>
      {/* Radar */}
      <svg ref={radarRef} width={220} height={220} viewBox="0 0 220 220" style={{transform: `rotate(${rotation}deg)`, transition: 'transform 0.2s', zIndex:1}}>
        <circle cx="110" cy="110" r="100" fill="none" stroke={color} strokeWidth="2" opacity="0.3" />
        <circle cx="110" cy="110" r="80" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
        <circle cx="110" cy="110" r="60" fill="none" stroke={color} strokeWidth="2" opacity="0.15" />
        <circle cx="110" cy="110" r="40" fill="none" stroke={color} strokeWidth="2" opacity="0.1" />
        {/* Radar sweep */}
        <path d="M110,110 L110,10" stroke={color} strokeWidth="4" opacity="0.7" />
        {/* Blips */}
        {blips.map((blip) => {
          const rad = (blip.angle * Math.PI) / 180;
          const r = 80 + Math.random() * 30;
          const x = 110 + r * Math.cos(rad);
          const y = 110 + r * Math.sin(rad);
          return <circle key={blip.key} cx={x} cy={y} r={6} fill={color} opacity={0.7 - progress / 120} />;
        })}
        {/* Shield core with pulse */}
        <g>
          <circle cx="110" cy="110" r={28 + 4 * Math.sin(Date.now() / 300)} fill={color} opacity="0.18" />
          <circle cx="110" cy="110" r={18 + 2 * Math.sin(Date.now() / 300)} fill={color} opacity="0.25" />
          <foreignObject x="85" y="85" width="50" height="50">
            <div className="flex items-center justify-center w-full h-full">
              <Shield className="w-10 h-10 text-white drop-shadow-lg" style={{filter: `drop-shadow(0 0 8px ${color})`}} />
            </div>
          </foreignObject>
        </g>
      </svg>
      {/* Progress Bar & Text */}
      <div className="w-64 mt-8 z-10">
        <div className="loading-text text-center text-lg font-semibold tracking-wider mb-2" style={{color}}>
          <span id="progress-text">{progress}%</span> - Stabilizing Network…
        </div>
        <div className="relative h-3 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all progress-bar-inner"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${DANGER_COLOR}, ${color})` }}
          />
        </div>
      </div>
      {/* Sound toggle */}
      <button
        className="mt-6 text-xs px-3 py-1 rounded bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700 text-gray-200 transition"
        onClick={() => setSoundOn((s) => !s)}
        style={{fontFamily: 'Inter, sans-serif'}}
      >
        {soundOn ? '🔊 Radar Ping On' : '🔇 Radar Ping Off'}
      </button>
      {/* Radar ping sound (hidden) */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7b2.mp3" preload="auto" style={{display:'none'}} />
    </div>
  );
};

export default LoadingScreen;

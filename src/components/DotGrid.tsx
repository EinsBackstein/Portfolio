"use client";

import React, { useRef, useEffect } from 'react';

const DOT_RADIUS = 2;
const OPACITY_DEFAULT = 0.1;
const OPACITY_TARGET = 1;
const OPACITY_STEP = 0.02; // Adjusted for smoother fade
const IMPACT_DEFAULT = 80;
const IMPACT_CLICK = 160;
const ACCENT_COLOR_DARK = "60, 204, 65";
const ACCENT_COLOR_LIGHT = "1, 90, 223";  

interface Dot {
  x: number;
  y: number;
  currentOpacity: number;
  targetOpacity: number;
}

interface DotGridProps {
  darkMode: boolean;
}

const DotGrid: React.FC<DotGridProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, moved: false, clicked: false });
  const spreadRef = useRef(22);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d');
    const context = contextRef.current;
    if (!context) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      spreadRef.current = canvas.width > 640 ? 22 : 16;
    };

    const createDots = () => {
      dotsRef.current = [];
      const margin = spreadRef.current / 2;
      const offsetX = (canvas.width % spreadRef.current) / 2;
      const offsetY = (canvas.height % spreadRef.current) / 2;

      for (let x = margin + offsetX; x < canvas.width - margin; x += spreadRef.current) {
        for (let y = margin + offsetY; y < canvas.height - margin; y += spreadRef.current) {
          dotsRef.current.push({ x, y, currentOpacity: OPACITY_DEFAULT, targetOpacity: OPACITY_DEFAULT });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.moved = true;
    };

    const handleMouseDown = () => {
      mouseRef.current.clicked = true;
    };
    
    const handleMouseUp = () => {
        mouseRef.current.clicked = false;
    };

    const handleResize = () => {
      setCanvasSize();
      createDots();
    };

    setCanvasSize();
    createDots();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let animationFrameId: number;
    const render = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Use the current darkMode value for color
      const accentColor = darkMode ? ACCENT_COLOR_DARK : ACCENT_COLOR_LIGHT;

      dotsRef.current.forEach(dot => {
        let step = OPACITY_STEP;
        const impact = mouseRef.current.clicked ? IMPACT_CLICK : IMPACT_DEFAULT;
        if (mouseRef.current.moved || mouseRef.current.clicked) {
            const dx = mouseRef.current.x - dot.x;
            const dy = mouseRef.current.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const roundedDistance = Math.round(distance * 1.8);
    
            if (roundedDistance < impact) {
              step = roundedDistance / impact;
              dot.currentOpacity = OPACITY_DEFAULT;
              dot.targetOpacity = OPACITY_TARGET;
            }
        }

        if (dot.currentOpacity > dot.targetOpacity) {
            dot.currentOpacity -= step;
            if (dot.currentOpacity < OPACITY_DEFAULT) {
                dot.currentOpacity = OPACITY_DEFAULT;
            }
        } else if (dot.currentOpacity < dot.targetOpacity) {
            dot.currentOpacity += step;
            if (dot.currentOpacity > OPACITY_TARGET) {
                dot.currentOpacity = OPACITY_TARGET;
            }
        }
        
        if (dot.currentOpacity > OPACITY_DEFAULT) {
            dot.targetOpacity = OPACITY_DEFAULT;
        }

        context.beginPath();
        context.fillStyle = `rgba(${accentColor}, ${dot.currentOpacity})`;
        context.fillRect(dot.x, dot.y, DOT_RADIUS, DOT_RADIUS);
      });
      
      mouseRef.current.moved = false;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]); // Add darkMode as a dependency

  return <canvas ref={canvasRef} className="bg-canvas" />;
};

export default DotGrid;

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing factor physics
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Centered dot springs declared unconditionally at modular top level
  const dotSpringX = useSpring(mouseX, { damping: 15, stiffness: 400 });
  const dotSpringY = useSpring(mouseY, { damping: 15, stiffness: 400 });

  useEffect(() => {
    // Disable luxury cursor on touch screens to ensure flawless raw mobile experience
    const checkTouch = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isTouchDevice);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isMobile) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };

    // Track interactions for cursor swelling effects
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Swell on buttons, links, inputs, click tags, or items with custom ids
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('select') || 
        target.closest('textarea') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive-cursor') ||
        target.classList.contains('cursor-pointer');

      if (isInteractive) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer elegant trailing luxury ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          willChange: 'transform',
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'rgba(214, 175, 55, 1)' : 'rgba(214, 175, 55, 0.4)',
          backgroundColor: isHovering ? 'rgba(214, 175, 55, 0.08)' : 'rgba(214, 175, 55, 0)',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-gold/40 pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
      />
      {/* Centered precision dot */}
      <motion.div
        style={{
          x: dotSpringX,
          y: dotSpringY,
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
        className="fixed top-2.5 left-2.5 w-1 h-1 bg-gold rounded-full pointer-events-none z-[9999] hidden lg:block"
      />
    </>
  );
}

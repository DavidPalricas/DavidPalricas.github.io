// src/components/dom/Contact.tsx
import React, { useState, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ContactCharacter } from '../../../canvas/ContactCharacter';
import { CharacterAction } from '../../../../types/contact';
import './Contact.css'; 

/**
 * Props for the Contact panel.
 */
interface ContactProps {
  onClose: () => void;
}

/**
 * Notification state used by the contact form UI overlay.
 */
type NotificationState = {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
} | null;

/**
 * Contact panel containing a form and a synchronized animated 3D character.
 */
export const Contact: React.FC<ContactProps> = ({ onClose }) => {
  const [characterState, setCharacterState] = useState<CharacterAction>(CharacterAction.IDLE);
  const [notification, setNotification] = useState<NotificationState>(null);
  
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTyping = useCallback(() => {
    if (characterState === CharacterAction.RUNNING) return; 

    setCharacterState(CharacterAction.NODDING);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setCharacterState(CharacterAction.IDLE);
    }, 800);
  }, [characterState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    
    setNotification(null);
    setCharacterState(CharacterAction.RUNNING);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const timeToResetCharacter = 4000;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Contact API submission failed.');
      }
      
      setCharacterState(CharacterAction.SUCCESS);
      setNotification({ visible: true, type: 'success', message: 'Email Sent Successfully' });
      
      notificationTimeoutRef.current = setTimeout(() => {
        setCharacterState(CharacterAction.IDLE);
        setNotification(null);
        (e.target as HTMLFormElement).reset();
      }, timeToResetCharacter);

    } catch (error) {
      console.error('Critical send failure:', error);
      setCharacterState(CharacterAction.ERROR); 
      setNotification({ visible: true, type: 'error', message: 'Error sending email try later' });

      notificationTimeoutRef.current = setTimeout(() => {
        setCharacterState(CharacterAction.IDLE);
        setNotification(null);
      }, timeToResetCharacter);
    }
  };

  return (
    <section className="project-panel contact-panel">
      <button className="close-button" onClick={onClose} aria-label="Close Contact">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="12" />
        </svg>
      </button>

      <h2 className="section-title">Contact Me</h2>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name <span className="required-asterisk">*</span></label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              onChange={handleTyping}
              className="glass-input" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email <span className="required-asterisk">*</span></label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              onChange={handleTyping}
              className="glass-input" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message <span className="required-asterisk">*</span></label>
            <textarea 
              id="message" 
              name="message" 
              rows={4} 
              required 
              onChange={handleTyping}
              className="glass-input" 
            />
          </div>

          <button 
            type="submit" 
            className="action-button submit-button"
            disabled={characterState === CharacterAction.RUNNING}
          >
            {characterState === CharacterAction.RUNNING ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-canvas-container">
          <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />
            <ContactCharacter currentState={characterState} />
          </Canvas>
          
          {/* Notification UI overlay decoupled from the 3D rendering DOM. */}
          {notification?.visible && (
            <div className={`notification-popup ${notification.type}`}>
              {notification.type === 'success' ? (
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="12"></line>
                </svg>
              )}
              <span>{notification.message}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
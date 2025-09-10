'use client';

import { useState } from 'react';

interface PortalButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function PortalButton({ className = '', children }: PortalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok && data.url) {
        // Redirect to Stripe customer portal
        window.location.href = data.url;
      } else {
        console.error('Failed to create portal session:', data.error);
        alert('Failed to open billing portal. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${className} ${
        isLoading 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:opacity-90'
      } transition-opacity`}
    >
      {isLoading ? 'Opening Portal...' : children}
    </button>
  );
}
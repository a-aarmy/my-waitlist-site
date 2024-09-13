"use client";

import { useState } from 'react';

export default function Component() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const response = await fetch('https://api.sheety.co/cee29805c6f658ed57aad3def1/waitlist/sheet1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheet1: {
          email: email, // Ensure this matches the column name in your Google Sheet
        },
      }),
    });

    if (response.ok) {
      setSubmitted(true);
      setEmail('');
    } else {
      const errorData = await response.json();
      console.log('Error data:', errorData); // Logs specific error details
      setError(errorData.message || 'An error occurred. Please try again.');
    }
  } catch (err) {
    console.log('Caught error:', err); // Logs any error caught during fetch
    setError(`An error occurred: ${err.message}`);
  }
};

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: '0', zIndex: '-1', overflow: 'hidden' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(0,0,0,0.1)" strokeWidth="2">
            <animate attributeName="y1" values="0%;100%;0%" dur="20s" repeatCount="indefinite" />
            <animate attributeName="y2" values="100%;0%;100%" dur="20s" repeatCount="indefinite" />
          </line>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(0,0,0,0.1)" strokeWidth="2">
            <animate attributeName="x1" values="0%;100%;0%" dur="20s" repeatCount="indefinite" />
            <animate attributeName="x2" values="100%;0%;100%" dur="20s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
      <div style={{ zIndex: '10', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Are You Listening?</h1>
        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Coming Soon</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', marginBottom: '16px', border: '1px solid black', borderRadius: '4px', width: '100%', maxWidth: '300px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '4px', width: '100%', maxWidth: '300px' }}>
            Join the waitlist
          </button>
        </form>
        {submitted && <p style={{ color: 'green', marginTop: '16px' }}>Thank you for joining our waitlist!</p>}
        {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}
      </div>
    </div>
  );
}

import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} News Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
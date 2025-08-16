import React from 'react';

function ContactScreen() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, feel free to reach out to us using the information below:</p>
        <ul className="list-unstyled">
          <li>
            <strong>Email:</strong> ismailhossainmihad@gmail.comi
          </li>
          <li>
            <strong>Phone:</strong> +880 01877381814
          </li>
          <li>
            <strong>Address:</strong> Dhaka, Bangladesh
          </li>
        </ul>
        <p>We appreciate your interest in our news portal and will get back to you as soon as possible.</p>
      </div>
    </div>
  );
}

export default ContactScreen;
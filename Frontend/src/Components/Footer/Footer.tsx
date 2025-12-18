import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Utforska</h3>
        <ul>
          <li>
            <a href="https://studeravidare.se/kontakt/">Kontakta oss</a>
          </li>
          <li>
            <a href="https://studeravidare.se/nyhetsartiklar/">Blogg</a>
          </li>
          <li>
            <a href="https://studeravidare.se/vara-samarbetspartners/">
              Våra samarbetspartners
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Om oss!</h3>
        <ul>
          <li>
            <a href="https://studeravidare.se/om-oss/">Om Studeravidare</a>
          </li>
          <li>
            <a href="https://studeravidare.se/anvandarvillkor/">
              Användarvillkor
            </a>
          </li>
          <li>
            <a href="https://studeravidare.se/integritetspolicy/">
              Integritetspolicy
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Följ oss</h3>
        <ul>
          <li>
            <a
              href="https://www.instagram.com/studeravidare/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/studeravidare-sverige-ab/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

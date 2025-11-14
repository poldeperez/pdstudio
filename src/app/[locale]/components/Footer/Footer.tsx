import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Company Info */}
        <div className={styles.column}>
          <h3 className={styles.logo}>DEP STUDIO</h3>
          <p className={styles.tagline}>
            Crafting exceptional digital experiences through design and technology.
          </p>
        </div>

        {/* Contact Info */}
        <div className={styles.column}>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.list}>
            <li>
              <a href="mailto:hello@depstudio.com" className={styles.link}>
                hello@depstudio.com
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" className={styles.link}>
                +1 (234) 567-890
              </a>
            </li>
            <li className={styles.address}>
              123 Design Street<br />
              Creative City, CC 12345
            </li>
          </ul>
        </div>

        {/* Navigation Links */}
        <div className={styles.column}>
          <h4 className={styles.heading}>Navigate</h4>
          <ul className={styles.list}>
            <li>
              <Link href="/" className={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.link}>
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className={styles.link}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/work" className={styles.link}>
                Work
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className={styles.column}>
          <h4 className={styles.heading}>Follow</h4>
          <ul className={styles.list}>
            <li>
              <a 
                href="https://twitter.com/depstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                Twitter
              </a>
            </li>
            <li>
              <a 
                href="https://instagram.com/depstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                Instagram
              </a>
            </li>
            <li>
              <a 
                href="https://linkedin.com/company/depstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/depstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {currentYear} DEP Studio. All rights reserved.
        </p>
        <div className={styles.legal}>
          <Link href="/privacy" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={styles.legalLink}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
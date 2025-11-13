import { useState } from 'react';
import { useHeaderAnimation } from './useHeaderAnimation';
import Link from "next/link";
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { headerRef, companyNameRef, navLinksRef, menuBgRef, hoverMenuRef } = useHeaderAnimation();

    return (
        <header className={styles.header} ref={headerRef}>
            {/* Logo - Left */}
            <div className={styles.logo}>
                [ ds ]
            </div>

            {/* Company Name - Center (animated) */}
            <div className={styles.companyName} ref={companyNameRef}>
                dep studio
            </div>

            {/* Nav Menu - Right */}
            <div className={styles.navContainer}>
                <div className={styles.navLinks} ref={navLinksRef}>
                    <Link href="/" className={styles.navLink}>[ ABOUT ]</Link>
                    <Link href="/" className={styles.navLink}>[ SERVICES ]</Link>
                    <Link href="/" className={styles.navLink}>[ CONTACT ]</Link>
                </div>
                
                <div className={styles.menuWrapper} ref={hoverMenuRef}>
                    <button 
                        className={styles.menuButton}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        ref={menuBgRef}
                    >
                        <span className={styles.burgerIcon}>☰</span>
                        
                        {/* ✅ Links inside the same button background */}
                        <div className={styles.hoverMenuLinks}>
                            <Link href="/" className={styles.hoverMenuLink}>ABOUT</Link>
                            <Link href="/" className={styles.hoverMenuLink}>SERVICES</Link>
                            <Link href="/" className={styles.hoverMenuLink}>CONTACT</Link>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}
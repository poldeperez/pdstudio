"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { locales, type Locale } from "@/i18n/config";
import { useState } from 'react';
import { useHeaderAnimation } from './useHeaderAnimation';
import styles from './Header.module.css';

export default function Header() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { headerRef, companyNameRef, menuBgRef } = useHeaderAnimation();

    return (
        <header className={styles.header} ref={headerRef}>

            {/* Company Name - Left (animated) */}
            <Link href="/" className={styles.companyName} ref={companyNameRef}>
                dz node
            </Link>

            {/* Nav Menu - Right */}
            <div className={styles.menuWrapper}>
                <button 
                    className={styles.menuButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    ref={menuBgRef}
                >
                    <div className={styles.burgerIcon}>
                        <span className={`line ${styles.line}`}></span>
                        <span className={`line ${styles.line}`}></span>
                    </div>
                    
                    {/* Links inside the same button background */}
                    <div className={`menuContent ${styles.menuContent}`}>
                        {/* Navigation Links */}
                        <div className={`hoverMenuLinks ${styles.hoverMenuLinks}`}>
                            <Link href="/" className={`hoverMenuLink ${styles.hoverMenuLink}`}>SERVICES</Link>
                            <Link href="/contact" className={`hoverMenuLink ${styles.hoverMenuLink}`}>CONTACT</Link>
                        </div>
                        
                        {/* Language Selector */}
                        <div className={`hoverMenuLang ${styles.hoverMenuLang}`}>
                            {locales.map((lang) => (
                                <Link 
                                    key={lang}
                                    href={pathname}
                                    locale={lang}
                                    className={`hoverMenuLangs ${styles.hoverMenuLangs} ${locale === lang ? styles.active : ''}`}
                                >
                                    {lang.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                    </div>
                </button>
            </div>
        </header>
    );
}
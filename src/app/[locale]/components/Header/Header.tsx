"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from '@/i18n/navigation';
import { locales, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect } from 'react';
import { useHeaderAnimation } from './useHeaderAnimation';
import styles from './Header.module.css';

export default function Header() {
    const locale = useLocale();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const { headerRef, companyNameRef, menuBgRef } = useHeaderAnimation();
    const t = useTranslations("navigation");
    
    useEffect(() => {
        if (!isMenuOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

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
                                <Link href="/services" className={`hoverMenuLink ${styles.hoverMenuLink}`}>{t("services")}</Link>
                                <Link href="/works" className={`hoverMenuLink ${styles.hoverMenuLink}`}>{t("works")}</Link>
                                <Link href="/contact" className={`hoverMenuLink ${styles.hoverMenuLink}`}>{t("contact")}</Link>
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
                <div className={styles.menuMobile} ref={mobileMenuRef}>
                    <button 
                        className={`${styles.mobileButton} ${isMenuOpen ? styles.menuOpen : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        aria-label="Toggle menu"
                    >
                        <div className={styles.mobileIcon}>
                            <span className={styles.lineMobile}></span>
                            <span className={styles.lineMobile}></span>
                        </div>
                    </button>
                    {isMenuOpen && (
                        <div className={styles.mobileMenuBox}>
                            <div className={styles.mobileMenuContent}>
                                <div className={styles.mobileMenuLinks}>
                                    <Link href="/services" className={styles.mobileMenuLink}>{t("services")}</Link>
                                    <Link href="/works" className={styles.mobileMenuLink}>{t("works")}</Link>
                                    <Link href="/contact" className={styles.mobileMenuLink}>{t("contact")}</Link>
                                </div>
                                <div className={styles.mobileMenuLang}>
                                    {locales.map((lang) => (
                                        <Link 
                                            key={lang}
                                            href={pathname}
                                            locale={lang}
                                            className={`${styles.mobileMenuLangs} ${locale === lang ? styles.active : ''}`}
                                        >
                                            {lang.toUpperCase()}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
        </header>
    );
}
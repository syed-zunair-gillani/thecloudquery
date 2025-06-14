// filepath: c:\Users\danni\OneDrive\Documents\KiDa\kidaCode\wordpress-migration\src\app\components\navigation\index.js
import React from 'react';
import Link from 'next/link';
import ConditionalLazyImage from "../../atoms/conditional-image/ConditionalLazyImage";
import { FaSearch, FaUser } from "react-icons/fa"; // Import Font Awesome icons
import styles from "./navigation.module.scss";

const Navigation = () => {
    const isMobile = false; // Replace with actual logic or state
    const isSearchExpanded = false; // Replace with actual logic or state

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.content}>
                    <Link href="/" passHref>
                        <div
                            className={`${styles.logoContainer} ${
                                isMobile && isSearchExpanded ? styles.hidden : ""
                            }`}
                        >
                            <ConditionalLazyImage
                                src="/logo.svg"
                                alt="Logo"
                                width={200}
                                height={32}
                            />
                        </div>
                    </Link>

                    <div className={styles.rightSection}>
                        {/* Search Icon */}
                        
                            <FaSearch /> {/* Font Awesome Search Icon */}
                        

                        {/* Login Icon */}
                        
                            <FaUser /> {/* Font Awesome User Icon */}
                        
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
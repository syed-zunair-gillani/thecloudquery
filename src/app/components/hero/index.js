import React from 'react';
import Link from 'next/link';
import styles from './hero.module.scss';

const Hero = ({ title, content, buttonText, buttonLink }) => {
    return (
        <div className={styles.hero} style={{
            maxWidth: '960px',
            margin: '0 auto',
            marginBottom: '5rem',
            padding: '20px',
            borderRadius: '12px',
        }}>
            <div className={styles.herotxt}>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                {/* Conditionally render the button */}
                {buttonText && buttonLink && (
                    <Link className={styles.btn} href={buttonLink}>
                        {buttonText}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Hero;
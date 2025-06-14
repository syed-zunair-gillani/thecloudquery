import React from 'react';
import Link from 'next/link';
import styles from './breadcrumbs.module.scss'; // Create a corresponding SCSS file for styling

const Breadcrumbs = ({ title }) => {
  const breadcrumbs = [
    { name: 'Hochzeitsmodus', href: '/' },
    
    { name: title, href: '#' },
  ];

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {breadcrumb.href !== '#' ? (
              <Link href={breadcrumb.href}>
               {breadcrumb.name}
              </Link>
            ) : (
              <span>{breadcrumb.name}</span>
            )}
            {index < breadcrumbs.length - 1 && <span>&nbsp;{'>'}&nbsp;</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
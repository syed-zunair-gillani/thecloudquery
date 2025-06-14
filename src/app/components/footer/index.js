"use client";
import React, { useEffect, useState } from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import ConditionalLazyImage from "../../atoms/conditional-image/ConditionalLazyImage";
import { AiOutlineSpotify } from "react-icons/ai";
import { FaPinterest, FaTiktok } from "react-icons/fa";
import { fetchPages } from "../../utils/wordpressApi"; // Already optimized

const Footer = () => {

  const footerLinks = [
    { slug: "uber-uns", title: "Über Uns" , id: 1 },
    { slug: "kontakt", title: "Kontakt", id: 2 },
    { slug: "datenschutz", title: "Datenschutz", id: 3 },
  ];

  

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <ConditionalLazyImage
          src="/logo.svg"
          alt="Logo"
          width={260}
          height={40}
        />
        <p>© 2024 HOCHZEITSMODUS. Alle Rechte vorbehalten.</p>
      </div>

      <div className={styles.links}>
        <span>Hochzeitsmodus</span>
        <ul>
          {footerLinks.map((link) => (
            <li key={link.id}>
              <Link href={`/${link.slug}`}>
                {link.title|| link.slug}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.logos}>
        <span>Soziale Medien</span>
        <div className={styles.logosIcons}>
          <Link
            href="https://www.tiktok.com/@hochzeitsmodus?_t=8sXdddSnZrS&_r=1"
            target="_blank"
            aria-label="TikTok Profile"
          >
            <FaTiktok fill="#bfab9b" width={20} />
          </Link>
          <Link
            href="https://open.spotify.com/user/31uti2jm7zqm4unawz65ex4ryr7y?si=2b525d560cd74d31"
            target="_blank"
            aria-label="Spotify Profile"
          >
            <AiOutlineSpotify fill="#bfab9b" />
          </Link>
          <Link
            href="https://pin.it/2fniwbnuv"
            target="_blank"
            aria-label="Pinterest Profile"
          >
            <FaPinterest fill="#bfab9b" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

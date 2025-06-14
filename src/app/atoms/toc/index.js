// components/TOC.jsx
import styles from "./toc.module.scss"; // Or wherever your styles are

export default function TOC({ headers }) {
  if (!headers || headers.length === 0) return null;

  return (
    <div className={styles.toc}>
      <ul className={styles.tocScroll}>
        {headers.map((header) => (
          <li key={header.id}>
            <a href={`#${header.id}`}>{header.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
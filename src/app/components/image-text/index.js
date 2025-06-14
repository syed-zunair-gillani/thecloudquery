import React from 'react';
import Image from 'next/image';
import styles from './image-text.module.scss';

const ImageText = ({ blockClassName, title, text, imageSrc, imageAlt, imageClass }) => {
  const isReverse = blockClassName === 'reverse';

  return (
    <div className={styles.flexContainer}>
      {isReverse ? (
        <>
          <div className={styles.imageContainer}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={300} // Adjust the width as needed
              height={300} // Adjust the height as needed
              className={imageClass || styles.clippedImageReverse}
            />
          </div>
          <div className={styles.textContainer}>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: text }} />

             
     
          </div>
        </>
      ) : (
        <>
          <div className={styles.textContainer}>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={300} // Adjust the width as needed
              height={300} // Adjust the height as needed
              className={imageClass || styles.clippedImage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageText;

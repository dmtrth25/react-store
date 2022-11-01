import { FC } from 'react';

import styles from './NotFound.module.scss';

export const NotFound: FC = () => {
  return (
    <>
      <div className={styles.root}>
        <h1>
          <span>😕</span>
          <br />
          <p>Nothing found</p>
        </h1>
        <p className={styles.description}>The page is not found</p>
      </div>
    </>
  );
}

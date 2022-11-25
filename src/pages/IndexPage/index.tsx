import type { FC } from 'react'
import styles from './index.module.scss'

const publicUrl = process.env.PUBLIC_URL

const IndexPage: FC = () => {
  return (
    <>
      <h2 className={styles.textPrimary}>Index Page</h2>
      <img
        className={styles.imgLogo}
        src={`${publicUrl}/logo512.png`}
        alt="logo"
      />
      <div className={styles.bgLogo}></div>
    </>
  )
}

export default IndexPage

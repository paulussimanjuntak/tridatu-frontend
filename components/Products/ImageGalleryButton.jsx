import styles from './imageGalleryButton.module.css'

export const renderLeftNav = (onClick, disabled) => {
  return (
    <button
      className={styles.image_gallery_custom_left_nav}
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`${styles.left_arrow} far fa-chevron-left left_arrow`} />
    </button>
  )
}

export const renderRightNav = (onClick, disabled) => {
  return (
    <button
      className={styles.image_gallery_custom_right_nav}
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`${styles.right_arrow} far fa-chevron-right`} />
    </button>
  )
}

export const renderFullscreenButton = (onClick, isFullscreen) => {
  return (
    <button
      className={`${styles.image_gallery_fullscreen}${isFullscreen ? ' active' : ''}`}
      onClick={onClick}
    >
      <i className={`${styles.right_arrow} fa-lg far fa-expand`} />
    </button>
  )
}

import { leftArrowStyle, rightArrowStyle, fullscreenStyle } from './styleImageGalleryButton'

export const renderLeftNav = (onClick, disabled) => {
  return (
    <>
      <button
        className="image_gallery_custom_left_nav"
        disabled={disabled}
        onClick={onClick}
      >
        <i className="far fa-chevron-left left_arrow" />
      </button>
      <style jsx>{leftArrowStyle}</style>
    </>
  )
}

export const renderRightNav = (onClick, disabled) => {
  return (
    <>
      <button
        className="image_gallery_custom_right_nav"
        disabled={disabled}
        onClick={onClick}
      >
        <i className="far fa-chevron-right right_arrow" />
      </button>
      <style jsx>{rightArrowStyle}</style>
    </>
  )
}

export const renderFullscreenButton = (onClick, isFullscreen) => {
  return (
    <>
      <button
        className={`image_gallery_fullscreen ${isFullscreen ? ' active' : ''}`}
        onClick={onClick}
      >
        <i className="right_arrow fa-lg far fa-expand" />
      </button>
      <style jsx>{fullscreenStyle}</style>
    </>
  )
}

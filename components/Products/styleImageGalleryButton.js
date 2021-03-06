import css from "styled-jsx/css";

export const leftArrowStyle = css`
.image_gallery_custom_left_nav{
  position: absolute;;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  outline: 0px;
  transition: all 0.5s ease 0s;
  border-radius: 35px;
  border: 0px;
  background: #ffffff99;
  color: #6a6a6a;
  min-width: 30px;
  min-height: 30px;
  opacity: 1;
  cursor: pointer;
  margin-left: 6px;
}
.image_gallery_custom_left_nav:hover{
  background: #ffffffdb;
  color: #6a6a6a;
}
.image_gallery_custom_left_nav:focus{
  outline: none;
}
.left_arrow{
  margin-left: -2px;
  margin-top: 1px;
}
`

export const rightArrowStyle = css`
.image_gallery_custom_right_nav{
  position: absolute;;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  outline: 0px;
  transition: all 0.5s ease 0s;
  border-radius: 35px;
  border: 0px;
  background: #ffffff99;
  color: #6a6a6a;
  min-width: 30px;
  min-height: 30px;
  opacity: 1;
  cursor: pointer;
  right: 0;
  margin-right: 6px;
}
.image_gallery_custom_right_nav:hover{
  background: #ffffffdb;
  color: #6a6a6a;
}
.image_gallery_custom_right_nav:focus{
  outline: none;
}
.right_arrow{
  margin-right: -2px;
  margin-top: 1px;
}
`

export const fullscreenStyle = css`
.image_gallery_fullscreen:focus{
  outline: none;
}
.image_gallery_fullscreen{
  position: absolute;;
  z-index: 4;
  outline: 0px;
  transition: all 0.5s ease 0s;
  border: 0px;
  background: transparent;
  opacity: 1;
  color: #ffffffbf;
  cursor: pointer;
  right: 0;
  bottom: 0;
  margin-right: 3px;
  margin-bottom: 8px;
  font-size: 20px;
  filter: drop-shadow(0 2px 2px #1a1a1a);
}
.image_gallery_fullscreen:hover{
  font-size: 23px;
  color: #fff;
}
.right_arrow{
  margin-right: -2px;
  margin-top: 1px;
}
`

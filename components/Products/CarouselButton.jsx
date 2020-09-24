import { Button } from "antd";

const renderArrow = direction => (onClickHandler, shouldBeEnabled) => {
  if (!shouldBeEnabled) return;

  const styles = {
    position: "absolute",
    cursor: "pointer",
    top: "45%",
    zIndex: 2,
    width: "30px",
    paddingBottom: "2px"
  };

  if (direction === "prev") {
    styles.left = 5;
    styles.paddingLeft = "5px";
    styles.paddingRight = "6px";
  } else {
    styles.right = 5;
    styles.paddingLeft = "6px";
    styles.paddingRight = "5px";
  }

  return (
    <Button
      onClick={onClickHandler}
      style={styles}
    >
      {direction === "prev" ? (
        <i className="fas fa-chevron-left"></i>
      ) : (
        <i className="fas fa-chevron-right"></i>
      )}
    </Button>
  );
};

export default renderArrow

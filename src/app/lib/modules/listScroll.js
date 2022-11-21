function containerNeedsArrow(className) {
  let needsArrow = false;
  const list = document.querySelector("." + className);
  const container = document.querySelector("." + className + "Container");
  if (!!!list || !!!container) return;
  if (list && list.clientWidth > container.clientWidth) {
    needsArrow = true;
  }
  return needsArrow;
}

function adjustContainerSize(className) {
  const container = document.querySelector("." + className);
  if (container) {
    let containerWidth = 0;
    const entries = document.querySelectorAll("." + className + "__entry");
    if (entries.length) {
      entries.forEach((entry) => {
        const entryStyle = getComputedStyle(entry);
        const marginRight = parseInt(entryStyle.marginRight);
        containerWidth += entry.clientWidth + marginRight;
      });
    }
    container.style.width = containerWidth + "px";
  }
}

function setArrowBehavior(arrow, className, backArrow) {
  const list = document.querySelector("." + className);
  const container = document.querySelector("." + className + "Container");
  const entry = document.querySelectorAll("." + className + "__entry")[0];

  arrow.addEventListener("click", () => {
    const listStyle = getComputedStyle(list);
    const listCurrentLeft = parseInt(listStyle.left);
    const listWidth = parseInt(list.style.width);
    const containerWidth = container.clientWidth;
    const entryStyle = getComputedStyle(entry);
    const marginRight = parseInt(entryStyle.marginRight);
    const entryWidth = entry.clientWidth;

    let leftValue = listCurrentLeft;

    if (Math.abs(leftValue) + containerWidth - entryWidth < listWidth) {
      leftValue = parseInt(listStyle.left) - (entryWidth + marginRight);
      if (listCurrentLeft == 0) {
        leftValue -= 18;
      }
      list.style.left = leftValue + "px";
      showHideArrows(
        arrow,
        backArrow,
        className,
        listWidth,
        containerWidth,
        entryWidth,
        leftValue
      );
    }
  });

  backArrow.addEventListener("click", () => {
    const listStyle = getComputedStyle(list);
    const listCurrentLeft = parseInt(listStyle.left);
    const listWidth = parseInt(list.style.width);
    const containerWidth = container.clientWidth;
    const entryStyle = getComputedStyle(entry);
    const marginRight = parseInt(entryStyle.marginRight);
    const entryWidth = entry.clientWidth;

    let leftValue = listCurrentLeft;

    if (Math.abs(leftValue) > 0) {
      leftValue = parseInt(listStyle.left) + (entryWidth + marginRight);
      leftValue = leftValue > 0 ? 0 : leftValue;
      list.style.left = leftValue + "px";
      showHideArrows(
        arrow,
        backArrow,
        className,
        listWidth,
        containerWidth,
        entryWidth,
        leftValue
      );
    }
  });
}

function showHideArrows(
  arrow,
  backArrow,
  className,
  listWidth,
  containerWidth,
  entryWidth,
  leftValue
) {
  if (Math.abs(leftValue) + containerWidth - entryWidth >= listWidth) {
    arrow.style.display = "none";
  } else {
    arrow.style.display = "flex";
  }

  if (Math.abs(leftValue) > 0) {
    backArrow.style.display = "flex";
  } else {
    backArrow.style.display = "none";
  }
}

export {
  showHideArrows,
  setArrowBehavior,
  adjustContainerSize,
  containerNeedsArrow,
};

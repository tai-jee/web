let uid = 0;
document.querySelectorAll(".dict").forEach((word) => {
  const anchor = `--def-word-${++uid}`;
  word.style.anchorName = anchor;

  const pop = document.createElement("aside");
  pop.popover = "hint";
  pop.classList.add("dict-popover", "drop");
  pop.style.positionAnchor = anchor;

  const popWord = document.createElement("p");
  pop.appendChild(popWord);
  popWord.textContent = word.textContent;
  popWord.classList.add("dict-term");

  const popDef = document.createElement("p");
  pop.appendChild(popDef);
  popDef.textContent = word.dataset.def;
  popDef.classList.add("dict-def");

  document.body.append(pop);

  word.addEventListener("mouseenter", () => pop.showPopover());
  word.addEventListener("mouseleave", () => pop.hidePopover());
  word.addEventListener("click", () => pop.togglePopover());
});

"use strict";

document.querySelector("#exportAs").addEventListener("contextmenu", () => {
  console.log("rightclick");
  document.getElementById("exportAs").style.display = "none";
  document.getElementById("export-options").style.display = "flex";
  document.getElementById("export-options").style.gap = "20px";
});

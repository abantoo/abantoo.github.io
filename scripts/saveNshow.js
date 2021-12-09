"use strict";

const fs = require("fs");

const feedback = document.querySelector(".feedback-btn");

let message = "hola";

feedback.addEventListener("click", () => {
  console.log(document.querySelector("#message").value);
});

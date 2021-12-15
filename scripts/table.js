"use strict";

var i = 1;

document.querySelector(".feedback-btn").addEventListener("click", () => {
  var tbl = document.getElementById("myTable");
  var row = tbl.insertRow(i);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = document.querySelector("#email").value;
  cell2.innerHTML = document.querySelector("#message").value;
  i++;
});

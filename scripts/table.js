"use strict";

const form = document.getElementById("form");

var i = 1;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateEmail(document.querySelector("#email").value)) {
    alert("not a valid email format");
  } else if (document.querySelector("#message").value === "") {
    alert("Write something");
  } else {
    var tbl = document.getElementById("myTable");
    var row = tbl.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = document.querySelector("#email").value;
    cell2.innerHTML = document.querySelector("#message").value;
    i++;
  }
});

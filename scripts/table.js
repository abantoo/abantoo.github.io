"use strict";

const form = document.getElementById("form");
const daArray = [];

var i = 1;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const sendToServer = (email, message) => {
  const xhttp = new XMLHttpRequest();
  const url = "http://d800-2401-ff80-1880-7e2a-f0bd-799f-9967-44c2.ngrok.io";
  xhttp.open("POST", url, true);

  //Send the proper header information along with the request
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(`mail=${email}&feedback=${message}`);
};

const receieveFromServer = () => {
  const xhttp = new XMLHttpRequest();
  const url = "http://d800-2401-ff80-1880-7e2a-f0bd-799f-9967-44c2.ngrok.io";
  var data;

  xhttp.open("GET", url, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(xhttp.responseText);
      console.log(data);
    }
  };

  xhttp.send();
};

form.addEventListener("submit", (e) => {
  var email = document.querySelector("#email").value;
  var message = document.querySelector("#message").value;
  e.preventDefault();
  if (!email) {
    alert("not a valid email format");
  } else if (message === "") {
    alert("Write something");
  } else {
    // TODO: call backend to store the feedback

    sendToServer(email, message);
    receieveFromServer();

    // TODO: retrieve data

    // var tbl = document.getElementById("myTable");
    // var row = tbl.insertRow(i);
    // var cell1 = row.insertCell(0);
    // var cell2 = row.insertCell(1);

    // cell1.innerHTML = daArray[i].mail;
    // cell2.innerHTML = daArray[i].feedback;
    i++;
  }
});

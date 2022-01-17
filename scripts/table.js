"use strict";

const form = document.getElementById("form");

const url = "https://0c43-2401-ff80-1880-7e2a-fd19-2c2a-fad1-6019.ngrok.io";
var storage;

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

  xhttp.open("POST", url, true);

  //Send the proper header information along with the request
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(`mail=${email}&feedback=${message}`);
};

const receieveFromServer = () => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", url, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data;
      //data.push(JSON.parse(xhttp.response));

      data = JSON.parse(xhttp.responseText);

      data.forEach((item, length) => {
        console.log(i);
        console.log(item);

        var tbl = document.getElementById("myTable");
        var row = tbl.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = item.mail;
        cell2.innerHTML = item.feedback;
        i++;
      });
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
    sendToServer(email, message);
    receieveFromServer();
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }
});

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
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    const url = "http://d800-2401-ff80-1880-7e2a-f0bd-799f-9967-44c2.ngrok.io";
    xhr.open("POST", url, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
      }
    };
    xhr.send(`mail=${email}&feedback=${message}`);

    // console.log(xhr);
    // daArray.push({ mail: email, feedback: message });
    // console.log(daArray);

    // TODO: retrieve data

    // console.log("hi");

    // xhr.onload = () => {
    //   var data = JSON.parse(this.responseText); //parse the string to JSON
    //   console.log(data.JSON);
    // };

    // xhr.open(
    //   "GET",
    //   "http://d800-2401-ff80-1880-7e2a-f0bd-799f-9967-44c2.ngrok.io"
    // ); // open a GET request
    // xhr.send(); // send the request to the server.

    var tbl = document.getElementById("myTable");
    var row = tbl.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // cell1.innerHTML = daArray[i].mail;
    // cell2.innerHTML = daArray[i].feedback;
    i++;
  }
});

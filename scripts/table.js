"use strict";

const form = document.getElementById("form");
const tbl = document.getElementById("myTable");

const param = new URLSearchParams(window.location.search);

const url = param.get("server");

let i = 1;

window.onload = () => {


  if (url) {
    receieveFromServer();

    //TODO: hides tables creates div instead with horizontal scrolling
    // const tableDiv = document.getElementById("table-div");
    // tableDiv.style.display = "none";

    // let fbDiv = document.createElement("div").classLis;


    // const fbc = document.getElementById("feedback-container")



  }
};

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
  // Send the proper header information along with the request
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(`email=${email}&feedback=${message}`);
  //location.reload();
};

let j = 1;

const receieveFromServer = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data;

      data = JSON.parse(xhttp.responseText);

      data.forEach((item, length) => {
        let row = tbl.insertRow(j);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = item.email;
        cell2.innerHTML = item.feedback;

        j++;
      });

      //i = 1;
    }
  };

  xhttp.send();
};

let counterForNoParams = 1;

form.addEventListener("submit", (e) => {
  let email = document.querySelector("#email").value;
  let message = document.querySelector("#message").value;
  e.preventDefault();
  if (!email) {
    alert("not a valid email format");
  } else if (!message.trim()) {
    alert("Write something");
  } else if (url) {
    const promise = new Promise((resolve, reject) => {
        sendToServer(email, message);
      })
      .then(receieveFromServer())
      .catch((error) => console.log(error));

    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  } else {
    let row = tbl.insertRow(counterForNoParams);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    cell1.innerHTML = email;
    cell2.innerHTML = message;

    counterForNoParams++;

    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }
});
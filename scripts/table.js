"use strict";

const form = document.getElementById("form");

const url = "https://0c43-2401-ff80-1880-7e2a-fd19-2c2a-fad1-6019.ngrok.io";

let i = 1;

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
  xhttp.send(`mail=${email}&feedback=${message}`);
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
        let tbl = document.getElementById("myTable");
        let row = tbl.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = item.mail;
        cell2.innerHTML = item.feedback;
        i++;
      });

      j++;
      i = 1;
    }
  };

  xhttp.send();
};

form.addEventListener("submit", (e) => {
  let email = document.querySelector("#email").value;
  let message = document.querySelector("#message").value;
  e.preventDefault();
  if (!email) {
    alert("not a valid email format");
  } else if (!message.trim()) {
    alert("Write something");
  } else {
    const promise = new Promise((resolve, reject) => {
      sendToServer(email, message);
    })
      .then(receieveFromServer())
      .catch((error) => console.log(error));

    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }
});

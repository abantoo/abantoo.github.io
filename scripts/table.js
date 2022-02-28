"use strict";

const form = document.getElementById("form");
const tbl = document.getElementById("myTable");

const intro_p = document.getElementById("intro-p");

const param = new URLSearchParams(window.location.search);

const intro_arr = ["tech enthusiast", "programmer", "web developer"]


const url = param.get("server");

const reviews = [];

const img = document.getElementById("person-img-feedback");
const author = document.getElementById("author-feedback");
const job = document.getElementById("job-feedback");
const info = document.getElementById("info-feedback");

const prevBtn = document.querySelector(".prev-btn-feedback");
const nextBtn = document.querySelector(".next-btn-feedback");

let i = 1;

window.onload = () => {

  setInterval(intro_p_f, 2000)

  if (url) {
    receieveFromServer();

    //TODO: hides tables creates div instead with horizontal scrolling
    // const tableDiv = document.getElementById("table-div");
    // tableDiv.style.display = "none";
    // let fbDiv = document.createElement("div").classLis;
    // const fbc = document.getElementById("feedback-container")

  }
};

const intro_p_f = () => {
  for (let tag in intro_arr) {
    intro_p.innerHTML = intro_arr[tag];
  }

}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const showPerson = (person) => {
  const item = reviews[person];
  // img.src = item.img;
  // author.textContent = item.name;
  // job.textContent = item.job;
  // info.textContent = item.text;
  author.textContent = item.email;
  info.textContent = item.feedback
}

// show next person
nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});
// show prev person
prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});

const sendToServer = (email, message) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  // Send the proper header information along with the request
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(`email=${email}&feedback=${message}`);
  //location.reload();
};

let j = 1;

// select items

// set starting item

const receieveFromServer = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      reviews = JSON.parse(xhttp.responseText);

      let data;
      let currentItem = 0;

      data = JSON.parse(xhttp.responseText);

      const item = data[currentItem];
      author.textContent = item.email;
      info.textContent = item.feedback



      // let data;

      // data = JSON.parse(xhttp.responseText);

      // data.forEach((item, length) => {
      //   let row = tbl.insertRow(j);
      //   let cell1 = row.insertCell(0);
      //   let cell2 = row.insertCell(1);

      //   cell1.innerHTML = item.email;
      //   cell2.innerHTML = item.feedback;

      //   j++;
      // });

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
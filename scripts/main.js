// window.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("myid").addEventListener("click", () => {
//     console.log("clicked");
//   });
// });

const executeCommand = (command) => {
  if (command === "clear") {
    return { data: "", status: true };
  } else if (command === "--help") {
    return {
      data: "commands: --home --projects --about --feedback --clear",
      status: true,
    };
  } else {
    return {
      data: "not a valid command --clear to clear the window",
      status: false,
    };
  }
};

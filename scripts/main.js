// window.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("myid").addEventListener("click", () => {
//     console.log("clicked");
//   });
// });

// TODO: add regex check to filter commands example: ABout/about/aBout should take to about and abt should suggest about
// TODO: terminal minimize on bottom right
const PAGE_SECTIONS = ["home", "projects", "about", "feedback"];

const onOpenTerminal = () => {
  const terminal = document.getElementById("terminal");
  const mini_terminal = document.getElementById("miniTerminal");
  mini_terminal.classList.add("hidden");
  terminal.classList.remove("hidden");
};

const onCloseTerminal = () => {
  const terminal = document.getElementById("terminal");
  const mini_terminal = document.getElementById("miniTerminal");
  terminal.classList.add("hidden");
  mini_terminal.classList.remove("hidden");
};

const onMinimizeTerminal = () => {
  const terminal = document.getElementById("terminal");
  terminal.classList.remove("w-1/3", "h-1/3");
  terminal.classList.add("w-1/4", "h-1/6");
};

const onFullScreenTerminal = () => {
  const terminal = document.getElementById("terminal");
  terminal.classList.remove("w-1/4", "h-1/6");
  terminal.classList.add("w-1/3", "h-1/3");
};

const executeCommand = (command) => {
  let newCommand = command.replace(/[^a-zA-Z ]/g, "").toLowerCase();
  if (newCommand) {
    if (PAGE_SECTIONS.includes(newCommand)) {
      window.location.hash = newCommand;
    } else {
      if (newCommand === "help") {
        return {
          data: "commands: --home --projects --about --feedback --clear",
          status: true,
          hint: true,
        };
      } else if (newCommand === "hint") {
        return {
          hint: true,
        };
      } else {
        return {
          data: "not a valid command. hint to get hints / help to get help",
          status: false,
        };
      }
    }
  } else {
    const foods = [
      "🍔",
      "🍿",
      "🍰",
      "🍍",
      "🥭",
      "🧁",
      "🍩",
      "🎂",
      "🥧",
      "🥨",
      "🥞",
      "🍕",
      "🍟",
      "🍛",
    ];
    const loves = ["❤", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍"];
    return {
      data: `I ${loves[Math.floor(Math.random() * loves.length)]}  ${
        foods[Math.floor(Math.random() * foods.length)]
      }`,
      status: true,
      color: "blue",
    };
  }
};

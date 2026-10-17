"use strict";
document.querySelector("#hero-demo").onclick = () => {
  if (CS.login("Client")) location.href = "client-project-overview.html";
};
document.querySelectorAll("[data-role]").forEach(
  (button) =>
    (button.onclick = () => {
      if (button.dataset.role === "Client") {
        if (CS.login("Client")) location.href = "client-project-overview.html";
      } else {
        location.href =
          "login.html?role=" + encodeURIComponent(button.dataset.role);
      }
    }),
);

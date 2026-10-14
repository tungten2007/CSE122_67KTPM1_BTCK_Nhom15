"use strict";
document.querySelector("#hero-demo").onclick = () => {
  if (CS.login("Client")) location.href = CS.home();
};
document.querySelectorAll("[data-role]").forEach(
  (button) =>
    (button.onclick = () => {
      if (CS.login(button.dataset.role))
        location.href = CS.home();
    }),
);

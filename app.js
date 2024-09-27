window.addEventListener("DOMContentLoaded", loadProjects);

const nav = document.querySelector("#nav");
const openMenuBtn = document.querySelector("#open_nav");
const closeMenuBtn = document.querySelector("#close_nav");
const menuLinks = document.querySelectorAll(".menu_links");
const projectsList = document.querySelector("#projects_list");
const regexp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const user_name = document.forms["contact_form"]["user_name"];
const user_email = document.forms["contact_form"]["user_email"];
const subject = document.forms["contact_form"]["subject"];
const message = document.forms["contact_form"]["message"];
const nameError = document.querySelector(".name_error");
const emailError = document.querySelector(".email_error");
const subjectError = document.querySelector(".subject_error");
const messageError = document.querySelector(".message_error");
const submitBtn = document.querySelector(".submit_btn");
const formInputs = document.querySelectorAll(".form_input");

formInputs.forEach((child) => {
  child.addEventListener("keypress", () => {
    if (child.classList.contains("focus:border-red-600"))
      child.classList.replace("focus:border-red-600", "focus:border-slate-950");
  });
});

const openNav = () => {
  nav.classList.remove("w-0");
  nav.classList.add("w-screen", "bg-white");
};

const closeNav = () => {
  nav.classList.remove("w-screen", "bg-white");
  nav.classList.add("w-0");
};

openMenuBtn.addEventListener("click", openNav);
closeMenuBtn.addEventListener("click", closeNav);

menuLinks.forEach((menu_link) => {
  menu_link.addEventListener("click", closeNav);
});

async function loadProjects() {
  const projects = [];
  await fetch("./data/projects.json")
    .then((res) => res.json())
    .then((res) =>
      res.map((data) => {
        projects.push(`<li
            class="project"
          >
          <img src="./data/images/${data.project_image}" alt="${
          data.name
        } image" />
        <div class="project_div">
        <div class="w-full">
        <div class="pb-1 md:pb-2 xl:pb-3">
        <h3 class="text-lg md:text-xl xl:text-2xl uppercase font-bold">
          ${data.name}
        </h3>
        <ul class="w-full flex flex-wrap uppercase">
        ${data.tech_stack
              .map(
                (stack, i) =>
                  `<li
                class="${
                  data.tech_stack[i + 1] ? "pr-2 mr-2 border-r-2 border-slate-950" : ""
                  } text-xs"
                  >
                  ${stack}
                  </li>`
                )
                .join("")}
          </ul>
        </div>
          <p class="py-1 md:py-2 text-sm xl:text-base">${data.description}</p>
        </div>
          <div class="w-full flex gap-2 mt-2 mb-3 md:text-lg xl:text-xl">
            <a href="${
              data.links[0]
            }" target="_blank aria-label="link to github repo">
            <iconify-icon icon="devicon:github"></iconify-icon>
            </a>
            <a href="${data.links[1]}" target="_blank aria-label="link to demo">
            <iconify-icon icon="ph:link-bold"></iconify-icon>
            </a>
          </div>
          </div>
          </li>`);
      })
    );
  projectsList.innerHTML = projects.join("");
}

function ValidationForm() {
  if (user_name.value == "") {
    user_name.classList.replace(
      "focus:border-slate-950",
      "focus:border-red-600"
    );
    nameError.textContent = "Please enter your name.";
    user_name.focus();
    return false;
  }
  if (user_email.value == "" || !regexp.test(user_email.value)) {
    user_email.classList.replace(
      "focus:border-slate-950",
      "focus:border-red-600"
    );
    emailError.textContent = "Please enter a valid e-mail address.";
    user_email.focus();
    return false;
  }
  if (subject.value == "") {
    subject.classList.replace("focus:border-slate-950", "focus:border-red-600");
    subjectError.textContent = "Please enter subject of message";
    subject.focus();
    return false;
  }
  if (message.value == "") {
    message.classList.replace("focus:border-slate-950", "focus:border-red-600");
    messageError.textContent = "Please enter a message";
    message.focus();
    return false;
  }
  return true;
}

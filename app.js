const nav = document.querySelector("#nav");
const openMenuBtn = document.querySelector("#open_nav");
const closeMenuBtn = document.querySelector("#close_nav");
const menuLinks = document.querySelectorAll(".menu_links");
const projectsList = document.querySelectorAll(".projects");

const openNav = () => {
  nav.classList.remove("w-0");
  nav.classList.add("w-screen");
};

const closeNav = () => {
  nav.classList.remove("w-screen");
  nav.classList.add("w-0");
};

openMenuBtn.addEventListener("click", openNav);
closeMenuBtn.addEventListener("click", closeNav);

menuLinks.forEach((menu_link) => {
  menu_link.addEventListener("click", closeNav);
});

const loadProjects = () => {
  fetch("./data/projects.json")
    .then((res) => res.json())
    .then((res) => res.map((data, i) => {
            projectsList[i].innerHTML = `<div class="w-full">
        <img src="./data/images/${data.project_image}" alt={${data.name} image} />
        <h3 class="text-lg sm:text-xl md:text-2xl lg:text-3xl py-1 sm:py-4 lg:py-6 uppercase font-bold">
          ${data.name}
        </h3>
        <p class="my-1 lg:text-xl">${data.description}</p>
        </div>
        <div class="w-full mt-4 sm:mt-6 lg:mt-8">
          <ul class="w-full flex flex-wrap uppercase">
            ${data.tech_stack.map((stack, i) => (
              `<li
                class="${
                  data.tech_stack[i + 1] ? "border-r-2 border-slate-950" : ""
                } px-2"
              >
                ${stack}
              </li>`
            )).join('')}
          </ul>
          <div class="w-full flex gap-2 my-1 px-2 text-2xl md:text-3xl lg:text-4xl">
            <a href="${data.links[0]}">
            <iconify-icon icon="devicon:github"></iconify-icon>
            </a>
            <a href="${data.links[1]}">
            <iconify-icon icon="ph:link-bold"></iconify-icon>
            </a>
          </div>
        </div>`})
    );
};

window.addEventListener("DOMContentLoaded", loadProjects);

const regexp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

function ValidationForm() {
  const name = document.forms["contact_form"]["name"];
  const email = document.forms["contact_form"]["email"];
  const message = document.forms["contact_form"]["message"];
  const nameError = document.querySelector(".name_error");
  const emailError = document.querySelector(".email_error");
  const messageError = document.querySelector(".message_error");
  if (name.value == "") {
    name.classList.replace('focus:border-slate-950', 'focus:border-red-600')
    nameError.textContent = "Please enter your name."
    name.focus();
    return false;
  }
  if (email.value == "" || !regexp.test(email.value)) {
    email.classList.replace('focus:border-slate-950', 'focus:border-red-600')
    emailError.textContent = "Please enter a valid e-mail address."
    email.focus();
    return false;
  }
  if (message.value == "") {
    message.classList.replace('focus:border-slate-950', 'focus:border-red-600')
    messageError.textContent = "Please enter a message"
    message.focus();
    return false;
  }
  return true;
}
const formInputs = document.querySelectorAll('.form_input')
formInputs.forEach(child => {
    child.addEventListener('keypress', () => {
        if (child.classList.contains('focus:border-red-600')) child.classList.replace('focus:border-red-600', 'focus:border-slate-950')
    })
})
// const contact_form = document.forms["contact_form"]
// contact_form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     return ValidationForm();
// })
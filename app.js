const nav = document.querySelector("#nav");
const openMenuBtn = document.querySelector("#open_nav");
const closeMenuBtn = document.querySelector("#close_nav");
const menuLinks = document.querySelectorAll(".menu_links");
const projectsList = document.querySelector("#projects_list");

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
    .then((res) => {
        const html =  res.map(data =>
            (
            `<li class="w-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 rounded-md md:rounded-lg bg-white hover:bg-slate-300 drop-shadow sm:drop-shadow-md lg:drop-shadow-xl">
        <div class="w-full">
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
        </div>
      </li>`)).join('')
      projectsList.innerHTML = html
    });
};

window.addEventListener("load", loadProjects);

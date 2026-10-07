/* ELEMENTOS */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");


/* HEADER AO ROLAR */

function updateHeader() {
    if (!header) {
        return;
    }

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* MENU MOBILE */

function openMenu() {
    if (!menuToggle || !mainNav || !header) {
        return;
    }

    mainNav.classList.add("open");
    menuToggle.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Fechar menu"
    );

    header.classList.add("menu-open");
}

function closeMenu() {
    if (!menuToggle || !mainNav || !header) {
        return;
    }

    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menu"
    );

    header.classList.remove("menu-open");
}

function toggleMenu() {
    if (!mainNav) {
        return;
    }

    if (mainNav.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (menuToggle) {
    menuToggle.addEventListener(
        "click",
        toggleMenu
    );
}


/* FECHAR MENU AO CLICAR EM LINK */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});


/* FECHAR MENU AO REDIMENSIONAR */

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});


/* FECHAR MENU COM ESC */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


/* REVEAL AO ENTRAR NA TELA */

const revealElements = document.querySelectorAll(".reveal");

function showImmediately() {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(
                    entry.target
                );
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    showImmediately();
}


/* DELAY ENTRE OS ELEMENTOS */

revealElements.forEach((element, index) => {
    const delay = (index % 5) * 70;

    element.style.transitionDelay =
        `${delay}ms`;
});


/* LINK ATIVO CONFORME A SEÇÃO */

if (
    "IntersectionObserver" in window &&
    sections.length > 0
) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const currentId =
                    entry.target.id;

                navLinks.forEach((link) => {
                    const target =
                        link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        target === `#${currentId}`
                    );
                });
            });
        },
        {
            threshold: 0.25,
            rootMargin: "-25% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


/* CORREÇÃO PARA O HERO */

function updateInitialActiveLink() {
    if (window.scrollY < 150) {
        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#inicio"
            );
        });
    }
}

window.addEventListener(
    "scroll",
    updateInitialActiveLink,
    {
        passive: true
    }
);

updateInitialActiveLink();


/* LINKS EXTERNOS */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach((link) => {
    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );
});

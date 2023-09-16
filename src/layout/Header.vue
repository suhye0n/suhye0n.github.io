<template>
    <div class="header">
        <a href="#">@suhye0n's Portfolio</a>
        <div class="header-btn">
            <a href="#1">ABOUT ME</a>
            <a href="#2">SKILLS</a>
            <a href="#3">ARCHIVING</a>
            <a href="#4">PROJECTS</a>
            <a href="#5">AWARD</a>
            <!--a href="#6">CAREER</a-->
        </div>
    </div>
</template>

<script>
const App = {
    data: () => {
        return {
            testNumber: 1,
            testString: '문자열'
        }
    },
    methods: {
        setupSmoothScroll() {
            const links = document.querySelectorAll('.header-btn a');
            const headerHeight = document.querySelector('.header').offsetHeight;

            links.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    const href = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(href);

                    const offsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;

                    window.scrollTo({
                        top: offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                });
            });
        }
    },
    mounted() {
        this.setupSmoothScroll();
    }
}

export default App;
</script>

<style>
* {
    scroll-behavior: smooth;
}

a {
    text-decoration-line: none;
    color: var(--font-color);
}

.header {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    grid-area: header;
    width: 100%;
    padding: 11px 40px;
    background: var(--header-background-color);
    box-shadow: 0px 2px 4px 0px var(--shadow-color);
}

.header-btn {
    display: inline-flex;
    margin-left: auto;
    gap: 20px;
    font-size: 14px;
}
</style>
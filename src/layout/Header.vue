<template>
    <div class="header">
        <a href="#">@suhye0n's Portfolio</a>
        <div class="header-btn">
            <a href="#1">ABOUT ME</a>
            <a href="#2">SKILLS</a>
            <a href="#3">ARCHIVING</a>
            <a href="#4">PROJECTS</a>
            <a href="#5">AWARD</a>
            <a href="#6">CAREER</a>
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
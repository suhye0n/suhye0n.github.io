<template>
    <div class="main">
        <div id="1" class="container">
            <h1>ABOUT ME</h1>
            <ul>
                <li><i class="xi-user" /> 박수현</li>
                <li><i class="xi-calendar" /> 01.11.21</li>
                <li><i class="xi-mail" /> claphyeon@kakao.com</li>
                <li><i class="xi-pen" /> 금오공과대학교 컴퓨터공학과</li>
            </ul>
        </div>
        <div id="2" class="container">
            <h1>SKILLS</h1>
            <h4>Frontent</h4>
            <img src="/html-css-js.png" />
            <img src="/react.png" />
            <img src="/jquery.png" />
            <img src="/bootstrap.png" />

            <h4>Backend</h4>
            <img src="/firebase.png" />

            <h4>Version Control</h4>
            <img src="/git.png" />
            <img src="/github.png" />

            <h4>Communication</h4>
            <img src="/figma.png" />

            <!--h4>Certificate</h4-->
        </div>
        <div id="3" class="container">
            <h1>ARCHIVING</h1>
            <h4>GitHub</h4>
            <a href="https://github.com/suhye0n">github.com/suhye0n</a>
        </div>
        <div id="4" class="container">
            <h1>PROJECTS</h1>
        </div>
        <div id="5" class="container">
            <h1>AWARD</h1>
            <img src="/award1.png" @click="openModal('/award1.png')" />
            <img src="/award2.png" @click="openModal('/award2.png')" />
        </div>
        <div v-if="showModal" class="image-modal" @click="closeModal">
            <img :src="currentImage" alt="Full size award image" />
        </div>
        <div id="6" class="container">
            <h1>CAREER</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            currentImage: ''
        };
    },
    methods: {
        openModal(imageUrl) {
            this.currentImage = imageUrl;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    },
    mounted() {
    },
}
</script>

<style>
.main {
    width: 90%;
    max-width: var(--content-width);
    margin: auto;
}

.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
}

.image-modal img {
    max-width: 90%;
    max-height: 90%;
    border: 5px solid white;
}

.container {
    background: var(--header-background-color);
    box-shadow: 0px 2px 4px 0px var(--shadow-color);
	z-index: 2;
    border-radius: var(--border-radius);
    padding: var(--container-padding);
    margin: 30px;
}

.container img {
    width: 200px;
    display: block;
    margin-bottom: 20px;
}

</style>
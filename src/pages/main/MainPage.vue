<template>
    <div class="main">
        <div id="1" class="container about">
            <h1>#ABOUT ME</h1>
            <ul>
                <li><i class="xi-user" /> 박수현</li>
                <li><i class="xi-calendar" /> 01.11.21</li>
                <li><i class="xi-mail" /> claphyeon@kakao.com</li>
                <li><i class="xi-pen" /> 금오공과대학교 컴퓨터공학과</li>
            </ul>
        </div>
        <div id="2" class="container skills">
            <h1>#SKILLS</h1>
            <h4>Frontent</h4>
            <div class="tooltip-wrapper" @mouseover="showTooltip('HTML5')" @mouseout="hideTooltip">
                <i class="fab fa-html5 fa-2x"></i>
                <div v-if="currentTooltip === 'HTML5'" class="tooltip">HTML5</div>
            </div>
            <div class="tooltip-wrapper" @mouseover="showTooltip('CSS3')" @mouseout="hideTooltip">
                <i class="fab fa-css3-alt fa-2x"></i>
                <div v-if="currentTooltip === 'CSS3'" class="tooltip">CSS3</div>
            </div>
            <div class="tooltip-wrapper" @mouseover="showTooltip('JS')" @mouseout="hideTooltip">
                <i class="fab fa-js-square fa-2x"></i>
                <div v-if="currentTooltip === 'JS'" class="tooltip">JavaScript</div>
            </div>
            <div class="tooltip-wrapper" @mouseover="showTooltip('React')" @mouseout="hideTooltip">
                <i class="fab fa-react fa-2x"></i>
                <div v-if="currentTooltip === 'React'" class="tooltip">React</div>
            </div>
            <div class="tooltip-wrapper" @mouseover="showTooltip('JQuery')" @mouseout="hideTooltip">
                <i class="fab fa-jquery fa-2x"></i>
                <div v-if="currentTooltip === 'JQuery'" class="tooltip">JQuery</div>
            </div>
            <div class="tooltip-wrapper" @mouseover="showTooltip('Bootstrap')" @mouseout="hideTooltip">
                <i class="fab fa-bootstrap fa-2x"></i>
                <div v-if="currentTooltip === 'Bootstrap'" class="tooltip">Bootstrap</div>
            </div>

            <h4>Version Control</h4>
            <div class="tooltip-wrapper" @mouseover="showTooltip('git')" @mouseout="hideTooltip">
                <i class="fab fa-git fa-2x"></i>
                <div v-if="currentTooltip === 'git'" class="tooltip">git</div>
            </div>
            <div class="tooltip-wrapper" @mouseover="showTooltip('GitHub')" @mouseout="hideTooltip">
                <i class="fab fa-github fa-2x"></i>
                <div v-if="currentTooltip === 'GitHub'" class="tooltip">GitHub</div>
            </div>

            <h4>Communication</h4>
            <div class="tooltip-wrapper" @mouseover="showTooltip('Figma')" @mouseout="hideTooltip">
                <i class="fab fa-figma fa-2x"></i>
                <div v-if="currentTooltip === 'Figma'" class="tooltip">Figma</div>
            </div>

            <!--h4>Certificate</h4-->
        </div>
        <div id="3" class="container">
            <h1>#ARCHIVING</h1>
            <h4>GitHub</h4>
            <a href="https://github.com/suhye0n">github.com/suhye0n</a>
        </div>
        <div id="4" class="container">
            <h1>#PROJECTS</h1>
        </div>
        <div id="5" class="container award">
            <h1>#AWARD</h1>
            <br />
            <img src="/award1.png" @click="openModal('/award1.png')" />
            <img src="/award2.png" @click="openModal('/award2.png')" />
        </div>
        <div v-if="showModal" class="image-modal" @click="closeModal">
            <img :src="currentImage" alt="Full size award image" />
        </div>
        <div id="6" class="container">
            <h1>#CAREER</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            currentImage: '',
            currentTooltip: null
        };
    },
    methods: {
        openModal(imageUrl) {
            this.currentImage = imageUrl;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        showTooltip(tooltipText) {
            this.currentTooltip = tooltipText;
        },
        hideTooltip() {
            this.currentTooltip = null;
        }
    }
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

.container h1 {
    text-align: left;
    display: inline;
    border-radius: calc(var(--border-radius) + 15px);
    padding: 6px 14px;
    background-color: var(--point-color2);
    font-weight: 500;
    text-transform: capitalize;
    color: #fff;
}

.container img {
    width: 200px;
}

.about li {
    text-align: center;
}

.skills i {
    margin-right: 5px;
}

.award img {
    margin: 10px 12px;
    border-radius: var(--border-radius);
    box-shadow: 9px 7px 0px var(--shadow-color);
}

.tooltip-wrapper {
    position: relative;
    display: inline-block;
}

.tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 12px;
    background-color: #000;
    color: #fff;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
    opacity: 1;
}

.tooltip::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #000 transparent transparent transparent;
}
</style>
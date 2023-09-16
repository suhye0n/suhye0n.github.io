<template>
    <div class="main">
        <div id="1" class="container about">
            <h1>#ABOUT ME</h1>
            <ul>
                <li><i class="fa fa-user" /> 박수현</li>
                <li><i class="fa fa-calendar" /> 01.11.21</li>
                <li><i class="fa fa-envelope" /> claphyeon@kakao.com</li>
                <li><i class="fa fa-pen" /> 금오공과대학교 컴퓨터공학과</li>
            </ul>
        </div>
        <div id="2" class="container skills">
            <h1>#SKILLS</h1>
            <h4>Frontent</h4>
            <div class="tag">
                #HTML5 <i class="fab fa-html5" />
            </div>
            <div class="tag">
                #CSS3 <i class="fab fa-css3" />
            </div>
            <div class="tag">
                #JavaScript <i class="fab fa-js-square" />
            </div>
            <div class="tag">
                #React <i class="fab fa-react" />
            </div>
            <div class="tag">
                #Bootstrap <i class="fab fa-bootstrap" />
            </div>

            <h4>Version Control</h4>
            <div class="tag">
                #git <i class="fab fa-git" />
            </div>
            <div class="tag">
                #GitHub <i class="fab fa-github" />
            </div>

            <h4>Communication</h4>
            <div class="tag">
                #Figma <i class="fab fa-figma" />
            </div>

            <!--h4>Certificate</h4-->
        </div>
        <div id="3" class="container">
            <h1>#ARCHIVING</h1>
            <h4>GitHub</h4>
            <div class="tag">
                <a href="https://github.com/suhye0n">
                    <i class="fa fa-link" /> github.com/suhye0n
                </a>
            </div>
        </div>
        <div id="4" class="container project">
            <h1>#PROJECTS</h1>
            <br />
            <img src="/bokmark/1.png" @click="openDetail1()" />
        </div>
        <div id="5" class="container award">
            <h1>#AWARD</h1>
            <br />
            <img src="/award1.png" @click="openModal('/award1.png')" />
            <img src="/award2.png" @click="openModal('/award2.png')" />
        </div>
        <div v-if="showModal" class="image-modal" @click="closeModal">
            <img :src="currentAward" alt="Full size award image" />
        </div>

        <div v-if="showDetail1" class="detail-modal" @click="closeDetail">
            <div class="container" @click.stop>
                <img :src="currentImage" alt="" />
                <p class="controller">
                    <span @click="prevImage"><i class="fa fa-arrow-left" /></span>
                    <span @click="nextImage"><i class="fa fa-arrow-right" /></span>
                </p>
                <p class="pagination">
                    <span v-for="(image, index) in images" :key="index" @click="jumpToImage(index)"
                        :class="{ 'active-button': currentImageIndex === index }">
                    </span>
                </p>

                <h4>레시피 공유</h4>
            </div>
        </div>

        <!--div id="6" class="container">
            <h1>#CAREER</h1>
        </div-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            showDetail1: false,
            currentAward: '',
            currentTooltip: null,
            currentImageIndex: 0,
            images: ["/bokmark/1.png", "/bokmark/2.png"],
        };
    },
    computed: {
        currentImage() {
            return this.images[this.currentImageIndex];
        },
    },
    methods: {
        openModal(imageUrl) {
            this.currentAward = imageUrl;
            this.showModal = true;
        },
        openDetail1() {
            this.showDetail1 = true;
        },
        closeModal() {
            this.showModal = false;
        },
        closeDetail() {
            this.showDetail1 = false;
        },
        showTooltip(tooltipText) {
            this.currentTooltip = tooltipText;
        },
        hideTooltip() {
            this.currentTooltip = null;
        },
        prevImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
            } else {
                this.currentImageIndex = this.images.length - 1;
            }
        },
        nextImage() {
            if (this.currentImageIndex < this.images.length - 1) {
                this.currentImageIndex++;
            } else {
                this.currentImageIndex = 0;
            }
        },
        jumpToImage(index) {
            this.currentImageIndex = index;
        },
    },
    mounted() {
        this.autoSlide = setInterval(() => {
            this.nextImage();
        }, 4000);
    },
    beforeUnmount() {
        clearInterval(this.autoSlide);
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

.detail-modal {
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

.detail-modal h4 {
    margin: 20px 0;
}

.detail-modal .container {
    display: grid;
    justify-items: center;
    align-items: center;
    width: 90%;
    max-width: 750px;
    height: 70%;
}

.detail-modal .container img {
    width: 100%;
    height: 90%;
    object-fit: cover;
}

.controller {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% - 90px));
    width: 80%;
    max-width: 670px;
    display: flex;
    justify-content: space-between;
    z-index: 10;
}


.controller span {
    cursor: pointer;
    background-color: rgba(255, 255, 255, .6);
    padding: 12px 18px;
    margin: 0 30px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination {
    overflow: hidden;
    position: relative;
    bottom: 10px;
    width: 100%;
    text-align: center;
    z-index: 10;
}

.pagination span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: gray;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 50%;
}

.pagination span.active-button {
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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
    background-color: var(--point-color2);
    padding: 6px 14px;
    font-weight: 400;
    text-transform: capitalize;
    color: #fff;
    box-shadow: 0px 2px 4px 0px var(--shadow-color);
}

.container img {
    width: 200px;
}

.about li {
    text-align: center;
}

.award img,
.project img {
    cursor: pointer;
    margin: 30px 12px;
    border-radius: var(--border-radius);
    box-shadow: 8px 6px 0px var(--shadow-color);
    transition: var(--transition);
}

.project img {
    width: 40%;
}

.award img:hover,
.project img:hover {
    opacity: .6;
}

.skills i {
    margin-right: 5px;
}

h4 {
    margin: 14px 0 6px;
    color: var(--point-color2);
}

.tag {
    position: relative;
    display: inline;
    border-radius: calc(var(--border-radius) + 15px);
    background-color: #f0ede6;
    padding: 6px 14px;
    font-weight: 400;
    color: var(--font-color);
    box-shadow: inset 3px 3px 6px var(--shadow-color), 2px 2px 4px var(--shadow-color);
    margin-right: 10px;
    cursor: pointer;
    transition: var(--transition);
}

.tag:hover {
    opacity: .6;
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
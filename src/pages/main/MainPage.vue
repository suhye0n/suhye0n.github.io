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
            <div class="image-grid">
                <img src="/bokmark/1.png" @click="openDetail('bokmark')" />
                <img src="/cafe/1.png" @click="openDetail('cafe')" />
                <img src="/recipe/1.png" @click="openDetail('recipe')" />
            </div>
        </div>
        <div id="5" class="container award">
            <h1>#AWARD</h1>
            <br />
            <img src="/award1.png" @click="openModal('/award1.png')" />
            <img src="/award2.png" @click="openModal('/award2.png')" />
        </div>
        <div v-if="showModal" class="image-modal" @click="closeModal">
            <img :src="currentAward" alt="" />
        </div>

        <div v-if="showDetail" class="detail-modal" @click="closeDetail">
            <div class="container" @click.stop>
                <img :src="currentImage" alt="" />
                <p class="controller">
                    <span @click="prevImage"><i class="fa fa-arrow-left" /></span>
                    <span @click="nextImage"><i class="fa fa-arrow-right" /></span>
                </p>
                <p class="pagination">
                    <span v-for="(image, index) in currentImages" :key="index" @click="jumpToImage(index)"
                        :class="{ 'active-button': currentImageIndex === index }">
                    </span>
                </p>
                <div v-if="currentDetailType === 'bokmark'">
                    <h3>bokmark</h3>
                    <h4>개요</h4>
                    <ul>
                        <li>- 북마크를 공유할 수 있는 웹 플랫폼을 개발하였습니다.</li>
                        <li>- 사용자는 북마크를 웹 서랍에 추가하여 모아볼 수 있습니다.</li>
                        <li>- 사용자는 북마크 스크랩 기능을 사용할 수 있습니다.</li>
                    </ul>
                    <h4>GitHub</h4>
                    <div class="tag">
                        <a href="https://github.com/suhye0n/bokmark">
                            <i class="fa fa-link" /> github.com/suhye0n/bokmark
                        </a>
                    </div>
                    <h4>URL</h4>
                    <div class="tag">
                        <a href="https://b0kmark.web.app/">
                            <i class="fa fa-link" /> b0kmark.web.app
                        </a>
                    </div>
                    <h4>Front-end</h4>
                    <div class="tag">
                        #React <i class="fab fa-react" />
                    </div>
                    <h4>Back-end</h4>
                    <div class="tag">
                        #Firebase Authentication
                    </div>
                    <div class="tag">
                        #Firebase Storage
                    </div>
                    <h4>Database</h4>
                    <div class="tag">
                        #Firebase Database
                    </div>
                    <h4>Deployment</h4>
                    <div class="tag">
                        #Firebase
                    </div>
                </div>
                <div v-if="currentDetailType === 'recipe'">
                    <h3>레시피 공유</h3>
                    <h4>개요</h4>
                    <ul>
                        <li>- 음식 레시피를 공유할 수 있는 웹 플랫폼을 개발하였습니다.</li>
                        <li>- 사용자는 레시피를 업로드하고, 다른 사용자가 업로드한 레시피를 검색하고 댓글을 달 수 있습니다.</li>
                    </ul>
                    <h4>GitHub</h4>
                    <div class="tag">
                        <a href="https://github.com/suhye0n/recipe-share">
                            <i class="fa fa-link" /> github.com/suhye0n/recipe-share
                        </a>
                    </div>
                    <h4>URL</h4>
                    <div class="tag">
                        <a href="https://recipe-share-0.web.app/">
                            <i class="fa fa-link" /> recipe-share-0.web.app/
                        </a>
                    </div>
                    <h4>Front-end</h4>
                    <div class="tag">
                        #React <i class="fab fa-react" />
                    </div>
                    <h4>Back-end</h4>
                    <div class="tag">
                        #Firebase Authentication
                    </div>
                    <h4>Database</h4>
                    <div class="tag">
                        #Firebase Database
                    </div>
                    <h4>Deployment</h4>
                    <div class="tag">
                        #Firebase
                    </div>
                </div>
                <div v-if="currentDetailType === 'cafe'">
                    <h2>카페 메뉴 관리</h2>
                    <h4>개요</h4>
                    <ul>
                        <li>- 카페 메뉴를 관리 및 주문 할 수 있는 웹 플랫폼을 개발하였습니다.</li>
                        <li>- 사용자는 카페 메뉴를 추가하고, 추가된 상품을 주문할 수 있습니다.</li>
                    </ul>
                    <h4>GitHub</h4>
                    <div class="tag">
                        <a href="https://github.com/suhye0n/cafe-menu">
                            <i class="fa fa-link" /> github.com/suhye0n/cafe-menu
                        </a>
                    </div>
                    <h4>Front-end</h4>
                    <div class="tag">
                        #Vue.js <i class="fab fa-vuejs" />
                    </div>
                    <h4>Back-end</h4>
                    <div class="tag">
                        #Spring
                    </div>
                    <h4>Database</h4>
                    <div class="tag">
                        #MySQL
                    </div>
                </div>
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
            showDetail: false,
            activeProject: null,
            currentAward: '',
            currentTooltip: null,
            currentDetailType: null,
            currentImageIndex: 0,
            allImages: {
                bokmark: ["/bokmark/1.png", "/bokmark/2.png", "/bokmark/3.png", "/bokmark/4.png", "/bokmark/5.png", "/bokmark/6.png"],
                cafe: ["/cafe/1.png", "/cafe/2.png", "/cafe/3.png", "/cafe/4.png"],
                recipe: ["/recipe/1.png"]
            },
        };
    },
    computed: {
        currentImages() {
            return this.allImages[this.currentDetailType] || [];
        },
        currentImage() {
            return this.currentImages[this.currentImageIndex] || '';
        },
    },
    methods: {
        openModal(imageUrl) {
            this.currentAward = imageUrl;
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
        },
        prevImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
            } else {
                this.currentImageIndex = this.currentImages.length - 1;
            }
        },
        nextImage() {
            if (this.currentImageIndex < this.currentImages.length - 1) {
                this.currentImageIndex++;
            } else {
                this.currentImageIndex = 0;
            }
        },
        jumpToImage(index) {
            this.currentImageIndex = index;
        },
        openDetail(type) {
            this.currentDetailType = type;
            this.showDetail = true;
        },
        closeDetail() {
            this.showDetail = false;
            this.currentDetailType = null;
            this.currentImageIndex = 0;
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
    width: 90%;
    max-width: 750px;
    height: 70%;
    overflow: auto;
}

.detail-modal .container img {
    width: 100%;
    height: 350px;
    object-fit: cover;
}

.controller {
    position: relative;
    top: -200px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
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

.image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.image-grid img {
    width: calc(100% - 20px) !important;
    height: 80%;
    object-fit: cover;
}

.pagination {
    overflow: hidden;
    position: relative;
    bottom: 50px;
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
    text-align: left;
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
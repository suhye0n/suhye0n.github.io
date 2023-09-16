<template>
    <div class="footer">
    </div>
</template>

<script>
const App = {
    data: () => {
        return {
        }
    },
    mounted() {
    },
}

export default App;
</script>

<style>

.header {
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
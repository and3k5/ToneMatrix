<template>
    <div :class="{'overlay': true, 'visible': overlay.visible}">
        <button @click="overlay.visible = false" class="close-button">X</button>
        <slot></slot>
    </div>
</template>

<style lang="scss">
.overlay {
    position:absolute;
    top:0px;
    left:-25%;
    width:75%;
    opacity:0;
    user-select:none;
    pointer-events: none;
    transition: left 400ms ease-in-out, opacity 400ms ease-in-out, filter 400ms ease-in-out;
    z-index:1;
    background-color:#373737de;
    backdrop-filter: blur(6px);
    box-sizing: border-box;
    padding:25px;
    box-shadow:#373737 0px 0px 20px;
    height:100%;
    &.visible {
        opacity: 1;
        user-select: initial;
        pointer-events: initial;
        left:0px;
        filter:none;
    }
    .close-button {
        border:none;
        position:absolute;
        right:0px;
        top:0px;
        padding:15px;
        color:white;
        background:black;
        border-radius:100%;
        width:40px;
        height:40px;
        line-height:0;
        vertical-align: middle;
        cursor:pointer;
    }
}
</style>

<script>
export default {
    props: {
        overlay: Object,
    }
}
</script>
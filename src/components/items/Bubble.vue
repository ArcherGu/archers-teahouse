<template>
    <div class="bubble-wrapper">
        <div class="bubble bubble1"></div>
        <div class="bubble bubble2"></div>
        <div class="bubble bubble3"></div>
        <div class="bubble bubble4"></div>
    </div>
</template>

<style lang="less">
.bubble-wrapper {
    .bubble {
        border-radius: 40px;
        background: rgba(255, 255, 255, 0.4);
        position: absolute;
        animation-delay: 1s;
    }

    .bubble1 {
        width: 10px;
        height: 10px;
        animation: bubbleAnimation 1s ease-in infinite,
            sideways 0.5s ease-in infinite alternate;
        left: 20%;
    }
    .bubble2 {
        width: 12px;
        height: 12px;
        left: 30%;
        animation: bubbleAnimation 1.5s ease-in infinite,
            sideways 0.3s ease-in infinite alternate;
    }
    .bubble3 {
        width: 8px;
        height: 8px;
        left: 70%;
        animation: bubbleAnimation 3.5s ease-in infinite,
            sideways 0.5s ease-in infinite alternate;
    }
    .bubble4 {
        width: 8px;
        height: 8px;
        left: 90%;
        animation: bubbleAnimation 2.5s ease-in infinite,
            sideways 1s ease-in infinite alternate;
    }

    @keyframes bubbleAnimation {
        from {
            bottom: -15%;
        }
        to {
            bottom: 110%;
        }
    }
}
</style>
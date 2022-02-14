<template>
    <div class="cup">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="less">
.cup {
    --cup-glass: rgba(254, 254, 254, 0.6);

    // @apply shadow-2xl;
    position: relative;
    z-index: 10;
    border-top: 280px solid var(--cup-glass);
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    height: 0;
    width: 150px;
}
</style>
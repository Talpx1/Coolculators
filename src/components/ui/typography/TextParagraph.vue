<script setup lang="ts"></script>

<template>
    <p><slot /></p>
</template>

<style scoped>
@supports (font-size-adjust: 1) {
    p {
        font-size-adjust: 0.5;
    }
}

p {
    line-height: calc(1ex / 0.32);
    width: 60ch;
}

@media screen and (max-width: 768px) {
    p {
        width: 100%;
    }
}

p[lang='en'] {
    text-align: justify;
    hyphens: auto;
}

p[lang='it'] {
    text-align: left;
    hyphens: none;
}
</style>

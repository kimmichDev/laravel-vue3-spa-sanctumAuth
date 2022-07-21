<template>
    <div>
        <p>Example component</p>
    </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
    setup() {
        onMounted(() => console.log("example component is mounted"));

        return {};
    },
};
</script>

<style lang="scss" scoped></style>

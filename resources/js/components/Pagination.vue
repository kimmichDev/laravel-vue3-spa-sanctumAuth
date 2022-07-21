<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li
                :class="[
                    'page-item',
                    { disabled: !link.url, active: link.active },
                ]"
                v-for="link in links"
                :key="link.label"
            >
                <a
                    @click.prevent="emitLinkChange(link.url ?? null)"
                    class="page-link"
                    :href="link.url"
                    v-html="link.label"
                ></a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: ["links"],
    setup(props, context) {
        let emitLinkChange = (url) => {
            if (url) {
                context.emit("linkChange", url);
            }
        };
        return { emitLinkChange };
    },
};
</script>

<style lang="scss" scoped></style>

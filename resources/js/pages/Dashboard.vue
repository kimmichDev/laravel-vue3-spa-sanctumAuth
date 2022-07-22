<template>
    <div>Dashboard</div>
    <div class="d-flex">
        <h2 class="mb-0 me-3" v-if="store.state.auth.auth">
            Welcome {{ store.state.auth.auth.name }}
        </h2>
        <button class="btn btn-danger" @click="logoutHandle">Logout</button>
    </div>
    <div class="mt-3">
        <table class="table hover" v-if="books">
            <thead>
                <tr>
                    <th @click="sortChange('id')">No</th>
                    <th @click="sortChange('title')">Title</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books.data" :key="book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.user.name }}</td>
                </tr>
            </tbody>
        </table>
        <div>
            <Pagination
                :links="books.links"
                @linkChange="linkchange"
            ></Pagination>
        </div>
    </div>
</template>

<script>
import Pagination from "../components/Pagination";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";

export default {
    components: { Pagination },
    setup() {
        let books = ref("");
        let api = ref("/api/book?page=1");

        let column = ref("id");
        let sort = ref("asc");

        let store = useStore();
        let router = useRouter();

        let logoutHandle = async () => {
            await axios.post("/api/logout");
            router.push({ name: "login" });
            store.dispatch("setAuth", null);
        };

        let getBooks = async () => {
            await axios.get("/sanctum/csrf-cookie"); //for csrf sap sanctum
            try {
                let response = await axios.get(api.value, {
                    params: {
                        column: column.value,
                        sort: sort.value,
                    },
                });
                books.value = response.data.data;
            } catch (error) {
                if (
                    error.response.status == 401 ||
                    error.response.status == 419
                ) {
                    router.push({ name: "login" });
                    store.dispatch("setAuth", null);
                }
                console.log(error);
            }
        };

        let linkchange = async (url) => {
            api.value = url;
            await getBooks();
        };

        let sortChange = async (newColumn) => {
            column.value = newColumn;
            sort.value = sort.value == "asc" ? "desc" : "asc";
            await getBooks();
        };

        onMounted(async () => {
            await getBooks();
        });

        return {
            logoutHandle,
            store,
            books,
            getBooks,
            linkchange,
            column,
            sort,
            sortChange,
        };
    },
};
</script>

<style lang="scss" scoped></style>

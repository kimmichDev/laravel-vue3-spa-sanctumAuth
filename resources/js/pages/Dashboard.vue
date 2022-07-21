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
                    <th>No</th>
                    <th>Title</th>
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

        let store = useStore();
        let router = useRouter();

        let logoutHandle = async () => {
            await axios.post("/api/logout");
            router.push({ name: "login" });
            store.dispatch("setAuth", null);
        };

        let getBooks = async (url = "/api/book") => {
            await axios.get("/sanctum/csrf-cookie"); //for csrf sap sanctum
            try {
                let response = await axios.get(url);
                books.value = response.data.data;
            } catch (error) {
                (error.response.status == 401 ||
                    error.response.status == 419) &&
                    router.push({ name: "login" });
            }
        };

        let linkchange = (url) => {
            getBooks(url);
        };
        onMounted(async () => {
            await getBooks();
        });
        return { logoutHandle, store, books, getBooks, linkchange };
    },
};
</script>

<style lang="scss" scoped></style>

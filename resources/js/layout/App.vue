<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'home' }"
                            >
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'login' }"
                            >
                                Login
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'register' }"
                            >
                                Register
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'dashboard' }"
                            >
                                Dashboard
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
    setup() {
        let router = useRouter();
        let store = useStore();
        onMounted(async () => {
            await axios.get("/sanctum/csrf-cookie"); //for csrf sap sanctum
            try {
                let response = await axios.get("/api/user");
                store.dispatch("setAuth", {
                    name: response.data.name,
                    email: response.data.email,
                });
            } catch (error) {
                if (
                    error.response.status == 401 ||
                    error.response.status == 419
                ) {
                    store.dispatch("setAuth", null);
                }
                console.log(error);
            }
        });
        return {};
    },
};
</script>

<style lang="scss" scoped></style>

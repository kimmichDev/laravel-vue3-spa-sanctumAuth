<template>
    <div class="row">
        <div class="col-8">
            <div>
                <div class="card">
                    <div class="card-header">
                        <p>Login</p>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="loginHandle">
                            <div class="mb-3">
                                <label for="" class="form-label">Email </label>
                                <input
                                    type="email"
                                    name="name"
                                    class="form-control"
                                    v-model="userFormData.email"
                                />
                                <small
                                    class="text-danger"
                                    v-if="errors && errors.email"
                                >
                                    {{ errors.email[0] }}</small
                                >
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label"
                                    >Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    v-model="userFormData.password"
                                />
                                <small
                                    class="text-danger"
                                    v-if="errors && errors.password"
                                >
                                    {{ errors.password[0] }}</small
                                >
                            </div>
                            <div>
                                <button class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        let userFormData = ref({
            email: "",
            password: "",
        });

        let errors = ref(null);

        let router = useRouter();

        let store = useStore();

        let loginHandle = async () => {
            try {
                await axios.get("/sanctum/csrf-cookie");
                let response = await axios.post(
                    "/api/login",
                    userFormData.value
                );
                if (response.status == 200) {
                    store.dispatch("setAuth", response.data.data);
                    router.push({ name: "dashboard" });
                }
            } catch (error) {
                errors.value = error.response.data.errors;
            }
        };

        return { userFormData, errors, loginHandle };
    },
};
</script>

<style lang="scss" scoped></style>

<template>
    <div>
        <div class="card">
            <div class="card-header">
                <p>Register</p>
            </div>
            <div class="card-body">
                <form @submit.prevent="registerHandle">
                    <div class="mb-3">
                        <label for="" class="form-label">Name </label>
                        <input
                            type="text"
                            name="name"
                            class="form-control"
                            v-model="userFormData.name"
                        />
                        <small class="text-danger" v-if="errors && errors.name">
                            {{ errors.name[0] }}</small
                        >
                    </div>
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
                        <label for="" class="form-label">Password </label>
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
                    <div class="mb-3">
                        <label for="" class="form-label"
                            >Confirm password
                        </label>
                        <input
                            type="password"
                            name="confirm_password"
                            class="form-control"
                            v-model="userFormData.confirm_password"
                        />
                        <small
                            class="text-danger"
                            v-if="errors && errors.confirm_password"
                        >
                            {{ errors.confirm_password[0] }}</small
                        >
                    </div>
                    <div>
                        <button class="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
    setup() {
        let userFormData = ref({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        });

        let errors = ref(null);

        let router = useRouter();

        let registerHandle = async () => {
            try {
                let response = await axios.post(
                    "/api/register",
                    userFormData.value
                );
                response.status == 200 && router.push({ name: "login" });
            } catch (error) {
                errors.value = error.response.data.errors;
                console.log(errors.value);
            }
        };
        return { userFormData, registerHandle, errors };
    },
};
</script>

<style lang="scss" scoped></style>

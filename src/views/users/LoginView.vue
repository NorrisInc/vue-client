<template>
    <v-container>
        <h2>Sign in form</h2>
        <hr>
        <br>
        <v-row>
            <v-col class="col-4">
                <div v-if="error !== null">
                    <v-alert dense type="error">{{error}}</v-alert><br>
                </div>
                <v-form 
                ref="form"
                v-model="valid"
                lazy-validation>
                    <v-text-field label="Username" :rules="rules" v-model="username"></v-text-field>    
                    <v-text-field label="Password" :rules="rules" v-model="password" type="password"></v-text-field>  
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="signin"
                    >
                        Sign in
                    </v-btn>
                </v-form>  
            </v-col>
        </v-row>
        
        
        <br>
        
        <br>
        <code>
            <b>Test user data:</b><br>
            admin:admin for administrator account<br>
            user:user for user account
        </code>
    </v-container>
</template>

<script>
import {mapMutations} from 'vuex';
import $ from 'jquery'

export default {
    name: 'LoginView',
    data(){
        return {
            valid: true,
            rules: [
                value => !!value || 'Поле обязательно к заполнению',
                value => (value && value.length >= 3) || 'Минимум 3 символа',
                value => (value && value.length < 16 + 1) || 'Максимум 16 символов',
            ],
            username: "",
            password: "",
            error: null
        }
    },
    created(){
        function getCookie(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        function setCookie(name, value, options = {}) {
            options = {
                path: '/',
                ...options
            };

            if (options.expires instanceof Date) {
                options.expires = options.expires.toUTCString();
            }

            let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

            for (let optionKey in options) {
                updatedCookie += "; " + optionKey;
                let optionValue = options[optionKey];
                if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
                }
            }

            document.cookie = updatedCookie;
        }
        function deleteCookie(name) {
            setCookie(name, "", {
                'max-age': -1
            })
        }
        var cookie = getCookie('session');
        if(cookie === undefined) {
        } else {
            this.$router.push('/profile');
        }
    },
    methods: {
        ...mapMutations([
            'SetUser'
        ]),
        signin () {
            var request = null;
            $.ajax({
                url: "http://localhost:8911/signin",
                method: "POST",
                async: false,
                data:{
                    username: this.username,
                    password: this.password
                },
                error(jqXHR, status, errorThrown){
                    this.error = `${status} - ${errorThrown}`;
                }
            })
            .done(function (data) {
                console.log(data);
                request = {
                    status: 'ok',
                    data: data
                };
            })
            .fail(function (data) {
                request = {
                    status: 'error',
                    data: data
                };
            });
            
            this.error = (request.status == 'error') ? request.data.statusText: null;
            if(request.status == 'error') return;
            let date = new Date(Date.now() + 86400e3);
            date = date.toUTCString();
            this.SetUser(request.data.sessionCode);
            this.$router.push('/profile');
            document.cookie = `session=${request.data.sessionCode}; expires=${date}; path=/`;
        },
    }
}

</script>
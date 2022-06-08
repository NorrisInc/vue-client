<template>
    <v-container>
        <v-row>
            <v-col cols="6">Идентификатор: </v-col><v-col cols="6">{{GetUser.id}}</v-col>
            <v-col cols="6">Имя пользователя: </v-col><v-col cols="6">{{GetUser.name}}</v-col>
            <v-col cols="6">Администратор: </v-col><v-col cols="6">{{(GetUser.isAdmin ? 'Да': 'Нет')}}</v-col>
            <v-col cols="12"><v-btn class="ma-2" color="rgb(200,0,0)" depressed
  elevation="2"
  outlined @click="exit">Выйти</v-btn></v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

export default {
    name: 'ProfileView',
    computed: {
        ...mapGetters([
            'GetUser'
        ])
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
            this.$router.push('/login');
            console.log(cookie, 'cookie not found');
        } else {
            console.log(cookie, 'cookie');
        }
    },
    methods: {
        ...mapMutations([
            'SetUser'
        ]),
        exit(){
            
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
            deleteCookie('session');
            this.SetUser(null);
            this.$router.push('/login');
        }
    }
}

</script>

<style scoped lang="scss">
.v-col {
    outline: 1px solid rgba(0,0,0,0.05);
}
</style>
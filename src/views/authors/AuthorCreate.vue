<template>
    <v-row>
        <v-col class="col-4">
        <h2>Создать автора</h2><br>
            <v-form 
            ref="form"
            v-model="valid"
            lazy-validation>
                <v-text-field label="Имя автора" :rules="rules.name" v-model="name"></v-text-field>    
                <v-text-field label="Код страны" :rules="rules.country" v-model="country"></v-text-field> 
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                >
                    Создать автора
                </v-btn>
            </v-form>  
        </v-col>
    </v-row>
</template>
<script>
import {mapGetters} from 'vuex'
import $ from 'jquery'

export default {
    name: 'AuthorCreate',
    data(){
        return {
            valid: true,
            rules: {
                name: [
                    value => !!value || 'Поле обязательно к заполнению',
                    value => (value && value.length >= 3) || 'Минимум 3 символа',
                ],
                country: [
                    value => !!value || 'Поле обязательно к заполнению',
                    value => (value && value.length == 2) || 'Код страны состоит из двух символов',
                ],

            },
            name: '',
            country: '',
        }
    },
    computed: {
        ...mapGetters([
            'GetUser'
        ])
    },
    created(){
        if(!this.GetUser || !this.GetUser.isAdmin){
            this.$router.push('/authors');
        }
    },
    methods: {
        submit(){
            var r = null;
            $.ajax({
                url: 'http://localhost:8911/insertAuthor',
                type: 'POST',
                data:{
                    name: this.name,
                    country: this.country
                },
                async: false
            })
            .done(function(data){
                r = data;
            });
            this.$router.push(`/author/view/${r.insertId}`);
        }
    }
}

</script>
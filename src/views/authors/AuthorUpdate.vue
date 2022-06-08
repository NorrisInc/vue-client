<template>
    <v-row>
        <v-col class="col-4">
        <h2>Изменить автора</h2><br>
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
                    Изменить автора
                </v-btn>
            </v-form>  
        </v-col>
    </v-row>
</template>
<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import $ from 'jquery'

export default {
    name: 'AuthorUpdate',
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
            'GetUser',
            'GetAllAuthors',
        ])
    },
    created(){
        this.UploadAuthors();
        if(!this.GetUser || !this.GetUser.isAdmin){
            this.$router.push('/authors');
        }
        var id = this.$route.params.id;
        var author = this.GetAllAuthors.find(item => item.id == id);
        console.log(author);
        this.id = id;
        this.name = author.name;
        this.country = author.country;
    },
    methods: {
        ...mapMutations([
            'UploadAuthors',
        ]),
        submit(){
            var r = null;
            $.ajax({
                url: 'http://localhost:8911/updateAuthor',
                type: 'POST',
                data:{
                    id: this.id,
                    name: this.name,
                    country: this.country
                },
                async: false
            });
            this.$router.push(`/author/view/${this.id}`);
        }
    }
    
}

</script>
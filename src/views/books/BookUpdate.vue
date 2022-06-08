<template>
    <v-row>
        <v-col class="col-4">
        <h2>Изменить книгу</h2><br>
            <v-form 
            ref="form"
            v-model="valid"
            lazy-validation>
                <v-text-field label="Название" :rules="rules.name" v-model="name"></v-text-field>    
                <v-text-field label="Описание" v-model="description"></v-text-field> 
                <v-select
                v-model="select"
                :items="GetAllAuthors"
                item-title="name"
                item-value="id"
                label="Выберите автора"
                persistent-hint
                return-object
                single-line>

                </v-select>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                >
                    Изменить книгу
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

            },
            name: '',
            description: '',
            select: null
        }
    },
    computed: {
        ...mapGetters([
            'GetUser',
            'GetAllAuthors',
            'GetAllBooks',
        ])
    },
    created(){
        this.UploadAuthors();
        this.UploadBooks();
        if(!this.GetUser || !this.GetUser.isAdmin){
            this.$router.push('/books');
        }
        var id = this.$route.params.id;
        var book = this.GetAllBooks.find(item => item.id == id);
        var author = this.GetAllAuthors.find(item => item.id == book.authorId);
        this.id = id;
        this.name = book.name;
        this.description = book.description;
        this.select = author;
    },
    methods: {
        ...mapMutations([
            'UploadAuthors',
            'UploadBooks',
        ]),
        submit(){
            var r = null;
            $.ajax({
                url: 'http://localhost:8911/updateBook',
                type: 'POST',
                data:{
                    id: this.id,
                    name: this.name,
                    description: this.description,
                    author: this.select.id
                },
                async: false
            });
            this.$router.push(`/book/view/${this.id}`);
        },
    },
    
}

</script>
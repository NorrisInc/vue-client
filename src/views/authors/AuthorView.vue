<template>
    <v-container>
        <v-row>
            <v-col cols="6">Идентификатор: </v-col><v-col cols="6">{{id}}</v-col>
            <v-col cols="6">Имя автора: </v-col><v-col cols="6">{{name}}</v-col>
            <v-col cols="6">Страна: </v-col><v-col cols="6">{{country}}</v-col>
            <v-col cols="6">Книг автора в базе: </v-col><v-col cols="6">{{books}}</v-col>
            
        </v-row>
         <v-btn v-if="GetUser && GetUser.isAdmin" color="warning" outlined :to='`/author/update/${id}`'>Изменить</v-btn> <v-btn v-if="GetUser && GetUser.isAdmin" color="error" @click="remove()">Удалить</v-btn>
    </v-container>
</template>
<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import $ from 'jquery'

export default {
    name: 'AuthorView',
    data(){
        return {
            id: 0,
            name: '',
            country: '',
            books: 0,
        }
    },
    computed: {
        ...mapGetters([
            'GetUser',
            'GetAllAuthors',
        ]),
    },
    created(){
        this.UploadAuthors();
        var id = this.$route.params.id;
        var author = this.GetAllAuthors.find(item => item.id == id);
        this.id = id;
        this.name = author.name;
        this.country = author.country;
        this.books = author.books;
    },
    methods: {
        ...mapMutations([
            'UploadAuthors',
        ]),
        remove(){
            $.ajax({
                url: 'http://localhost:8911/deleteAuthor',
                type: 'POST',
                data:{
                    id: this.id
                },
                async: false
            })
            this.$router.push(`/authors`);
        }
    }
}

</script>
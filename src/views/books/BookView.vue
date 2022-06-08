<template>
    <v-container>
        <v-row>
            <v-col cols="6">Идентификатор: </v-col><v-col cols="6">{{id}}</v-col>
            <v-col cols="6">Название: </v-col><v-col cols="6">{{name}}</v-col>
            <v-col cols="6">Описание: </v-col><v-col cols="6">{{description}}</v-col>
            <v-col cols="6">Автор: </v-col><v-col cols="6"><a :href="`/author/view/${authorId}`">{{author}}</a></v-col>
            
        </v-row>
         <v-btn v-if="GetUser && GetUser.isAdmin" color="warning" outlined :to='`/book/update/${id}`'>Изменить</v-btn> <v-btn v-if="GetUser && GetUser.isAdmin" color="error" @click="remove()">Удалить</v-btn>
    </v-container>
</template>
<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import $ from 'jquery'

export default {
    name: 'BookView',
    data(){
        return {
            id: 0,
            name: '',
            description: '',
            author: '',
        }
    },
    computed: {
        ...mapGetters([
            'GetUser',
            'GetAllBooks',
        ]),
    },
    created(){
        this.UploadBooks();
        var id = this.$route.params.id;
        var book = this.GetAllBooks.find(item => item.id == id);
        this.id = id;
        this.name = book.name;
        this.description = book.description;
        this.author = book.author;
        this.authorId = book.authorId;
    },
    methods: {
        ...mapMutations([
            'UploadBooks',
        ]),
        remove(){
            $.ajax({
                url: 'http://localhost:8911/deleteBook',
                type: 'POST',
                data:{
                    id: this.id
                },
                async: false
            })
            this.$router.push(`/books`);
        }
    }
}

</script>
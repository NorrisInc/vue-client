<template>

    <v-container>
        <v-btn v-if="GetUser && GetUser.isAdmin" color="green" style="color: white !important;" to="/book/create">Добавить книгу</v-btn>
    </v-container>
    <v-container v-if="!GetAllBooks">
        <v-table>
            <template v-slot:default>
                <thead>
                    <th>ID</th><th>Книга</th><th>Автор</th><th>Действия</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4">Книг нет в базе данных</td>
                    </tr>
                </tbody>
            </template>
        </v-table>
    </v-container>
    <v-container v-else>
        <v-table>
            <template v-slot:default>
                <thead>
                    <th>ID</th><th>Книга</th><th>Автор</th><th>Действия</th>
                </thead>
                <tbody>
                    <tr
                        v-for="item in GetAllBooks"
                        :key="item.id"
                        style="text-align:center;"
                    >
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.author }}</td>
                        
                        <td ><v-btn color="success" outlined :to='`/book/view/${item.id}`'>Просмотреть</v-btn> <v-btn v-if="GetUser && GetUser.isAdmin" color="warning" outlined :to='`/book/update/${item.id}`'>Изменить</v-btn> <v-btn v-if="GetUser && GetUser.isAdmin" color="error" @click="remove(item.id)">Удалить</v-btn></td>
                    </tr>
                </tbody>
            </template>
        </v-table>
    </v-container>
</template>
<script>

import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import $ from 'jquery'

export default {
    name: 'BooksView',
    computed: {
        ...mapGetters([
            'GetUser',
            'GetAllBooks',
        ])
    },
    created(){
        this.UploadBooks();
    },
    methods:{
        ...mapMutations([
            'UploadBooks',
        ]),
        remove(id){
            $.ajax({
                url: 'http://localhost:8911/deleteBook',
                type: 'POST',
                data:{
                    id: id
                },
                async: false
            });
            this.$router.go(`/books`);
        }
    }
}

</script>
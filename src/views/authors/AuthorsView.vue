<template>
    <v-container>
        <v-btn v-if="GetUser && GetUser.isAdmin" color="green" style="color: white !important;" to="/author/create">Создать автора</v-btn>
    </v-container>
    <v-container v-if="!GetAllAuthors">
        <v-table>
            <template v-slot:default>
                <thead>
                    <th>ID</th><th>Автор</th><th>Страна</th><th>Книг</th><th>Действия</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5">Авторов нет в базе данных</td>
                    </tr>
                </tbody>
            </template>
        </v-table>
    </v-container>
    <v-container v-else>
        <v-table>
            <template v-slot:default>
                <thead>
                    <th>ID</th><th>Автор</th><th>Страна</th><th>Книг</th><th>Действия</th>
                </thead>
                <tbody>
                    <tr
                        v-for="item in GetAllAuthors"
                        :key="item.id"
                        style="text-align:center;"
                    >
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.country }}</td>
                        <td>{{ item.books }}</td>
                        
                        <td ><v-btn color="success" outlined :to='`/author/view/${item.id}`'>Просмотреть</v-btn> <v-btn v-if="GetUser && GetUser.isAdmin" color="warning" outlined :to='`/author/update/${item.id}`'>Изменить</v-btn> <v-btn v-if="GetUser && GetUser.isAdmin" color="error" @click="remove(item.id)">Удалить</v-btn></td>
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
    name: 'AuthorsView',
    computed: {
        ...mapGetters([
            'GetUser',
            'GetAllAuthors',
        ])
    },
    created(){
        this.UploadAuthors();
    },
    methods:{
        ...mapMutations([
            'UploadAuthors',
        ]),
        remove(id){
            $.ajax({
                url: 'http://localhost:8911/deleteAuthor',
                type: 'POST',
                data:{
                    id: id
                },
                async: false
            });
            this.$router.go(`/authors`);
        }
    }
}

</script>
<template>
    <v-row>
        <v-col class="col-4">
        <h2>Добавить книгу</h2><br>
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
                :rules="[v => !!v || 'Item is required']"
                single-line>

                </v-select>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                >
                    Добавить книгу
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
    name: 'BookCreate',
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
            'GetAllAuthors'
        ])
    },
    created(){
        if(!this.GetUser || !this.GetUser.isAdmin){
            this.$router.push('/books');
        }
        this.UploadAuthors();
    },
    methods: {
        ...mapMutations([
            'UploadAuthors'
        ]),
        submit(){
            var r = null;
            $.ajax({
                url: 'http://localhost:8911/insertBook',
                type: 'POST',
                data:{
                    name: this.name,
                    description: this.description,
                    author: this.select.id
                },
                async: false
            })
            .done(function(data){
                r = data;
            });
            this.$router.push(`/books`);
        }
    }
}

</script>
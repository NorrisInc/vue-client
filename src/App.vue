<template>
  <v-app>
    <v-main>
      
      <v-container>
        <v-row class="text-center">
          <v-col>
            <router-link class="router-link" to="/">Главная</router-link> |
            <router-link class="router-link" to="/authors">Авторы</router-link> |
            <router-link class="router-link" to="/books">Книги</router-link> |
            
            <router-link v-if="!GetUser.id" class="router-link" to="/login">Login</router-link>
            <router-link v-else class="router-link" to="/profile"><span v-if="GetUser.isAdmin">[A]</span> {{GetUser.name}}</router-link>
          </v-col>
          
        </v-row>
      </v-container>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters([
      'GetUser'
    ])
  },
  methods: {
    ...mapMutations([
      'SetUser',
      'UploadAuthors',
    ]),
  },
  created(){
    
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    var cookie = getCookie('session');
    if(cookie === undefined) return;
    this.SetUser(cookie);
  }
}
</script>
<style scoped lang="scss">
.text-center{
  text-align: center;
  
  .router-link {
    text-decoration: none;
    color: rgb(6, 91, 218);
    margin: 0 4px;
    &:hover {
      color: rgb(62, 118, 202);
    }
  }
}

</style>
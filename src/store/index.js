import { createStore } from 'vuex'
import $ from 'jquery'

export default createStore({
  state: {
    user: {},
    authors: [],
    books: [],
  },
  getters: {
    GetUser(state){
      return state.user;
    },
    GetAllAuthors(state){
      return state.authors;
    },
    GetAllBooks(state){
      return state.books;
    },
  },
  mutations: {
    SetUser(state, session){
      var r = null;
      $.ajax({
        url: 'http://localhost:8911/getUserBySession',
        method: 'POST',
        data: { 
          session: session
        },
        async: false
      })
      .done(function(response){
        r = response;
      });
      if(r == null || r.error){
        state.user = {};
        return;
      }
      state.user = r;
    },
    UploadAuthors(state){
      var r = null;
      $.ajax({
        url: 'http://localhost:8911/getAllAuthors',
        method: 'GET',
        async: false
      })
      .done(function(response){
        r = response;
      });
      if(r == null || r.error){
        return;
      }
      state.authors = r;
    },
    UploadBooks(state){
      var r = null;
      $.ajax({
        url: 'http://localhost:8911/getAllBooks',
        method: 'GET',
        async: false
      })
      .done(function(response){
        r = response;
      });
      if(r == null || r.error){
        return;
      }
      state.books = r;
    },
  },
  actions: {

  },
  modules: {

  }
})

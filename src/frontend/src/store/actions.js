import axios from 'axios';

const BASE_API_URL= ' https://ryuanime-api.chrismichael.now.sh/api/v1/';
const API_URL_ENDPOINT = {
  latest: 'latest',
  video: 'anime',
  letter: 'letter',
  search: 'search'
}

const A = axios.create({ baseURL: String(BASE_API_URL) });
const pagin = require('./paginator/index.js');

export const actions = {
  GET_LATEST_DATA({commit}){
    A.get(API_URL_ENDPOINT.latest).then((res) =>{
      const animes = res.data.animes.map((data) => data[0]);
      commit('SET_LATEST_DATA' , animes);
      commit('IS_LOADING' , false);
    }).catch((err) =>{
      console.error(err);
    });
  },
  GET_ANIME_VIDEO({commit} , info){
    console.log("id: " , info.id , "chapter: " , info.eps)
    A.get(`${API_URL_ENDPOINT.video}` + "/" + `${info.id}` + "/" + `${info.eps}`)
      .then((res) =>{
        console.log("video src = " , res.data)
        commit('SET_VIDEO_ANIME' , res.data);
        commit('IS_LOADING' , false);
      }).catch((err) =>{
      console.error(err);
    });
  },
  GET_ANIME_ALPHA({commit} , info){
    A.get(`${API_URL_ENDPOINT.letter}` + "/" + info.letter + "/" + info.page)
      .then((res) =>{
        const animes = res.data.animes.map((data) => data[0]);
        console.log("\n⚠️ ANIME BY LETTER (res): " , animes);
        const dataPaginated = pagin.paginator(animes , info.page , 10);
        commit('SET_ANIME_ALPHA' , dataPaginated);
        commit('IS_LOADING' , false);
      }).then((err) =>{
        console.log(err);
    });
  },
  GET_ANIME_SEARCH({commit} , query){
    A.get(`${API_URL_ENDPOINT.search}` + '/' + `${query}`)
      .then((res) =>{
        const animes = res.data.animes.map((data) => data[0]);
        console.log("\n⚠️ ANIME SEARCHED  (res): " , animes);
        commit('SET_ANIME_SEARCH' , animes);
        commit('IS_LOADING' , false);
      }).catch((err) =>{
        console.log(err);
      });
  }
};
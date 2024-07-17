<template>
  <div>
    <div id="box_search">
    <input type="text" class="todo_input" placeholder="書籍名の文字列検索" />
    <input type="search" class="list_input" list ="category_list" placeholder="ジャンル検索" />
    <!-- 今は一旦、便宜的にこのリストとしておく。いずれはDBから取得。 -->
    <datalist id="category_list">
      <option value="漫画"></option>
      <option value="小説"></option>
      <option value="ビジネス"></option>
      <option value="趣味"></option>
    </datalist>
    <button type="button" id="btn1">検索</button>
    <button type="button" id="btn2">検索条件クリア</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
  #box_search {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .todo_input{
    width: 200px;
    text-align: left;
    font-size: 12px;
    padding: 8px;
    margin: 10px;
    border: black 1px solid;
  }
  .todo_input:focus{
    border: orange 2px solid;
    outline: none;
  }
  .list_input {
    width: 100px;
    text-align: left;
    font-size: 12px;
    padding: 8px;
    margin: 10px;
    border: black 1px solid;
  }
  .list_input:focus{
    border: orange 2px solid;
    outline: none;
  }
  #btn1 {
    width: 50px;
    background-color: rgb(0, 229, 255);
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    padding: 8px;
    margin: 10px;
    border-radius: 5px;
  }
  #btn2 {
    width: 150px;
    background-color: pink;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    padding: 8px;
    margin: 10px;
    border-radius: 3px;
  }
</style>

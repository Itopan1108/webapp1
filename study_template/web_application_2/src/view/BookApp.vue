<template>
  <div>
    検索<br>
    <div class="d-flex">
    <TheSearch />
     <v-btn  class="align:center" id="btn3" @click.stop="dialog = true">
       新規登録
     </v-btn>
    </div>
    <div>
      <v-dialog v-model="dialog">
        <The-Form
          v-on:clickSubmit="onSubmit"

          :book="book"
          :human="human"
          :address="address"
          :url="url"
          :comment="comment"
        ></The-Form>
      </v-dialog>
    </div>
    <TheList />
  </div>
</template>

<script>
import TheSearch from '@/components/TheSearch'
import TheList from '@/components/TheList'
import TheForm from '@/components/TheForm'

export default {
  components: {
    TheSearch,
    TheList,
    TheForm
  },
  data () {
    return {
      book: '',
      human: '',
      address: '',
      url: '',
      comment: '',
      dialog: false
    }
  },
  methods: {
    onSubmit (params) {
      this.dialog = false
      this.book = params.book
      this.human = params.human
      this.address = params.address
      this.url = params.url
      this.comment = params.comment
    }
  }
}
</script>

<style>
  #btn3 {
  width: 100px;
  background-color: greenyellow;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 8px;
  margin: 10px;
  border-radius: 3px;
  }
</style>

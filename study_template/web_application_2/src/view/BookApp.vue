<!-- ＜以下は暫定バージョン＞
 BookApp.vueの新規登録ボタン押下からのダイアログ表示(TheForm.vue)が
 うまくいかないため、BookApp.vue内にダイアログも一旦、実装した形。
 よって、TheForm.vueの呼び出し(import)は外している。

<template>
  <div class="wrap">
    <TheSearch />
    <div>
      <v-btn color="success" @click.stop="dialog = true">
        新規登録
      </v-btn>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>
            <span class="headline">登録／修正</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-avatar color="indigo">
                    <v-icon dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="12">
                  <v-label for="book-name" class="label_book">書籍名</v-label>
                  <v-text-field label="書籍名*" id="book-name" v-model="book" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-label for="human-name" class="label_human">所有者名</v-label>
                  <v-text-field label="所有者*" id="human-name" v-model="human" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-label for="address-name" class="label_address">所在</v-label>
                  <v-select :items="['福井', '石川', '富山']" label="所在*" id="address-name" v-model="address" required></v-select>
                </v-col>
                <v-col cols="12">
                  <v-label for="url-name" class="label_url">ＵＲＬ</v-label>
                  <v-text-field label="ＵＲＬ" id="url-name" v-model="url"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-label for="comment-name" class="label_comment">ＵＲＬ</v-label>
                  <v-text-field label="コメント" id="comment-name" v-model="comment"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
           </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="success" @click="onSubmit">
            登録
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <TheList />
</div>
</template>

<script>
import TheSearch from '@/components/TheSearch'
import TheList from '@/components/TheList'

export default {
  components: {
    TheSearch,
    TheList
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
  .wrap {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   min-height: 100vh;
   height: 150vh;
   width: 370px;
   font-family: sans-serif;
  }
</style> -->

<!-- ＜以下は正式バージョン 2024/4/23 上手くいった＞
 BookApp.vueの新規登録ボタン押下からTheForm.vueのダイアログ呼び出しを
 実装したバージョン。しかし、画面が暗転する変化はるものの、ダイアログ表示がされない。
 悩み中。一旦、あとまわし。 → 4/23上手くいった！-->

  <template>
  <div class="wrap">
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
  .wrap {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   min-height: 100vh;
   height: 150vh;
   width: 370px;
   font-family: sans-serif;
  }
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

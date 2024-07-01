<template>
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
            <v-text-field label="書籍名*" id="book-name" v-model="returnData.book" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-label for="category-name" class="label_category">ジャンル</v-label>
            <v-select :items="['漫画', '小説', 'ビジネス', '趣味']" label="ジャンル*" id="category-name" v-model="returnData.category" required></v-select>
          </v-col>
          <v-col cols="12">
            <v-label for="buyer-name" class="label_buyer">買った人</v-label>
            <v-text-field label="買った人*" id="buyer-name" v-model="returnData.buyer" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-label for="boughtday" class="label_boughtday">ＵＲＬ</v-label>
            <v-text-field label="買った日" id="boughtday" v-model="returnData.boughtday"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-label for="comment-name" class="label_comment">コメント</v-label>
            <v-text-field label="コメント" id="comment-name" v-model="returnData.comment"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="success" @click="submit">
      登録
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    book: { type: String },
    category: { type: String },
    buyer: { type: String },
    boughtday: { type: String },
    comment: { type: String }
  },
  data () {
    return {
      returnData: {
        book: this.book,
        category: this.category,
        buyer: this.buyer,
        boughtday: this.boughtday,
        comment: this.comment
      }
    }
  },
  methods: {
    submit () {
      this.$emit('clickSubmit', this.returnData)
    }
  }
}
</script>

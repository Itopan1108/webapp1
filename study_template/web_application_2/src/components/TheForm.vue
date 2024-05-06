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
              <v-label for="human-name" class="label_human">所有者名</v-label>
              <v-text-field label="所有者*" id="human-name" v-model="returnData.human" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-label for="address-name" class="label_address">所在</v-label>
              <v-select :items="['福井', '石川', '富山']" label="所在*" id="address-name" v-model="returnData.address" required></v-select>
            </v-col>
            <v-col cols="12">
              <v-label for="url-name" class="label_url">ＵＲＬ</v-label>
              <v-text-field label="ＵＲＬ" id="url-name" v-model="returnData.url"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-label for="comment-name" class="label_comment">ＵＲＬ</v-label>
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
    human: { type: String },
    address: { type: String },
    url: { type: String },
    comment: { type: String }
  },
  data () {
    return {
      returnData: {
        book: this.book,
        human: this.human,
        address: this.address,
        url: this.url,
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

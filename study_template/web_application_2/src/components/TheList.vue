<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="items"
        >
        <template v-slot:item.modify="{ item }">
          <v-btn
            small
            color="green"
            @click="deleteItem(item)"
          >
            変更
          </v-btn>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-btn
            small
            color="error"
            @click="deleteItem(item)"
          >
            削除
          </v-btn>
        </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '書籍名',
          value: 'book'
        },
        {
          text: 'ジャンル',
          value: 'category'
        },
        {
          text: '買った人',
          value: 'buyer'
        },
        {
          text: '買った日',
          value: 'boughtDay'
        },
        {
          text: '変更',
          value: 'modify',
          sortable: false
        },
        {
          text: '削除',
          value: 'delete',
          sortable: false
        }
      ],
      items: [
        {
          id: '1',
          book: 'ワンピース',
          category: '漫画',
          buyer: 'いとう',
          boughtDay: '６月２２日'
        },
        {
          id: '2',
          book: '吾輩は猫である',
          category: '小説',
          buyer: 'さとう',
          boughtDay: '５月１日'
        },
        {
          id: '3',
          book: 'Vue.jsの本',
          category: 'ビジネス',
          buyer: 'おおたに',
          boughtDay: '７月７日'
        }
      ]
    }
  },
  created () {},
  computed: {},
  methods: {
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    }
  }
}
</script>

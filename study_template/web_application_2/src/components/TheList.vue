<template>
  <div>
    <table border="1" bordercolor="black" id="table">
    <tr bgcolor="gray">
      <th >書籍名</th>
      <th >ジャンル</th>
      <th >買った人</th>
      <th >買った日</th>
    </tr>
    <tr>
      <td width="30%">面白い本（仮）</td>
      <td width="5%">まんが（仮）</td>
      <td width="10%">いとぱん（仮）</td>
      <td width="10%">６月２４日（仮）</td>
    </tr>
    </table>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {}
}
</script>
<style scoped>
#table {
  width: 1600px;
  table-layout: auto;}
#btn4,#btn6,#btn8 {
  width: 50px;
  background-color: greenyellow;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 8px;
  margin: 10px;
  border-radius: 3px;
  }
#btn5,#btn7,#btn9 {
  width: 50px;
  background-color: orange;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 8px;
  margin: 10px;
  border-radius: 3px;
}
</style>

<template>
  <div>
   <table border="1" bordercolor="black" id="table">
    <tr bgcolor="gray">
     <th >書籍名</th>
     <th >所在</th>
     <th >所有者</th>
     <th colspan="3">貸出状況</th>
     <th colspan="2">予約状況</th>
     <th >修正</th>
     <th >削除</th>
    </tr>
    <tr>
     <td width="30%">面白い本（仮）</td>
     <td width="5%">福井（仮）</td>
     <td width="10%">いとぱん（仮）</td>
     <td width="10%"><button type="button" id="btn4">貸出</button>
      <button type="button" id="btn5">返却</button></td>
     <td width="5%">伊藤（仮）</td>
     <td width="10%">2024/02/14（仮）</td>
     <td width="10%"><button type="button" id="btn6">予約</button>
      <button type="button" id="btn7">予中</button></td>
     <td width="10%">予約できるよ（仮）</td>
     <td width="5%"><button type="button" id="btn8">修正</button></td>
     <td width="5%"><button type="button" id="btn9">削除</button></td>
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

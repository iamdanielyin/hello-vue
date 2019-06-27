<template>
  <div class="home">
    <div style="text-align:right">
      <el-button @click="dialogVisible = true">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="Subject"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Price"
        label="价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Date"
        label="购买日期">
      </el-table-column>
      <el-table-column
        prop="IsDiscount"
        label="是否打折">
      </el-table-column>
      <el-table-column
        prop="UserRemark"
        label="用户备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            @click="edit(tableData[scope.$index])"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            @click="del(tableData[scope.$index])"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="弹窗"
      :visible.sync="dialogVisible">
      <div style="text-align: left;">
        <el-input v-model="dialogRecord.Subject" placeholder="名称"></el-input>
        <el-input-number v-model="dialogRecord.Price" :min="0" placeholder="价格"></el-input-number>
        <el-checkbox v-model="dialogRecord.IsDiscount">是否打折</el-checkbox>
        <el-date-picker
          v-model="dialogRecord.Date"
          type="date"
          placeholder="购买日期">
        </el-date-picker>
        <el-input v-model="dialogRecord.UserRemark" placeholder="用户备注"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogRecord: {},
      tableData: []
    }
  },
  methods: {
    async save () {
      if (_.get(this.dialogRecord, 'ID')) {
        // 修改
        await axios.put('/api/book', {
          cond: {
            ID: this.dialogRecord.ID
          },
          doc: _.omit(this.dialogRecord, 'ID')
        })
      } else {
        // 新增
        await axios.post('/api/book', this.dialogRecord)
      }
      this.dialogRecord = {}
      this.dialogVisible = false
      this.fetchList()
    },
    async del (record) {
      await axios.delete('/api/book', {
        data: {
          cond: {
            ID: record.ID
          }
        }
      })
      this.fetchList()
    },
    edit (record) {
      this.dialogVisible = !this.dialogVisible
      this.dialogRecord = _.clone(record)
    },
    async fetchList () {
      const resp = await axios.get('/api/book')
      this.tableData = _.get(resp, 'data.data.list')
    }
  },
  mounted () {
    this.fetchList()
  }
}
</script>

<style lang="less" scoped>
.home {
  border: 1px solid #ccc;
}
</style>

<template>
  <div class="dashboard-container">
    <!-- 标头 搜索框 -->
    <div class="app-container">
      <el-card shadow="never">
        <el-form ref="form" label-width="80px" class="el-form-nav">
          <el-form-item label="关键字">
            <el-input v-model="keywordInput" placeholder="根据编号搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="keywordClean">清除</el-button>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
          </el-form-item>
        </el-form>
        <!-- 数据统计 -->
        <el-alert
          :title = "'一共有'+total+'条数据'"
          type = "info"
          show-icon
          :closable = "false">
        </el-alert>
        <el-table
          :data = "list"
          style = "width: 100%;margin-top:20px"
          ref="tableRef"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            label="题型"
            width="50">
            <template #default="{row}">
              {{state(row.questionType)}}
            </template>
          </el-table-column>
          <!-- 仍没有搞好的题目编号 -->
          <el-table-column
            prop="questionIDs[0].number"
            label="题目编号"
            width="200">
            <template #default="{row}">
              <el-link class=questionIDs v-for="(item,index) in row.questionIDs" :key="index" @click="quesMsg(item.id)">{{item.number}}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="addTime"
            label="录入时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="totalSeconds"
            label="答题时间(s)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="accuracyRate"
            label="正确率(%)"
            width="180">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="录入人"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180">
            <template #default="{row}">
              <el-button type="danger" icon="el-icon-delete" circle @click="delRand(row.id)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页标签 -->
        <el-pagination
          class="elPagination"
          background
          layout=" prev, pager, next, sizes, jumper"
          @current-change='currentChange'
          :current-page='params.page'
          :page-size='params.pagesize'
          :total="total">
        </el-pagination>
      </el-card>
    </div>
    <!-- 预览弹窗 -->
    <el-dialog
      title="题目预览"
      :visible="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <!-- 组题列表预览弹窗的具体内容 -->
      <el-row :gutter="20" style=";">
        <el-col :span="6"><div class="grid-content bg-purple">【题型】：{{state(visiData.questionType)}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">【编号】：{{visiData.id}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">【难度】：{{difficulty(visiData.questionType)}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">【标签】：{{visiData.tags}}</div></el-col>
      </el-row>
      <el-row :gutter="20" style=";">
        <el-col :span="6"><div class="grid-content bg-purple">【学科】：{{visiData.subjectName}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">【目录】：{{visiData.directoryName}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">【方向】：{{visiData.direction}}</div></el-col>
      </el-row>
      <!-- 分隔线 -->
      <el-divider></el-divider>
      <el-row :gutter="20" style=";">
        <el-col :span="6"><div class="grid-content bg-purple">【题干】：</div></el-col>
      </el-row>
      <el-row :gutter="20" style=";">
        <!-- 有亿点点的问题 -->
        <el-col :span="24"><div class="grid-content bg-purple" 
        style="color:blue;" v-html="visiData.question"></div></el-col>
        <!-- 问题沿未结束 -->
      </el-row>
      <el-row :gutter="20" style=";">
        <el-col :span="24" v-if="visiData.questionType==1||visiData.questionType==2"><div class="grid-content bg-purple">{{state(visiData.questionType)}}题 选项：（以下选中的选项为正确答案）</div></el-col>
      </el-row>
      <!-- 题目选项-test -->
      <!-- 多选
      <el-row :gutter="20" v-if="visiData.questionType==2">
        <el-col :span="24" v-for="(item,index) in visiData.options" :key=index><div class="grid-content bg-purple">
          <el-checkbox v-model="checked"></el-checkbox>{{item.title}}
        </div></el-col>
      </el-row>
      单选
      <el-row :gutter="20" v-if="visiData.questionType==1">
        <el-col :span="24" v-for="(item,index) in visiData.options" :key=index ><div class="grid-content bg-purple">
          <el-radio v-model="checked"></el-radio>{{item.title}}
          <el-radio checked></el-radio>{{item.title}}
        </div></el-col>
      </el-row> -->
      <!-- 修改后 -->
      <el-row>
        <el-col :span="24">
          <span v-if="visiData.questionType==='1'">单选题</span>
          <span v-else-if="visiData.questionType==='2'">多选题</span>
          <span v-else>简答题</span>选项：（以下选中的选项为正确答案）
        </el-col>
      </el-row>
      <div v-for="item in visiData.options" :key="item.code" style="padding:8px 0">
        <el-radio v-if="visiData.questionType==='1'" :value="item.isRight" :label="1">{{item.title}}</el-radio>
        <el-checkbox v-if="visiData.questionType==='2'" :value="item.isRight?true:false">{{item.title}}</el-checkbox>
      </div>
      <!-- test-end -->
      <el-row :gutter="20" style=";">
        <el-col :span="24"><div class="grid-content bg-purple">【参考答案】：
          <el-button type="danger" @click="visualVideo=!visualVideo">视频答案预览</el-button>
        </div></el-col>
        <!-- 视频播放-start -->
        <el-col :span="24" v-if="visualVideo"><div class="grid-content bg-purple">
          <video controls="controls" width="400" height="300">
            <source src="move.ogg" type="video/ogg" >
            <source :src="visiData.videoURL" type="video/mp4" >
            当前浏览器暂不支持video标签用以播放视频,请换chrome
          </video>
        </div></el-col>
        <!-- 视频播放-end -->
      </el-row>
      <hr/>
      <el-row :gutter="20" style=";">
        <el-col :span="24"><div class="grid-content bg-purple">【答案解析】：<span v-html="visiData.answer" style="display:inline-block"></span></div></el-col>
      </el-row>
      <hr/>
      <el-row :gutter="20" style=";">
        <el-col :span="12"><div class="grid-content bg-purple">【题目备注】：{{visiData.remarks}}</div></el-col>
      </el-row>
      <hr/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {randoms, removeRandoms,detail} from '@/api/hmmm/questions.js'
export default {
  data() {
    return {
      list: [],
      params: {
        page:1,
        pagesize:20,
        keyword:''
      },
      total: 0,
      keywordInput: '',
      dialogVisible: false,
      checked: true,
      visiData: [],
      // 显示隐藏预览窗口的视频
      visualVideo: false,
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    // 渲染列表
    async fetchList() {
      const {data} = await randoms(this.params)
      this.total = data.counts
      this.list = data.items
    },
    // 清空关键字
    keywordClean() {
      this.keywordInput=''
    },
    // 枚举状态-题型
    state(data) {
      const type={ 
        1: '单选',
        2: '多选',
        3: '简答'
      }
      return type[data]
    },
    // 枚举状态-难度
    difficulty(data) {
      const type={
        1: '简单',
        2: '困难',
        3: '容易'
      }
      return type[data]
    },
    // 分页器 - 有空白页问题
    currentChange(page) {
      this.params.page = page
      this.fetchList()
    },
    // 删除按钮
    delRand(id) {
      this.$confirm('是否删除本行数据?', '来自127.0.0.1的提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 调用删除接口
          await removeRandoms({id})
          // 更新列表
          this.fetchList()
          // 提示用户
          this.$message.success('删除角色成功')
        }).catch()
    },
    // 搜索功能
    async searchBtn() {
      this.$message.success('我来实现搜索功能')
      const {data} = await randoms({...this.params,keyword:this.keywordInput})
      this.total = data.counts
      this.list = data.items
    },
    // 题目编号预览关闭方法
    handleClose() {
      this.dialogVisible=false
      this.visualVideo=false
    },
    // 题目编号预览
    async quesMsg(id) {
      this.dialogVisible = true
      const {data} = await detail({id})
      console.log(data)
      this.visiData = data
    },
  }
}
</script>

<style scoped>
  .el-form-nav {
    display: flex;
    justify-content: space-between;
  }
  .elPagination {
    display: flex;
    justify-content: flex-end;
    margin-top:20px;
  }
  .questionIDs {
    display: block;
    color:#2ea4ff
  }
  /* 下面为预览弹窗的样式 */
  .el-row {
    /* margin-bottom: 20px; */
  }
  .el-col {
    border-radius: 8px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

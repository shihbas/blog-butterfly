<template>
  <div class="am-u-md-9 am-u-sm-12">
    <div class="hank-base-info">
      <div class="base-info-row">
        <div class="base-info-row-item">
          <el-tooltip class="item" effect="dark" :content="CanChangeAvatar?'更改头像':`${AvatarIntervalDays}天后可更改头像`" placement="top">
            <img class="am-circle base-info-change-avatar" width="120px" height="120px" :src="Avatar" @click="headleChangeAvatar">
          </el-tooltip>
        </div>
      </div>
      <div class="base-info-row">
        <div class="base-info-row-item">
          <table>
            <tr>
              <td>昵称:</td>
              <td class="base-info-row-item-tr">{{ Nickname }}</td>
              <td>
                <el-button type="text" @click="headleChangeNickname" v-show="CanChangeNickname">修改昵称</el-button>
                <span v-show="!CanChangeNickname">{{ NicknameIntervalDays }}天后可修改昵称</span>
              </td>
            </tr>
            <tr>
              <td>邮箱:</td><td class="base-info-row-item-tr">{{ Email }}</td><td><el-button type="text" v-show="CanBindEmail" @click="headleBindEmail">绑定邮箱</el-button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- 昵称修改 -->
    <el-dialog title="昵称修改"  width="400px" :visible.sync="dialogNickname.visible" @close="dialogNickname.visible = false">
      <el-form
        label-width="80px" size="mini"
        ref="nicknameForm"
        :rules="rulesNickname"
        :model="nicknameForm">
        <el-form-item label="新昵称" prop="nickname">
          <el-input v-model="nicknameForm.nickname" type="text" name="nickname" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNickname.visible = false">关闭</el-button>
        <el-button type="primary" v-if="!ClickChangeNickNameBtn" @click="saveNewNickname">修改</el-button>
      </div>
    </el-dialog>
    <!-- 绑定邮箱 -->
    <el-dialog title="绑定邮箱"  width="400px" :visible.sync="dialogBindEmail.visible" @close="dialogBindEmail.visible = false">
      <el-form
        ref="bindEmailForm"
        :rules="rulesBindEmail"
        :model="bindEmailForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="bindEmailForm.email" type="text" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBindEmail.visible = false">关闭</el-button>
        <el-button type="primary" v-if="!ClickBindEmailBtn" @click="savebindNewEmail">绑定</el-button>
      </div>
    </el-dialog>
    <!-- 修改头像 -->
    <el-dialog title="更改头像" width="400px" :visible.sync="dialogAvatar.visible" @close="headleCloseChangeAvatar">
      <div class="hank-avatar-select-table">
        <div class="hank-avatar-selected-view">
          <div class="hank-avatar-selected-view-text">
            <span>(๑•̀ㅂ•́)و✧头像</span>
          </div>
          <div class="hank-avatar-selected-view-img">
            <img class="am-circle base-info-change-avatar" width="85px" height="85px" :src="SelectedAvatar">
          </div>
        </div>
        <div class="hank-avatar-all-view">
          <table>
            <tr v-for="(items, iSIndex) in defaultAvatarList" :key="iSIndex">
              <td v-for="(item, iIndex) in items" :key="iIndex">
                <img width="65px" height="65px" :src="item.avatar_url" @click="clickSelectedTheAvatar(item)">
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!ClickChangeAvatarBtn" @click="saveNewAvatar">更改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {fetchSelfBaseInfo, changeSelfNickName, fetchAllDefaultAvata, setSelfDefaultAvata, BindSelfEmail} from '@/api/user'

import {validNicknameLength, validBindEmailValue} from '@/utils/validator'

import {assembleDefaultAvatarList} from './tools'

export default {
  data() {
    return {
      // 昵称
      nickname: "",
      nicknameIntervalDays: 7,
      dialogNickname: {
        visible: false,
        btnClick: false
      },
      rulesNickname: {
        nickname: [
            {validator: validNicknameLength, trigger: 'blur'},
            {required: true, message: "不能为空"}
          ]
      },
      nicknameForm: {
        nickname: ''
      },
      // 头像
      avatar: "",
      avatarIntervalDays: 3,
      dialogAvatar: {
        visible: false,
        btnClick: true
      },
      selectedAvatar: '',
      selectedAvatarCode: '',
      defaultAvatarList: [],
      // 邮箱
      email: "  ",
      dialogBindEmail: {
        visible: false,
        btnClick: false
      },
      rulesBindEmail: {
        email: [
            {validator: validBindEmailValue, trigger: 'blur'},
            {required: true, message: "不能为空"}
          ]
      },
      bindEmailForm: {
        email: ''
      }
    }
  },
  created() {
    this.getSelfBaseInfo()
  },
  methods: {
    getSelfBaseInfo() {
      fetchSelfBaseInfo().then(response => {
        this.avatar = response.data.avatar
        this.nickname = response.data.nickname
        this.email = response.data.email
        this.avatarIntervalDays = response.data.avatar_interval_days
        this.nicknameIntervalDays = response.data.nickname_interval_days
      })
    },
    headleChangeNickname() {
      this.dialogNickname.visible = true
    },
    saveNewNickname() {
      this.$refs["nicknameForm"].validate((valid) => {
        // 校验表单成功后询问是否修改
        if (valid) {
          this.$confirm(`要修改昵称为【${this.nicknameForm.nickname}】么？注意！修改后内7天不能再次改为其他昵称！`, '重要提示', {
            confirmButtonText: '我确定啦！',
            cancelButtonText: '我再想想',
            type: 'warning'
          }).then(() => {
            // 锁定按钮
            this.dialogNickname.btnClick = true
            // 发起修改
            // 请求更改昵称
            this.$message({
              message: '正在更改',
              type: 'success'
            })
            changeSelfNickName(this.nicknameForm).then(response => {
              // 关闭修改框
              this.dialogNickname.visible = false
              this.dialogNickname.btnClick = false
              // 改变昵称修改天数以及昵称
              this.nicknameIntervalDays = 0
              this.nickname = this.nicknameForm.nickname
              // 修改状态里的名称
              this.$store.commit("SET_DISPLAY_NAME", this.nicknameForm.nickname)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }).catch(err => {
              this.dialogNickname.btnClick = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
      })
    },
    headleBindEmail() {
      this.dialogBindEmail.visible = true
    },
    savebindNewEmail() {
      this.$refs["bindEmailForm"].validate((valid) => {
        // 校验表单成功后询问是否绑定
        if (valid) {
          this.$confirm(`要绑定账号的收件邮箱为【${this.bindEmailForm.email}】么？注意！绑定后不能更换`, '重要提示', {
            confirmButtonText: '我确定啦！',
            cancelButtonText: '我再想想',
            type: 'warning'
          }).then(() => {
            this.dialogBindEmail.btnClick = true
            // 发起邦迪邮件发送
            // 请求绑定邮箱
            this.$message({
              message: '正在请求，请稍等',
              type: 'success'
            })
            BindSelfEmail(this.bindEmailForm).then(response => {
              // 关闭绑定邮箱窗口
              this.dialogBindEmail.visible = false
              this.dialogBindEmail.btnClick = false
              this.email = `${this.bindEmailForm.email}待绑定确认，确认后请刷新`
              this.$message({
                message: '邮件发送成功请查收，点击邮件中的连接完成绑定',
                type: 'success'
              })
            }).catch(err => {
              this.dialogBindEmail.btnClick = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消绑定'
            })
          })
        }
      })
    },
    headleChangeAvatar() {
      if (this.CanChangeAvatar) {
        this.selectedAvatar = this.avatar
        if (this.defaultAvatarList.length > 0) {
          this.dialogAvatar.visible = true
        } else {
          this.$message({
            message: `正在获取默认头像，请稍等`,
            type: 'success'
          })
          fetchAllDefaultAvata().then(response => {
            this.defaultAvatarList = assembleDefaultAvatarList(response.data)
            this.dialogAvatar.visible = true
          })
        }
      } else {
        this.$message({
          message: `距离下次能修改头像还有${this.AvatarIntervalDays}天`,
          type: 'error'
        })
      }
    },
    clickSelectedTheAvatar(item) {
      // 选择头像图片后的效果
      this.selectedAvatar = item.avatar_url
      this.selectedAvatarCode = item.code
      this.dialogAvatar.btnClick = false
    },
    headleCloseChangeAvatar() {
      // 关闭图片选择器
      this.dialogAvatar.visible = false
      this.dialogAvatar.btnClick = true
      this.selectedAvatarCode = ''
      this.selectedAvatar = ''
    },
    saveNewAvatar() {
      this.$confirm('将头像更换为当前选中的么？更换后三天内不得修改！', '重要提示', {
        confirmButtonText: '我选好了！',
        cancelButtonText: '我再选选',
        type: 'warning'
      }).then(() => {
        this.dialogAvatar.btnClick = true
        // 请求更改头像
        this.$message({
          message: '正在更改',
          type: 'success'
        })
        const data = {
          code: this.selectedAvatarCode
        }
        setSelfDefaultAvata(data).then( response => {
          this.avatarIntervalDays = 0
          this.avatar = this.selectedAvatar
          this.$message({
            message: '更改成功',
            type: 'success'
          })
          // 修改状态中的头像
          this.$store.commit("SET_AVATER", this.selectedAvatar)
          //// FIXME:  数据被清空？
          this.dialogAvatar.visible = false
          }).catch(err => {
            this.dialogAvatar.btnClick = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        })
      })
    }
  },
  computed: {
    Nickname() {
      return this.nickname
    },
    Avatar() {
      return this.avatar
    },
    Email() {
      return this.email
    },
    AvatarIntervalDays() {
      // 头像修改天
      return 3 - this.avatarIntervalDays
    },
    NicknameIntervalDays() {
      return 7 - this.nicknameIntervalDays
    },
    CanChangeAvatar() {
      // 是否能改变头像
      if (this.avatarIntervalDays < 3) {
        return false
      }
      return true
    },
    CanChangeNickname() {
      // 是否能改变昵称
      if (this.nicknameIntervalDays < 7) {
        return false
      }
      return true
    },
    CanBindEmail() {
      // 是否能够绑定邮箱
      if (this.email.length > 0) {
        return false
      }
      return true
    },
    ClickChangeAvatarBtn() {
      return this.dialogAvatar.btnClick
    },
    ClickChangeNickNameBtn() {
      return this.dialogNickname.btnClick
    },
    ClickBindEmailBtn() {
      return this.dialogBindEmail.btnClick
    },
    SelectedAvatar() {
      return this.selectedAvatar
    }
  },
}
</script>

<style>
  .hank-base-info {
    margin-top: 20px;
    padding-top: 20px;
    padding-right: 20px;
    min-width: 400px;
  }
  .base-info-row {
    margin-top: 50px;
    position: relative;
    display: flex;
    flex-direction: row;
  }

  .base-info-row-item {
    position: relative;
    flex: 1;
    text-align: center;
    width: 100%;
  }

  .base-info-row-item table {
    width: 100%;
  }
  .base-info-row-item tr {
    min-height: 40px;
    border-bottom: 3px solid #33a3dc;
  }
  .base-info-row-item td {
    min-width: 20px;
  }
  .base-info-row-item-tr {
    text-align: left;
  }

  .base-info-change-avatar {
    border: 3px solid #33a3dc;
    cursor: pointer;
  }
  .base-info-change-avatar:hover {
    transform:rotate(100deg);
    -ms-transform:rotate(100deg); 	/* IE 9 */
    -moz-transform:rotate(100deg); 	/* Firefox */
    -webkit-transform:rotate(100deg); /* Safari 和 Chrome */
    -o-transform:rotate(100deg); 	/* Opera */
  }
  /* 头像选择 */
  .hank-avatar-select-table {
    position: relative;
    /* display: flex;
    flex-direction: row; */
    width: 100%;
    min-height: 500px;
  }
  /* 头像试用框 */
  .hank-avatar-selected-view {
    margin-top: 3px;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #1888c9;
  }
  .hank-avatar-selected-view-text {
    flex: 1;
    height: 100%;
    text-align: right;
  }
  .hank-avatar-selected-view-img {
    flex: 1;
    height: 100%;
    text-align: left;
  }
  /* 备选头像 */
  .hank-avatar-all-view {
    width: 100%;
    min-height: 360px;
    border-bottom: 2px solid #190a42;
  }

  /* 头像表 */
  .hank-avatar-all-view > table{
    width: 100%;
    height: 400px;
    border-bottom: 1px solid #d8871e;
  }
  .hank-avatar-all-view tr {
    min-height: 70px;
    border-bottom: 1px solid #33a3dc;
  }
  .hank-avatar-all-view td {
    min-width: 70px;
  }
  .hank-avatar-all-view img {
    cursor: pointer;
  }
</style>


<template>
  <div class="edit">
    <el-dialog
      append-to-body
      draggable
      v-model="state.show"
      :title="state.status === 'edit' ? '编辑' : '增加'"
      width="60%"
    >
      <el-form :model="form" label-width="auto" ref="ruleFormRef">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phoneNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role">
            <el-option label="超级管理员" value="1" />
            <el-option label="用户" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.show = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped></style>

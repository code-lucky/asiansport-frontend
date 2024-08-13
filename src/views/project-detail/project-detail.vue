ArrowRigh
<template>
  <div class="project-detail">
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item class="active">Project detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="project-frame">
        <div class="project-top">
          <div class="left-frame flex_1">
            <div class="image-box">
              <div class="image">
                <img class="img" :src="getAssetURL('goods/g111.png')" alt="" />
              </div>
              <div class="image">
                <img class="img" :src="getAssetURL('goods/g222.png')" alt="" />
              </div>
              <div class="image">
                <img class="img" :src="getAssetURL('goods/g333.png')" alt="" />
              </div>
            </div>
          </div>
          <div class="right-frame flex_1">
            <div class="project-info" :style="{ top: height + 30 + 'px' }">
              <div class="project-tap-box">
                <div class="project-tap bg-danger">Sale</div>
                <div class="project-num">V00273124</div>
              </div>
              <div class="project-title">{{ eventItemDetail.name_tc }}</div>
              <div class="project-brief">
                Find aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur neque congue aliqua dolor do amet sint ovar velit.
              </div>
              <div class="price-box"><span class="new-price">$14.00</span><span class="old-price">$19.00</span></div>
              <div class="openleve-btn">
                <el-button color="#448c74" size="large" @click="openLeve">Select Leve</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <el-dialog v-model="dialogVisible" title="Select Competition" width="80%" align-center>
        <div class="dialog-content">
          <div class="Leve-list">
            <!-- <template v-for="leveitem in leveList" :key="leveitem.id"> -->
            <div class="leve-item">
              <!-- <div class="leve-title">{{ leveitem.name }}</div> -->
              <div class="item-list">
                <template v-for="item in eventItemDetail.item_level" :key="item.id">
                  <div class="item">
                    <div class="item-content">
                      <div class="item-name">{{ 'Women Foil U9' }}</div>
                      <div class="item-tip">{{ '6 July 2024' }}</div>
                      <div class="item-tip">{{ '11:00am' }}</div>
                      <div class="item-tip">{{ '10:30am' }}</div>
                    </div>
                    <div class="leve-price">
                      <div class="totle-price">
                        <span class="price">{{ item.price }}</span> <el-button size="small" plain :icon="Plus" @click="goApplication(item)"></el-button>
                      </div>
                      <div class="qty" v-if="item.qty <= 5">{{ item.qty }} left</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!-- </template> -->
          </div>
        </div>
        <!-- <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
          </div>
        </template> -->
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog v-model="dialogApplication" title="Women Foil U9" width="80%" align-center>
        <div class="dialog-content-application">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules">
              <!-- <div class="application-title"></div> -->
              <template v-for="(item, index) in form.people" :key="index">
                <el-card class="card">
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item label="English Name" :prop="`people[${index}].name_en`" :rules="peopleRules.name_en">
                        <el-input v-model="item.name_en" clearable />
                      </el-form-item>
                    </div>
                    <div class="input-box">
                      <el-form-item label="Chinese Name" :prop="`people[${index}].name_tc`" :rules="peopleRules.name_tc">
                        <el-input v-model="item.name_tc" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item label="Club Name" :prop="`people[${index}].club_name`" :rules="peopleRules.club_name">
                        <el-input v-model="item.club_name" clearable />
                      </el-form-item>
                    </div>
                    <div class="input-box">
                      <el-form-item label="Membership ID" :prop="`people[${index}].membership_id`" :rules="peopleRules.membership_id">
                        <el-input v-model="item.membership_id" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item label="Email" :prop="`people[${index}].email`" :rules="peopleRules.email">
                        <el-input v-model="item.email" clearable />
                      </el-form-item>
                    </div>
                    <div class="input-box">
                      <el-form-item label="Phone" :prop="`people[${index}].phone`" :rules="peopleRules.phone">
                        <el-input v-model="item.phone" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item label="Year of Birth" :prop="`people[${index}].dob`" :rules="peopleRules.dob">
                        <el-date-picker v-model="item.dob" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="YYYY-MM-DD" />
                      </el-form-item>
                    </div>
                    <div class="input-box"></div>
                  </div>
                </el-card>
              </template>
            </el-form>
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogApplication = false">Cancel</el-button>
            <el-button color="#448c74" @click="payBtn"> Add Cart </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'
import useEventStore from '@/store/modules/event'
import useCartStore from '@/store/modules/cart'

import { ArrowRight, Plus } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const useEvent = useEventStore()
const { eventItemDetail } = storeToRefs(useEvent)

const useMain = useMainStore()
const { height } = storeToRefs(useMain)

const useCart = useCartStore()
// const { list } = storeToRefs(useCart)

useEvent.getEventItemDetailAction({ id: route.params.project_id }).then(() => {
  if (Object.keys(eventItemDetail.value).length) {
    useEvent.getEventItemPeopleAction({
      item_id: route.params.project_id,
      event_id
    })
  }
})

const dialogVisible = ref(false)
const dialogApplication = ref(false)

const openLeve = () => {
  dialogVisible.value = true
}

const leveList = ref([
  {
    di: 1,
    name: 'Foil',
    list: [
      {
        id: 11,
        name: 'Women Foil U9',
        date: '6 July 2024',
        time: '11:00am',
        reporting_time: '10:30am',
        qty: '6',
        price: 'HK$650'
      },
      {
        id: 12,
        name: 'Women Foil U13',
        date: '6 July 2024',
        time: '11:00am',
        reporting_time: '10:30am',
        qty: '4',
        price: 'HK$650'
      }
    ]
  },
  {
    id: 2,
    name: 'Sabre',
    list: [
      {
        id: 21,
        name: 'Women Sabre U9',
        date: '6 July 2024',
        time: '11:00am',
        reporting_time: '10:30am',
        qty: '6',
        price: 'HK$650'
      }
    ]
  }
])

const goApplication = (item) => {
  currentLevel.value = {
    ...item
  }
  dialogApplication.value = true
}

const formRef = ref(null)
const currentLevel = ref({})
const form = ref({
  people: [
    {
      dob: '',
      phone: '',
      email: '',
      name_en: '',
      name_tc: '',
      membership_id: '',
      club_name: ''
    }
  ]
})

const rules = reactive({})
const peopleRules = reactive({
  dob: [{ required: true, message: 'Please input Year of Birth', trigger: 'blur' }],
  phone: [{ required: true, message: 'Please input Phone', trigger: 'blur' }],
  email: [{ required: true, message: 'Please input Email', trigger: 'blur' }],
  name_en: [{ required: true, message: 'Please input English Name', trigger: 'blur' }],
  name_tc: [{ required: true, message: 'Please input Chinese Name', trigger: 'blur' }],
  membership_id: [{ required: true, message: 'Please input Membership ID', trigger: 'blur' }],
  club_name: [{ required: true, message: 'Please select Club Name', trigger: 'blur' }]
})

const payBtn = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      dialogApplication.value = false
      dialogVisible.value = false
      // useCart.addCartAction({
      //   event_id:eventItemDetail.value.id,
      //   event_item_id:currentLevel.value.id,
      //   event_level_id:currentLevel.value.event_level_id,
      //   clients:[]
      // })
    } else {
      ElMessage.error('Oops, Please enter the correct format before proceeding with the operation.')
    }
  })
}
</script>

<style scoped lang="less">
.project-detail {
  .breadcrumb {
    padding: 30px 30px;
    :deep(.el-breadcrumb) {
      .is-link {
        color: var(--color-858c97);
      }
      .active {
        span {
          color: var(--color-b27437);
        }
      }
    }
  }
  .project-frame {
    padding: 0 15px;
    .project-top {
      display: flex;
      .flex_1 {
        flex: 1;
      }
      .left-frame {
        padding: 0 15px;
        .image-box {
          .image {
            margin-bottom: 20px;
            background: var(--color-f6f9fc);
            border-radius: 12px;
            .img {
              width: 100%;
            }
          }
        }
      }
      .right-frame {
        padding: 0 15px;
        .project-info {
          position: sticky;
        }
        .project-tap-box {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          .project-tap {
            font-size: 12px;
            padding: 5px 9px;
            font-weight: 550;
            border-radius: 30px;
          }
          .project-num {
            margin-left: 50px;
            font-size: 14px;
          }
        }
        .project-title {
          margin-bottom: 20px;
          font-size: 28px;
          font-weight: bold;
        }
        .project-brief {
          margin-bottom: 20px;
          line-height: 22px;
          font-size: 16px;
        }
        .price-box {
          display: flex;
          align-items: flex-end;
          .new-price {
            font-size: 22px;
            font-weight: bold;
            margin-right: 10px;
          }
          .old-price {
            font-size: 20px;
            text-decoration: line-through;
            color: #b4bbc3;
          }
        }
        .openleve-btn {
          margin-top: 50px;
          :deep(.el-button) {
            width: 100%;
            font-size: 16px;
          }
        }
        .bg-danger {
          background: rgba(237, 80, 80, 0.1);
          color: rgba(237, 80, 80, 1);
        }
        .bg-primary {
          background: rgba(68, 140, 116, 0.1);
          color: rgba(68, 140, 116, 1);
        }
      }
    }
  }
  .dialog {
    :deep(.el-dialog) {
      max-width: 1000px;
      min-width: 330px;
      max-height: 80vh;
      .el-dialog__body {
        max-height: calc(80vh - 116px);
        overflow-y: auto;
        .dialog-content {
          height: 100%;
          padding: 0 20px;
          color: var(--color-212529);
          .Leve-list {
            .leve-item {
              margin-bottom: 20px;
              .leve-title {
                margin-bottom: 10px;
                font-size: 18px;
              }
              .item-list {
                .item {
                  display: flex;
                  align-items: center;
                  padding: 20px 20px 15px;
                  margin-bottom: 10px;
                  border: 1px solid var(--color-e3e9ef);
                  //   cursor: pointer;
                  .item-content {
                    flex: 1;
                    padding-right: 20px;
                    .item-name {
                      margin-bottom: 5px;
                    }
                    .item-tip {
                      margin-bottom: 5px;
                      color: var(--color-858c97);
                    }
                  }
                  .leve-price {
                    flex-shrink: 0;
                    .totle-price {
                      display: flex;
                      align-items: center;

                      .price {
                        font-size: 16px;
                        margin-right: 10px;
                      }
                    }
                    .qty {
                      color: red;
                    }
                  }
                }
              }
            }
          }
        }
        .dialog-content-application {
          padding: 0;
        }
      }
    }

    .form {
      .application-title {
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: bold;
      }
      .input-frame {
        display: flex;
        margin: 0 -10px;
        .input-box {
          flex: 1;
          padding: 0 10px;
        }
      }
      :deep(.el-form) {
        .card {
          margin-bottom: 20px;
          .el-card__body {
            padding-bottom: 0;
          }
        }
        .el-form-item {
          display: block;
          width: 100%;
          margin-bottom: 18px;
          .el-form-item__label {
            height: 16px;
            line-height: 16px;
            margin-bottom: 5px;
            font-size: 14px;
            font-weight: 600;
            color: #1b2a4e;
          }
        }
        .el-form-item.is-required {
          .el-form-item__label {
            &::before {
              display: none;
            }
            &::after {
              content: '*';
              color: var(--el-color-danger);
              margin-left: 4px;
            }
          }
        }
        .el-select {
          flex: 1;
        }
        .el-input {
          flex: 1;
          .el-input__wrapper {
            font-size: 14px;
          }
        }
        .el-textarea {
          font-size: 14px;
        }
        .el-checkbox-group {
          flex: 1;
          .el-checkbox {
            width: 33.33%;
            margin-right: 0;
            .el-checkbox__label {
              font-size: 16px;
              white-space: pre-wrap;
              color: #1b2a4e;
            }
            .el-checkbox__input.is-checked + .el-checkbox__label {
              color: #1b2a4e;
            }
          }
        }
        .el-radio-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .el-radio {
            .el-radio__label {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>

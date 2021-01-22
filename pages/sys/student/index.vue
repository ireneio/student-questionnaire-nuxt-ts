<template>
  <div>
    <BackendTablePageLayout :tableHeaders="tableHeaders" :tableData="tableData" @row-click="handleRowClick">
      <template #toolbar>
        <div class="btn toolbar__btn"
          @click="handleSendInvitationMultiple"
          :class="{'btn--disabled': checked.length <= 1, 'btn--primary': checked.length > 0 }"
        >
          Invite
        </div>
        <div class="btn btn--primary toolbar__btn" @click="handleOpenAddNewPersonnelModal">Add</div>
        <div class="tip toolbar__tip" @mouseover="hoverTooltip = true" @mouseleave="hoverTooltip = false">
          <div class="tip__icon"></div>
          <div class="tip__text tooltip__parent">Info
            <div class="tooltip" v-show="hoverTooltip">
              <div class="tooltip__data">
                <div class="tooltip__dataCircle"></div>
                <div class="tooltip__dataText">Idle</div>
              </div>
              <div class="tooltip__data tooltip__data--consequtive">
                <div class="tooltip__dataCircle tooltip__dataCircle--success"></div>
                <div class="tooltip__dataText">Sent</div>
              </div>
              <div class="tooltip__data tooltip__data--consequtive">
                <div class="tooltip__dataCircle tooltip__dataCircle--warning"></div>
                <div class="tooltip__dataText">In Progress</div>
              </div>
              <div class="tooltip__data tooltip__data--consequtive">
                <div class="tooltip__dataIcon"></div>
                <div class="tooltip__dataText">Complete</div>
              </div>
            </div>
          </div>
        </div>
        <div class="search toolbar__search">
          <input type="text" placeholder="Keyword..." class="search__input" v-model="searchForm.keyword" @keydown.enter="getAndMapTableData">
          <div class="search__btn" @click="getAndMapTableData">
            <div class="search__btnIcon"></div>
          </div>
        </div>
      </template>
      <template #CAT="{ colValue }">
        <div class="circle"
          :class="{
            'circle--red': colValue === 9 || colValue === 99,
            'circle--yellow': colValue === 2 || colValue === 3 || colValue === 4,
            'circle--white': colValue === 0 || colValue === 1
          }"
          v-if="colValue === 9 || colValue === 99 || colValue === 2 || colValue === 3 || colValue === 4 || colValue === 0 || colValue === 1"
        >
        </div>
        <div class="report" v-else @click="handleOpenReport($event, row)"></div>
      </template>
      <template #misc="{ row }">
        <div class="table__toolbar">
          <div class="tableBtn" @click.stop="handleToggleSendInviteModal(row)">
            <div class="tableBtn__icon tableBtn--iconInvite"></div>
            <div class="tableBtn__text">Invite</div>
          </div>
          <div class="tableBtn" @click.stop="handleToggleSendReportModal(row)">
            <div class="tableBtn__icon tableBtn--iconSent"></div>
            <div class="tableBtn__text">Send</div>
          </div>
        </div>
      </template>
      <template #checkbox="{ row }">
        <input type="checkbox" @change="handleCheck($event, row)" />
      </template>
    </BackendTablePageLayout>
    <div class="modal modal--center" v-show="toggleAddNewPersonnelModal">
      <div class="modal__title">
        <div class="modal__titleText">新進人員</div>
        <div class="modal__times" @click="toggleAddNewPersonnelModal = false"></div>
      </div>
      <div class="modal__body">
        <div class="modal__section">
          <div class="modal__sectionTitle">基本資料</div>
          <div class="inputWrapper">
            <div class="inputWrapper__row">
              <div class="input">
                <div class="input__label">姓名</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox" v-model="addNewPersonnelForm.Name" />
                </div>
              </div>
              <div class="input">
                <div class="input__label">手機</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox" v-model="addNewPersonnelForm.Phone"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">信箱</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox" v-model="addNewPersonnelForm.Email"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">學歷</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox" v-model="addNewPersonnelForm.Graduation"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">績效</div>
                <div class="input__input">
                  <select class="input__inputBox" v-model="addNewPersonnelForm.Graduation">
                    <option :value="item.Key" v-for="item in performanceList" :key="item.Key">{{ item.Value }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__section model__section--consequtive">
          <div class="modal__sectionTitle">招募資料</div>
          <div class="inputWrapper">
            <div class="inputWrapper__row">
              <div class="input">
                <div class="input__label">部門</div>
                <div class="input__input">
                  <select class="input__inputBox" v-model="addNewPersonnelForm.Department">
                    <option value="aaa">123</option>
                  </select>
                </div>
              </div>
              <div class="input">
                <div class="input__label">階層</div>
                <div class="input__input">
                  <select class="input__inputBox" v-model="addNewPersonnelForm.Class">
                    <option :value="item.Key" v-for="item in classList" :key="item.Key">{{ item.Value }}</option>
                  </select>
                </div>
              </div>
              <div class="input">
                <div class="input__label">職系</div>
                <div class="input__input">
                  <select class="input__inputBox" v-model="addNewPersonnelForm.Profession">
                    <option :value="item.Key" v-for="item in professionList" :key="item.Key">{{ item.Value }}</option>
                  </select>
                </div>
              </div>
              <div class="input">
                <div class="input__label">工號</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox" v-model="addNewPersonnelForm.EmployNumber"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">職位</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox" v-model="addNewPersonnelForm.Position"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__section model__section--consequtive">
          <div class="modal__sectionTitle">選擇測評類型 ( 可複選 )</div>
          <div class="inputWrapper">
            <div class="inputWrapper__row">
              <div class="input input--block">
                <div class="input__input input__checkbox">
                  <input type="checkbox" id="mayo" v-model="surveyForm.MAYO"/>
                  <div class="input__label input__label--checkbox" for="mayo">MAYO測評</div>
                </div>
              </div>
              <div class="input input--block">
                <div class="input__input input__checkbox">
                  <input type="checkbox" id="ddi" v-model="surveyForm.DDI"/>
                  <div class="input__label input__label--checkbox" for="ddi">DDI測評</div>
                </div>
              </div>
              <div class="input input--block">
                <div class="input__multipleInputsBox">
                  <div class="input__input input__checkbox">
                    <input type="checkbox" id="capp" v-model="surveyForm.CAT"/>
                    <div class="input__label input__label--checkbox">Lasso AI</div>
                  </div>
                  <div class="input__input input__multipleInputs--consequtive">
                    <select class="input__inputBox">
                      <option value="aaa">請選擇AI測評類型</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__footer modal__footer--small">
        <div class="modal__footerToolbar">
          <div class="btn btn--wide btn--lassoOutlined btn--rounded" @click="toggleAddNewPersonnelModal = false">取消</div>
          <div class="btn btn--lasso btn--wide2x btn--rounded modal__footerToolbarBtn--consequtive" @click="handleAddNewPersonnel">確定</div>
        </div>
      </div>
    </div>
    <div class="modal modal--center" v-show="toggleSendInviteModal">
      <div class="modal__title">
        <div class="modal__titleText">發送測評邀請</div>
        <div class="modal__times" @click="toggleSendInviteModal = false"></div>
      </div>
      <div class="modal__body">
        <div class="modal__section">
          <div class="modal__sectionTitle">
            <div class="modal__sectionTitleMainText">發送人選</div>
            <div class="modal__sectionTitleSubText">選取人選：{{ this.selectMode === 0 ? '1' : this.checked.length }} 人</div>
          </div>
          <div class="inputWrapper">
            <div class="inputWrapper__row">
              <div class="list" v-if="selectedPersonnel.length">
                <div class="list__listitem" v-for="item in selectedPersonnel" :key="item.SubjectId">
                  <div>職位：{{ item.Position }}</div>
                  <div>受測者：{{ item.Name }}</div>
                  <div class="list__icon"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__section model__section--consequtive">
          <div class="modal__sectionTitle">選擇測評類型 ( 可複選 )</div>
          <div class="inputWrapper">
            <div class="inputWrapper__row">
              <div class="input">
                <div class="input__input input__checkbox">
                  <input type="checkbox" id="mayo" v-model="surveyForm.MAYO"/>
                  <div class="input__label input__label--checkbox" for="mayo">MAYO測評</div>
                </div>
              </div>
              <div class="input">
                <div class="input__input input__checkbox">
                  <input type="checkbox" id="ddi" v-model="surveyForm.DDI"/>
                  <div class="input__label input__label--checkbox" for="ddi">DDI測評</div>
                </div>
              </div>
              <div class="input">
                <div class="input__multipleInputsBox">
                  <div class="input__input input__checkbox">
                    <input type="checkbox" id="CAT" v-model="surveyForm.CAT"/>
                    <div class="input__label input__label--checkbox">Lasso AI</div>
                  </div>
                  <div class="input__input input__multipleInputs--consequtive">
                    <select class="input__inputBox">
                      <option value="aaa">請選擇AI測評類型</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__footer modal__footer--small">
        <div class="modal__footerToolbar">
          <div class="btn btn--wide btn--lassoOutlined btn--rounded" @click="toggleSendInviteModal = false">取消</div>
          <div class="btn btn--lasso btn--wide2x btn--rounded modal__footerToolbarBtn--consequtive" @click="handleSendInvitation">確定</div>
        </div>
      </div>
    </div>
    <div class="modal modal--center" v-show="toggleSendReportModal">
      <div class="modal__title">
        <div class="modal__titleText">寄送報告</div>
        <div class="modal__times" @click="toggleSendReportModal = false"></div>
      </div>
      <div class="modal__body">
        <div class="modal__section">
          <div class="modal__sectionTitle">
            <div class="modal__sectionTitleMainText">發送人選</div>
            <div class="modal__sectionTitleSubText">選取人選：{{ this.selectMode === 0 ? '1' : this.checked.length }} 人</div>
          </div>
          <div class="inputWrapper">
            <div class="inputWrapper__row">
              <div class="list" v-if="selectedPersonnel.length">
                <div class="list__listitem" v-for="item in selectedPersonnel" :key="item.SubjectId">
                  <div>職位：{{ item.Position }}</div>
                  <div>受測者：{{ item.Name }}</div>
                  <div class="list__icon"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__footer modal__footer--small">
        <div class="modal__footerToolbar">
          <div class="btn btn--wide btn--lassoOutlined btn--rounded" @click="toggleSendReportModal = false">取消</div>
          <div class="btn btn--lasso btn--wide2x btn--rounded modal__footerToolbarBtn--consequtive" @click="handleSendReport">確定</div>
        </div>
      </div>
    </div>
    <div class="modal modal--right" v-show="toggleBasicDetailModal">
      <div class="modal__title modal__title--right">
        <div class="modal__titleText"></div>
        <div class="modal__times modal__times--right" @click="toggleBasicDetailModal = false"></div>
      </div>
      <div class="modal__body">
        <div class="modal__section">
          <div class="modal__sectionTitle">
            <div class="modal__sectionTitleMainText">基本資料</div>
            <div class="modal__sectionTitleSubText modal__sectionTitleSubText--clickable" @click="toggleBasicDetailEdit = true">
              <div class="modal__sectionTitleSubTextIcon"></div>
              編輯
            </div>
          </div>
          <div class="inputWrapper">
            <div class="inputWrapper__row">
              <div class="input">
                <div class="input__label">姓名</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">手機</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">信箱</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">學歷</div>
                <div class="input__input">
                  <input type="text" class="input__inputBox"/>
                </div>
              </div>
              <div class="input">
                <div class="input__label">學歷</div>
                <div class="input__input">
                  <select class="input__inputBox">
                    <option value="aaa">123</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__section model__section--consequtive">
          <div class="modal__sectionTitle">測評紀錄</div>
          <div class="inputWrapper">
            <table class="simpleTable">
              <thead class="simpleTable__header">
                <tr>
                  <th class="simpleTable__headerCell">項目</th>
                  <th class="simpleTable__headerCell">完成時間</th>
                  <th class="simpleTable__headerCell">狀態</th>
                </tr>
              </thead>
              <div class="simpleTable__divider"></div>
              <tbody class="simpleTable__body">
                <tr class="simpleTable__row simpleTable__row--odd">
                  <td class="simpleTable__col">The table body</td>
                  <td class="simpleTable__col">with two columns</td>
                  <td class="simpleTable__col">The table body</td>
                </tr>
                <tr class="simpleTable__row simpleTable__row--even">
                  <td class="simpleTable__col">The table body</td>
                  <td class="simpleTable__col">with two columns</td>
                  <td class="simpleTable__col">The table body</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal__footer modal__footer--small" v-show="toggleBasicDetailEdit">
        <div class="modal__footerToolbar">
          <div class="btn btn--wide btn--lassoOutlined btn--rounded" @click="toggleBasicDetailModal = false">取消</div>
          <div class="btn btn--lasso btn--wide2x btn--rounded modal__footerToolbarBtn--consequtive">確定</div>
        </div>
      </div>
    </div>
    <BaseMask :active="maskActive" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { $axios } from '~/utils/api'
import { eventStopDefault } from '~/utils/helpers'
import BaseMask from '~/components/BaseMask.vue'
import BackendTablePageLayout from '~/components/BackendTablePageLayout.vue'
import { AxiosResponse } from 'axios'
import { TablePage } from '~/types/index'

@Component({
  layout: 'backend',
  middleware: ['auth'],
  components: {
    BaseMask,
    BackendTablePageLayout
  }
})
export default class RecruitmentIndex extends Vue {
  private checked: Array<string> = []

  private tableHeaders: Array<string> = [
    'checkbox',
    'Name',
    'Email',
    'Education',
    'Institution',
    'Result',
    'Misc'
  ]

  private tableData: Array<TablePage.TableItem> = []

  private pageData: TablePage.PageData = {
    currentPage: 1,
    rows: 10
  }

  private searchForm: TablePage.SearchForm = {
    keyword: ''
  }

  private toggleAddNewPersonnelModal: boolean = false

  private toggleSendInviteModal: boolean = false

  private toggleSendReportModal: boolean = false

  private toggleBasicDetailModal: boolean = false

  private toggleBasicDetailEdit: boolean = false

  private modalView: number = 0

  private hoverTooltip: boolean = false

  private addNewPersonnelForm: TablePage.AddNewPersonnelForm = {
    Name: '',
    Email: '',
    Phone: '',
    Photo: '',
    Identity: '',
    Position: '',
    Department: '',
    Graduation: '',
    Class: '',
    Profession: '',
    EmployNumber: ''
  }

  private surveyForm: TablePage.SurveyForm = {
    CAT: false,
    MAYO: false,
    DDI: false
  }

  private subjectId: string = ''

  private performanceList: Array<any> = []

  private professionList: Array<any> = []

  private classList: Array<any> =  []

  private departmentList: Array<any> = []

  private selectMode: number = 0

  private get selectedPersonnel(): Array<TablePage.TableItem | TablePage.TableSelectedItem | undefined> {
    const placeholder = { SubjectId: '', Name: '', Position: '' }
    if(this.tableData.length) {
      if(this.selectMode === 0) {
        const res = this.tableData.find((item: TablePage.TableItem) => item.SubjectId === this.subjectId)
        return [ res !== undefined ? res : placeholder ]
      } else if(this.selectMode === 1) {
        return this.checked.map((item: string) => {
          return this.tableData.find(tableItem => tableItem.SubjectId === item)
        }) || []
      }
    } else {
      return [ placeholder ]
    }
    return [ placeholder ]
  }

  private get maskActive(): boolean {
    return this.toggleAddNewPersonnelModal || this.toggleSendInviteModal || this.toggleSendReportModal || this.toggleBasicDetailModal
  }

  private handleRowClick(): void {
    this.toggleBasicDetailModal = true
  }

  private handleOpenReport($event: Event, row: TablePage.TableItem): void {
    eventStopDefault($event)
    window.open(`/sys/recruitment/report?SubjectId=${row.SubjectId}&AssessmentId=${row.CATId}`, '_blank')
  }

  private async handleSendReport(): Promise<void> {
    // TODO
  }

  private handleSendInvitationMultiple(): void {
    if(this.checked.length > 0) {
      this.toggleSendInviteModal = true
      this.selectMode = 1
    }
  }

  private handleToggleSendInviteModal(row: TablePage.TableItem): void {
    this.toggleSendInviteModal = true
    this.selectMode = 0
    this.subjectId = row.SubjectId
  }

  private handleToggleSendReportModal(row: TablePage.TableItem): void {
    this.toggleSendReportModal = true
    this.selectMode = 0
    this.subjectId = row.SubjectId
  }

  private async handleSendInvitation(row: TablePage.TableItem): Promise<void> {
    const confirmChecked = Object.values(this.surveyForm).find(item => item === true)
    if(confirmChecked) {
      await this.sendCreateAssessmentRequest('CAPP', 'invitation')
      this.toggleSendInviteModal = false
    }
  }

  private async handleUpdatePage(type: number): Promise<void> {
    if(type === 1) {
      this.pageData.currentPage += 1
      await this.sendGetTableDataRequest()
    } else if(type === -1 && this.pageData.currentPage !== 1) {
      this.pageData.currentPage -=1
      await this.sendGetTableDataRequest()
    }
  }

  private async handleOpenAddNewPersonnelModal(): Promise<void> {
    this.toggleAddNewPersonnelModal = true
    const result = await this.sendGetParametersRequest('Platform', 'Performance')
    if(result) this.performanceList = [ ...result.data.Results ]
    const result2 = await this.sendGetParametersRequest('Platform', 'Profession')
    if(result2) this.professionList = [ ...result2.data.Results ]
    const result3 = await this.sendGetParametersRequest('Platform', 'Class')
    if(result3) this.classList = [ ...result3.data.Results ]
  }

  private async handleAddNewPersonnel(): Promise<void> {
    let iterator = Object.keys(this.surveyForm)
    iterator = iterator.filter((item: string) => this.surveyForm[item] === true)

    await this.sendAddNewPersonnelRequest()
    if(iterator.length) {
      const result: AxiosResponse = await this.sendCreateAssessmentRequest(iterator)
      this.subjectId = result.data.Results[0].SubjectId
    }
    await this.getAndMapTableData()
    this.toggleAddNewPersonnelModal = false
  }

  private handleCheck(e: Event | any, row: TablePage.TableItem) {
    if(e.target && e.target.checked) {
      this.checked = [...this.checked, row.SubjectId]
    } else {
      this.checked = this.checked.filter(item => item !== row.SubjectId)
    }
  }

  private async sendGetParametersRequest(type: number, code: number): Promise<AxiosResponse> {
    try {
      const requestBody = {
              Conditions: [
          {
              ParameterType: type,
              TypeCode: code
          }
      ]
      }
      const result = await $axios.post('/Utility/QueryParameters', requestBody)
      return result
    } catch(e) {
      console.log(e)
      return e
    }
  }

  private async sendCreateAssessmentRequest(list: Array<any>, type?: string): Promise<AxiosResponse> {
    let requestBody
    try {
      if(type === 'invitation') {
        requestBody = {
          Contents: [
            {
              SubjectId: this.subjectId,
              Type: 'CAT',
              EnableInvite: true,
              Version: '1.0',
              Period: 720,
              ReportViewers:[]
            }
          ]
        }
      } else {
        requestBody = {
          Contents: [
            {
              SubjectId: this.subjectId,
              Type: list[0],
              EnableInvite: true,
              Version: '1.0',
              Period: 16,
              ReportViewers:[]
            }
          ]
        }
      }
      return await $axios.post('/Assessment/CreateAssessments', requestBody)
    } catch(e) {
      console.log(e)
      return e
    }
  }

  private async sendAddNewPersonnelRequest(): Promise<AxiosResponse> {
    try {
      const requestBody = {
        Contents: [
          { ...this.addNewPersonnelForm, Identity: 1 }
        ]
      }
      const result = await $axios.post('/Assessment/CreateSubjects', requestBody)
      return result
    } catch(e) {
      console.log(e)
      return e
    }
  }

  private async sendGetTableDataRequest(): Promise<AxiosResponse> {
    try {
      const requestBody = {
        Conditions: [
          {
            IdentityFilter: 1,
            SortBy: '',
            Ordering: 'DESC',
            Keyword: this.searchForm.keyword === '' ? null : this.searchForm.keyword
          }
        ],
        Page: this.pageData.currentPage,
        RowsPerPage: this.pageData.rows
      }
      return await $axios.post('/Assessment/QuerySubjects', requestBody)
    } catch(e) {
      return e
    }
  }

  private async getAndMapTableData(): Promise<void> {
    const result = await this.sendGetTableDataRequest()
    this.tableData = result.data.Results.map((item: any) => {
      return {
        checkbox: true,
        // SubjectId: item.SubjectId,
        // Department: item.Department,
        Name: item.Name,
        Email: item.Email,
        Position: item.Position,
        Class: item.Class,
        CAT: item.CAT.length ? item.CAT[0].Status ? item.CAT[0].Status : 0 : 0,
        // CATId: item.CAT.length ? item.CAT[0].AssessmentId ? item.CAT[0].AssessmentId : 0 : 0,
        misc: true,
      }
    })
  }

  private async created(): Promise<void> {
    await this.getAndMapTableData()
  }
}
</script>

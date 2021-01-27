<template>
  <div class="modal--fullScreen" id="print">
    <div class="modal__title noPrint">
      <div class="modal__titleText">
        <span @click="modalView = 0" :class="{ 'modal__titleText--focused': modalView === 0, 'modal__titleText--blurred': modalView === 1 }">
          新增人員</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span @click="modalView = 1" :class="{ 'modal__titleText--focused': modalView === 1, 'modal__titleText--blurred': modalView === 0 }">
          完整數據
        </span>
      </div>
    </div>
    <div class="modal__body modal__body--fullScreen" v-show="modalView === 0">
      <div class="modal__bodyTitle">當前報告 : 未來員工職能測評</div>
      <div class="modal__section">
        <div class="modal__sectionTitle">
          <div class="modal__sectionTitleMainText">人員資料 ( {{ rowCount }} )</div>
        </div>
        <div class="inputWrapper">
          <div class="inputWrapper__row">
            <table class="simpleTable simpleTable--small">
              <thead class="simpleTable__header">
                <tr>
                  <th class="simpleTable__headerCell">姓名</th>
                  <th class="simpleTable__headerCell">身分</th>
                  <th class="simpleTable__headerCell">工號</th>
                  <th class="simpleTable__headerCell">信箱</th>
                  <th class="simpleTable__headerCell">學歷</th>
                  <th class="simpleTable__headerCell">職位</th>
                  <th class="simpleTable__headerCell">職系</th>
                  <th class="simpleTable__headerCell">階層</th>
                  <th class="simpleTable__headerCell">地區</th>
                  <th class="simpleTable__headerCell">部門</th>
                  <th class="simpleTable__headerCell">測評歷史紀錄</th>
                </tr>
              </thead>
              <div class="simpleTable__divider"></div>
              <tbody class="simpleTable__body">
                <tr class="simpleTable__row simpleTable__row--odd">
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].Name === null ? '' : pageData.Subjects[0].Name : '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].Identity === '1' ? '在職' : '非在職' : '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].EmployeeNumber === null ? '' : pageData.Subjects[0].EmployeeNumber : '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].Email === null ? '' : pageData.Subjects[0].Email : '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].Graduation === null ? '' : pageData.Subjects[0].Graduation : '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].Position === null ? '' : pageData.Subjects[0].Position : '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].Profession === null ? '' : pageData.Subjects[0].Profession : '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].EmployeeNumber === null ? '' : pageData.Subjects[0].EmployeeNumber : '' }}</td>
                  <td class="simpleTable__col">台北</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].Department === null ? '' : pageData.Subjects[0].Department: '' }}</td>
                  <td class="simpleTable__col">{{ pageData.Subjects.length ? pageData.Subjects[0].CAT.length > 0 ? 'CAT' : '' : '' }}</td>
                  <td class="simpleTable__col">></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal__section model__section--consequtive">
        <div class="modal__sectionTitle">報告可信度指標</div>
        <div class="bigBoxWraper">
          <div>
            <div class="categoryProgBar__textTitle">報告可性度:
              <span class="categoryProgBar__text categoryProgBar__text--success"
                    :style="{ color: pageData.Subjects.length ? parseInt(pageData.CurrentProfessionCompetency.Competency) > 80 ? '#33a588' : parseInt(pageData.CurrentProfessionCompetency.Competency) >= 60 ? '#f5b537' : '#db5a5a' : '#db5a5a' }">{{ pageData.Subjects.length ? parseInt(pageData.CurrentProfessionCompetency.Competency) > 80 ? '高於平均值' : parseInt(pageData.CurrentProfessionCompetency.Competency) >= 60 ? '平均值' : '低於平均值' : '低於平均值'}}
              </span>
            </div>
            <div
              class="categoryProgBar categoryProgBar__report noPrint"
              :style="{ 'background-color': pageData.Subjects.length ? parseInt(pageData.CurrentProfessionCompetency.Competency) > 80 ? '#33a588' : parseInt(pageData.CurrentProfessionCompetency.Competency) >= 60 ? '#f5b537' : '#db5a5a' : '#db5a5a' }">
              <div class="categoryProgBar__before" :style="{ width: `${pageData.Subjects.length ? (1 - parseInt(pageData.CurrentProfessionCompetency.Competency) / 217).toString() : '200'}` + 'px'}"></div>
            </div>
          </div>
          <div class="inputWrapper boxWrapper" v-if="pageData.Credibility.length > 0">
            <div class="modal__box" v-for="(item, index) in pageData.Credibility" :key="item.key" :class="{'modal__box--consequtive': index > 0}">
              <div class="modal__boxTitle">{{ item.Key }}</div>
              <div class="modal__boxContent">{{ item.Value }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__banner noPrint">
        <div class="modal__bannerIcon"></div>
        <div class="modal__bannerText">
          作答時間：整體作答所花時間是否異常。謹慎認真：是否仔細看題作答。 <br />
          印象管理：是否刻意想展現良好形象。作答傾向：是否太過中庸或極端。
        </div>
      </div>
      <div class="modal__section model__section--consequtive breakPage" v-if="Object.keys(pageData.CurrentProfessionCompetency).length > 0">
        <div class="modal__sectionTitle">職能匹配九宮格</div>
        <div class="divideWrapper">
          <div class="modal__graph">
            <div class="modal__graphNumber noPrint" :style="{ color: Object.keys(pageData.CurrentProfessionCompetency).length > 0 ? parseInt(pageData.CurrentProfessionCompetency.Competency) > 80 ? '#33a588' : parseInt(pageData.CurrentProfessionCompetency.Competency) >= 60 ? '#f5b537' : '#db5a5a' : '#db5a5a' }">{{ Object.keys(pageData.CurrentProfessionCompetency).length > 0 ? (parseInt(pageData.CurrentProfessionCompetency.Competency)).toString() : '0' }}</div>
            <div id="graph" style="height: 150px; width: 150px;" class="noPrint"></div>
            <div class="modal__graphDesc">
              <div class="modal__graphDescTitle modal__graphDescTitle--success" :style="{ color: Object.keys(pageData.CurrentProfessionCompetency).length > 0 ? parseInt(pageData.CurrentProfessionCompetency.Competency) > 80 ? '#33a588' : parseInt(pageData.CurrentProfessionCompetency.Competency) >= 60 ? '#f5b537' : '#db5a5a' : '#db5a5a' }">{{ Object.keys(pageData.CurrentProfessionCompetency).length > 0 ? parseInt(pageData.CurrentProfessionCompetency.Competency) > 80 ? '高於平均值' : parseInt(pageData.CurrentProfessionCompetency.Competency) >= 60 ? '平均值' : '低於平均值' : '低於平均值' }}</div>
              <div class="modal__graphDescBody">當前對比職系：{{ Object.keys(pageData.CurrentProfessionCompetency).length > 0 ? pageData.CurrentProfessionCompetency.Profession: 'Placeholder' }}</div>
            </div>
          </div>
          <table class="simpleTable simpleTable--small">
            <thead class="simpleTable__header">
              <tr>
                <th class="simpleTable__headerCell">當前職系：{{ Object.keys(pageData.CurrentProfessionCompetency).length > 0 ? pageData.CurrentProfessionCompetency.Profession: 'Placeholder' }}</th>
                <th class="simpleTable__headerCell">重要</th>
                <th class="simpleTable__headerCell">普通</th>
                <th class="simpleTable__headerCell">不重要</th>
              </tr>
            </thead>
            <div class="simpleTable__divider noPrint"></div>
            <tbody class="simpleTable__body">
              <tr class="simpleTable__row simpleTable__row--even">
                <td class="simpleTable__col">優勢</td>
                <td class="simpleTable__col" v-html="nineBoxItem(0)"></td>
                <td class="simpleTable__col" v-html="nineBoxItem(1)"></td>
                <td class="simpleTable__col" v-html="nineBoxItem(2)"></td>
              </tr>
                <tr class="simpleTable__row simpleTable__row--even">
                  <td class="simpleTable__col">普通</td>
                <td class="simpleTable__col" v-html="nineBoxItem(3)"></td>
                <td class="simpleTable__col" v-html="nineBoxItem(4)"></td>
                <td class="simpleTable__col" v-html="nineBoxItem(5)"></td>
              </tr>
                <tr class="simpleTable__row simpleTable__row--even">
                <td class="simpleTable__col">劣勢</td>
                <td class="simpleTable__col" v-html="nineBoxItem(6)"></td>
                <td class="simpleTable__col" v-html="nineBoxItem(7)"></td>
                <td class="simpleTable__col" v-html="nineBoxItem(8)"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal__section model__section--consequtive">
        <div class="modal__sectionTitle">職位適性指標</div>
        <div class="modal__sectionSubtitle">推薦職位Top5</div>
        <div class="inputWrapper boxWrapper" v-if="pageData.TopProfessionCompetency.length">
          <div class="modal__box">
            <div class="modal__boxTitle">{{ pageData.TopProfessionCompetency.length ? pageData.TopProfessionCompetency[0].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[0].Competency) > 80 ? 'success' : parseInt(pageData.TopProfessionCompetency[0].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.Subjects.length ? parseInt(pageData.TopProfessionCompetency[0].Competency) : 0 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.TopProfessionCompetency.length ? pageData.TopProfessionCompetency[1].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[1].Competency) > 80 ? 'success' : parseInt(pageData.TopProfessionCompetency[1].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[1].Competency) : 3 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.TopProfessionCompetency.length ? pageData.TopProfessionCompetency[2].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[2].Competency) > 80 ? 'success' : parseInt(pageData.TopProfessionCompetency[2].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[2].Competency) : 0 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.TopProfessionCompetency.length ? pageData.TopProfessionCompetency[3].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[3].Competency) > 80 ? 'success' : parseInt(pageData.TopProfessionCompetency[3].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[3].Competency) : 3 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.TopProfessionCompetency.length ? pageData.TopProfessionCompetency[4].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[4].Competency) > 80 ? 'success' : parseInt(pageData.TopProfessionCompetency[4].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.TopProfessionCompetency.length ? parseInt(pageData.TopProfessionCompetency[4].Competency) : 3 }}</span>分
              </div>
            </div>
          </div>
        </div>
        <div class="modal__sectionSubtitle modal__sectionSubtitle--consequtive">不適職位Top5</div>
        <div class="inputWrapper boxWrapper" v-if="pageData.BottomProfessionCompetency.length">
          <div class="modal__box">
            <div class="modal__boxTitle">{{ pageData.BottomProfessionCompetency.length ? pageData.BottomProfessionCompetency[0].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[0].Competency) > 80 ? 'success' : parseInt(pageData.BottomProfessionCompetency[0].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[0].Competency) : 0 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.BottomProfessionCompetency.length ? pageData.BottomProfessionCompetency[1].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[1].Competency) > 80 ? 'success' : parseInt(pageData.BottomProfessionCompetency[1].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[1].Competency) : 3 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.BottomProfessionCompetency.length ? pageData.BottomProfessionCompetency[2].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[2].Competency) > 80 ? 'success' : parseInt(pageData.BottomProfessionCompetency[2].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[2].Competency) : 0 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.BottomProfessionCompetency.length ? pageData.BottomProfessionCompetency[3].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[3].Competency) > 80 ? 'success' : parseInt(pageData.BottomProfessionCompetency[3].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[3].Competency) : 3 }}</span>分
              </div>
            </div>
          </div>
          <div class="modal__box modal__box--consequtive">
            <div class="modal__boxTitle">{{ pageData.BottomProfessionCompetency.length ? pageData.BottomProfessionCompetency[4].Profession : 'Placeholder' }}</div>
            <div class="modal__boxContent">
              <div>
                <span class="modal__boxContentHighlight" :class="`modal__boxContentHighlight--${pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[4].Competency) > 80 ? 'success' : parseInt(pageData.BottomProfessionCompetency[4].Competency) >= 60 ? 'warning' : 'danger' : 'danger' }`">{{ pageData.BottomProfessionCompetency.length ? parseInt(pageData.BottomProfessionCompetency[4].Competency) : 3 }}</span>分
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__section model__section--consequtive">
        <div class="modal__sectionTitle">優勢職能</div>
        <div class="categoryDivider">
          <div class="categoryBox" v-if="pageData.Strengths.length >= 1">
            <div class="categoryTitle">
              <div class="catrgoryTitleText">{{ pageData.Strengths.length ? pageData.Strengths[0].Dimension : 'Placeholder'}}</div>
              <div class="categoryProgBar" :class="`categoryProgBar--${pageData.Strengths.length ? parseInt(pageData.Strengths[0].PR) > 80 ? 'success' : parseInt(pageData.Strengths[0].PR) >= 60 ? 'warning' : 'danger' : 'danger' }`">
                <div class="categoryProgBar__before" :style="{ width: `${pageData.Strengths.length ? 217 * ((100 - parseInt(pageData.Strengths[0].PR)) / 100).toString() : '100'}` + 'px'}"></div>
              </div>
              <div class="categoryNumber">{{ pageData.Strengths.length ? pageData.Strengths[0].PR : '00'}}</div>
            </div>
            <div class="categoryBody">
              <div class="categoryBody__title">{{ pageData.Strengths.length ? pageData.Strengths[0].Definition : 'Placeholder' }}</div>
              <div>
                {{ pageData.Strengths.length ? pageData.Strengths[0].Definition : 'Placeholder' }}
              </div>
            </div>
            <div class="categoryFooter">
              <div class="categoryBody__title">面談問題參考</div>
              <div>
                {{ recommendation(0, 'Strengths') }}
              </div>
              <div class="categoryFooter__pagination">
                <div class="categoryFooter__prev">&lt;&nbsp;</div>
                <div>{{ currentPages[0][0] }} / {{ currentPages[0][1] }}</div>
                <div class="categoryFooter__next">&nbsp;&gt;</div>
              </div>
            </div>
          </div>
          <div class="categoryBox categoryBox--consequtive" v-if="pageData.Strengths.length >= 2">
            <div class="categoryTitle">
              <div class="catrgoryTitleText">{{ pageData.Strengths.length ? pageData.Strengths[1].Dimension : 'Placeholder'}}</div>
              <div class="categoryProgBar" :class="`categoryProgBar--${pageData.Strengths.length ? parseInt(pageData.Strengths[1].PR) > 80 ? 'success' : parseInt(pageData.Strengths[1].PR) >= 60 ? 'warning' : 'danger' : 'danger' }`">
                <div class="categoryProgBar__before" :style="{ width: `${pageData.Strengths.length ? 217 * ((100 - parseInt(pageData.Strengths[1].PR)) / 100).toString() : '100'}` + 'px'}"></div>
              </div>
              <div class="categoryNumber">{{ pageData.Strengths.length ? pageData.Strengths[1].PR : '00'}}</div>
            </div>
            <div class="categoryBody">
              <div class="categoryBody__title">{{ pageData.Strengths.length ? pageData.Strengths[1].Definition : 'Placeholder' }}</div>
              <div>
                {{ pageData.Strengths.length ? pageData.Strengths[1].Definition : 'Placeholder' }}
              </div>
            </div>
            <div class="categoryFooter">
              <div class="categoryBody__title">面談問題參考</div>
              <div>
                {{ recommendation(0, 'Strengths') }}
              </div>
              <div class="categoryFooter__pagination">
                <div class="categoryFooter__prev">&lt;&nbsp;</div>
                <div>{{ currentPages[0][0] }} / {{ currentPages[0][1] }}</div>
                <div class="categoryFooter__next">&nbsp;&gt;</div>
              </div>
            </div>
          </div>
          <div class="categoryBox categoryBox--consequtive" v-if="pageData.Strengths.length >= 3">
            <div class="categoryTitle">
              <div class="catrgoryTitleText">{{ pageData.Strengths.length ? pageData.Strengths[2].Dimension : 'Placeholder'}}</div>
              <div class="categoryProgBar" :class="`categoryProgBar--${pageData.Strengths.length ? parseInt(pageData.Strengths[2].PR) > 80 ? 'success' : parseInt(pageData.Strengths[2].PR) >= 60 ? 'warning' : 'danger' : 'danger' }`">
                <div class="categoryProgBar__before" :style="{ width: `${pageData.Strengths.length ? 217 * ((100 - parseInt(pageData.Strengths[2].PR)) / 100).toString() : '100'}` + 'px'}"></div>
              </div>
              <div class="categoryNumber">{{ pageData.Strengths.length ? pageData.Strengths[2].PR : '00'}}</div>
            </div>
            <div class="categoryBody">
              <div class="categoryBody__title">{{ pageData.Strengths.length ? pageData.Strengths[2].Definition : 'Placeholder' }}</div>
              <div>
                {{ pageData.Strengths.length ? pageData.Strengths[2].Definition : 'Placeholder' }}
              </div>
            </div>
            <div class="categoryFooter">
              <div class="categoryBody__title">面談問題參考</div>
              <div>
                {{ recommendation(0, 'Strengths') }}
              </div>
              <div class="categoryFooter__pagination">
                <div class="categoryFooter__prev">&lt;&nbsp;</div>
                <div>{{ currentPages[0][0] }} / {{ currentPages[0][1] }}</div>
                <div class="categoryFooter__next">&nbsp;&gt;</div>
              </div>
            </div>
          </div>
          <div v-if="pageData.Strengths.length === 0">無</div>
        </div>
      </div>
      <div class="modal__section model__section--consequtive">
        <div class="modal__sectionTitle">劣勢職能</div>
        <div class="categoryDivider">
          <div class="categoryBox" v-if="pageData.Weaknesses.length >= 1">
            <div class="categoryTitle">
              <div class="catrgoryTitleText">{{ pageData.Weaknesses.length ? pageData.Weaknesses[0].Dimension : 'Placeholder'}}</div>
              <div class="categoryProgBar" :class="`categoryProgBar--${pageData.Weaknesses.length ? parseInt(pageData.Weaknesses[0].PR) > 80 ? 'success' : parseInt(pageData.Weaknesses[0].PR) >= 60 ? 'warning' : 'danger' : 'danger' }`">
                <div class="categoryProgBar__before" :style="{ width: `${pageData.Weaknesses.length ? 217 * ((100 - parseInt(pageData.Weaknesses[0].PR)) / 100).toString() : '100'}` + 'px'}"></div>
              </div>
              <div class="categoryNumber">{{ pageData.Weaknesses.length ? pageData.Weaknesses[0].PR : '00'}}</div>
            </div>
            <div class="categoryBody">
              <div class="categoryBody__title">{{ pageData.Weaknesses.length ? pageData.Weaknesses[0].Definition : 'Placeholder' }}</div>
              <div>
                {{ pageData.Weaknesses.length ? pageData.Weaknesses[0].Definition : 'Placeholder' }}
              </div>
            </div>
            <div class="categoryFooter">
              <div class="categoryBody__title">面談問題參考</div>
              <div>
                {{ recommendation(0, 'Weaknesses') }}
              </div>
              <div class="categoryFooter__pagination">
                <div class="categoryFooter__prev">&lt;&nbsp;</div>
                <div>{{ currentPages[0][0] }} / {{ currentPages[0][1] }}</div>
                <div class="categoryFooter__next">&nbsp;&gt;</div>
              </div>
            </div>
          </div>
          <div class="categoryBox categoryBox--consequtive" v-if="pageData.Weaknesses.length >= 2">
            <div class="categoryTitle">
              <div class="catrgoryTitleText">{{ pageData.Weaknesses.length ? pageData.Weaknesses[1].Dimension : 'Placeholder'}}</div>
              <div class="categoryProgBar" :class="`categoryProgBar--${pageData.Subjects.length ? parseInt(pageData.Weaknesses[1].PR) > 80 ? 'success' : parseInt(pageData.Weaknesses[1].PR) >= 60 ? 'warning' : 'danger' : 'danger' }`">
                <div class="categoryProgBar__before" :style="{ width: `${pageData.Subjects.length ? 217 * ((100 - parseInt(pageData.Weaknesses[1].PR)) / 100).toString() : '100'}` + 'px'}"></div>
              </div>
              <div class="categoryNumber">{{ pageData.Subjects.length ? pageData.Weaknesses[1].PR : '00'}}</div>
            </div>
            <div class="categoryBody">
              <div class="categoryBody__title">{{ pageData.Subjects.length ? pageData.Weaknesses[1].Definition : 'Placeholder' }}</div>
              <div>
                {{ pageData.Subjects.length ? pageData.Weaknesses[1].Definition : 'Placeholder' }}
              </div>
            </div>
            <div class="categoryFooter">
              <div class="categoryBody__title">面談問題參考</div>
              <div>{{ recommendation(0, 'Weaknesses') }}</div>
              <div class="categoryFooter__pagination">
                <div class="categoryFooter__prev">&lt;&nbsp;</div>
                <div>{{ currentPages[0][0] }} / {{ currentPages[0][1] }}</div>
                <div class="categoryFooter__next">&nbsp;&gt;</div>
              </div>
            </div>
          </div>
          <div class="categoryBox categoryBox--consequtive" v-if="pageData.Weaknesses.length >= 3">
            <div class="categoryTitle">
              <div class="catrgoryTitleText">{{ pageData.Weaknesses.length ? pageData.Weaknesses[2].Dimension : 'Placeholder'}}</div>
              <div class="categoryProgBar" :class="`categoryProgBar--${pageData.Weaknesses.length ? parseInt(pageData.Weaknesses[2].PR) > 80 ? 'success' : parseInt(pageData.Weaknesses[2].PR) >= 60 ? 'warning' : 'danger' : 'danger' }`">
                <div class="categoryProgBar__before" :style="{ width: `${pageData.Weaknesses.length ? 217 * ((100 - parseInt(pageData.Weaknesses[2].PR)) / 100).toString() : '100'}` + 'px'}"></div>
              </div>
              <div class="categoryNumber">{{ pageData.Weaknesses.length ? pageData.Weaknesses[2].PR : '00'}}</div>
            </div>
            <div class="categoryBody">
              <div class="categoryBody__title">{{ pageData.Weaknesses.length ? pageData.Weaknesses[2].Definition : 'Placeholder' }}</div>
              <div>
                {{ pageData.Weaknesses.length ? pageData.Weaknesses[2].Definition : 'Placeholder' }}
              </div>
            </div>
            <div class="categoryFooter">
              <div class="categoryBody__title">面談問題參考</div>
              <div>
                {{ recommendation(0, 'Weaknesses') }}
              </div>
              <div class="categoryFooter__pagination">
                <div class="categoryFooter__prev">&lt;&nbsp;</div>
                <div>{{ currentPages[0][0] }} / {{ currentPages[0][1] }}</div>
                <div class="categoryFooter__next">&nbsp;&gt;</div>
              </div>
            </div>
          </div>
          <div v-if="pageData.Weaknesses.length === 0">無</div>
        </div>
      </div>
      <div class="modal__section model__section--consequtive breakPage">
        <div class="modal__sectionTitle">分析與劣勢建議</div>
        <div class="inputWrapper boxWrapper">
          <div class="modal__pp" v-html="advice"></div>
        </div>
      </div>
    </div>
    <div class="modal__body modal__body--fullScreen" v-show="modalView === 1">
      <div class="modal__section modal__largeBanner">
        <div class="modal__radarGraph">
          <canvas id="radar"></canvas>
        </div>
        <div class="modal__radarGraphDesc">
          <div class="modal__radarGraphDescBody" v-if="pageData.Categories">
            <div class="categoryTitle" v-for="item in pageData.Categories" :key="item.CategoryCode">
              <div class="catrgoryTitleText">{{ item.Category }}</div>
              <div class="categoryProgBar" :class="`categoryProgBar--${item.Scale >= 4.5 ? 'success' : item.Scale >= 3 ? 'warning' : 'danger'}`"></div>
              <div class="categoryNumber">{{ item.Scale }}</div>
            </div>
          </div>
          <div class="modal__radarGraphDescBody" v-else>
            <div class="categoryTitle">
              <div class="catrgoryTitleText">Placeholder</div>
              <div class="categoryProgBar categoryProgBar--success"></div>
              <div class="categoryNumber">90</div>
            </div>
            <div class="categoryTitle">
              <div class="catrgoryTitleText">Placeholder</div>
              <div class="categoryProgBar categoryProgBar--success"></div>
              <div class="categoryNumber">90</div>
            </div>
            <div class="categoryTitle">
              <div class="catrgoryTitleText">Placeholder</div>
              <div class="categoryProgBar categoryProgBar--success"></div>
              <div class="categoryNumber">90</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__section model__section--consequtive">
        <div class="modal__sectionTitle">數據內容</div>
        <div class="inputWrapper">
            <table class="simpleTable simpleTable--small">
              <thead class="simpleTable__header">
                <tr>
                  <th class="simpleTable__headerCell">職能</th>
                  <th class="simpleTable__headerCell">
                    <div class="simpleTable__headerCellData">
                      <div class="simpleTable__headerCellDataBar simpleTable__headerCellDataBar--first">1</div>
                      <div class="simpleTable__headerCellDataBar">2</div>
                      <div class="simpleTable__headerCellDataBar">3</div>
                      <div class="simpleTable__headerCellDataBar">4</div>
                      <div class="simpleTable__headerCellDataBar">5</div>
                    </div>
                  </th>
                  <th class="simpleTable__headerCell"></th>
                  <th class="simpleTable__headerCell">職能說明</th>
                </tr>
              </thead>
              <div class="simpleTable__divider"></div>
              <tbody class="simpleTable__body" v-for="item in pageData.Categories" :key="item.CategoryCode">
                <tr class="simpleTable__titleRow">
                  <td class="simpleTable__titleCol" colspan="4">{{ item.Category }}</td>
                </tr>
                <tr class="simpleTable__row simpleTable__row--odd" v-for="row in item.Dimensions" :key="row.DimensionCode">
                  <td class="simpleTable__col">{{ row.Dimension }}</td>
                  <td class="simpleTable__col">
                    <div class="categoryProgBar categoryProgBar--long" :class="`categoryProgBar--${Number(row.Scale) >= 4.5 ? 'success' : Number(row.Scale) >= 3 ? 'warning' : 'danger' }`">
                      <div class="categoryProgBar__before" :style="{ width: 290 * (1 - (Number(row.Scale) / 6))  + 'px'}"></div>
                    </div>
                  </td>
                  <td class="simpleTable__col">{{ row.Scale.toFixed(1) }}</td>
                  <td class="simpleTable__col">{{ row.Definition }}</td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal__footer noPrint">
      <div class="modal__footerToolbar">
        <div class="btn btn--wide btn--lasso btn--rounded" style="margin-right:12px;" @click="handlePrint">列印</div>
        <div class="btn btn--wide btn--lassoOutlined btn--rounded" @click="handleCloseWindow">確定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { $axios } from '~/utils/api'
import { eventStopDefault } from '~/utils/helpers'

export default {
  middleware: ['auth'],
  data() {
    return {
      modalView: 0,
      pageData: {
        Subjects: [],
        Strengths: [],
        Credibility: [],
        Subjects: [],
        Weaknesses: [],
        Categories: [],
        TopProfessionCompetency: [],
        BottomProfessionCompetency: [],
        CurrentProfessionCompetency: {}

      },
      rowCount: 0,
      currentPages: {
        0: [1, 1],
        1: [1, 1],
        2: [1, 1],
        3: [1, 1],
        4: [1, 1],
        5: [1, 1],
      }
    }
  },
  computed: {
    nineBoxItem(index) {
      return (index) => {
        if(Object.keys(this.pageData.CurrentProfessionCompetency).length > 0) {
          let str = ''
          this.pageData.CurrentProfessionCompetency.NineBox[index].Dimensions.forEach(item => {
            str += item + '<br />'
          })
          return str
        } else {
          return ''
        }
      }
    },
    advice() {
      let str = ''
      if(this.pageData.Subjects.length) {
        this.pageData.Advice.forEach(item => {
        str += item
        str += '<br />'
       })
      }
      return str
    }
  },
  methods: {
    recommendation(index, type) {
      return this.pageData['Weaknesses'][0].QuestionsForInterview.reduce((prev, curr) => {
          prev += curr
          return prev
      }, '')
    },
    drawChart() {
      const chart = new CanvasJS.Chart("graph",
      {
        animationEnabled: true,
        data: [{
          type: "doughnut",
          startAngle: 60,
          innerRadius: 55,
          dataPoints: [
            { y: parseInt(this.pageData.CurrentProfessionCompetency.Competency), label: "", color: this.pageData.Subjects.length ? parseInt(this.pageData.CurrentProfessionCompetency.Competency) > 80 ? '#33a588' : parseInt(this.pageData.CurrentProfessionCompetency.Competency) >= 60 ? '#f5b537' : '#db5a5a' : '#db5a5a' },
            { y: parseInt(100 - parseInt(this.pageData.CurrentProfessionCompetency.Competency)) < 0 ? 0 : parseInt(100 - parseInt(this.pageData.CurrentProfessionCompetency.Competency)), color: '#f4f8f9' }
          ]
        }]
      });
      chart.render()
      return true
    },
    drawRadarChart() {
      const ctx = document.querySelector('#radar')
      const options = {
        legend: {
          display: false,
          boxWidth: 0
        },
        scale: {
          angleLines: {
              display: false
          },
          ticks: {
            beginAtZero: true,
            min: 1,
            max: 6,
            stepSize: 1
          },
          pointLabels: {
            fontSize: 15
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 80,
            top: 0,
            bottom: 0
          }
        }
      }
      const data = {
        labels: [
          "創新思維",
          "邏輯分析",
          "溝通表達",
          "解決方案",
          "關係建立",
          "客戶導向"
        ],
        datasets: [{
          label: "",
          backgroundColor: "rgba(200,0,0,0.2)",
          data: [1.5, 2, 3, 4, 5, 6],
          pointRadius: 6,
          borderWidth: 1
        }]
      }
      if(this.pageData.Categories.length > 0) {
        data.labels = this.pageData.Categories.map(item => item.Category)
        data.datasets[0].data = this.pageData.Categories.map(item => item.Scale)
      }
      const myRadarChart = new Chart(ctx, {
        type: 'radar',
        data,
        options
      });
    },
    handleCloseWindow() {
      window.close()
    },
    handlePrint($event) {
      eventStopDefault($event)
      this.processPrint()
    },
    processPrint() {
      window.print()
      return true
    },
    async sendGetAssessmentResultRequest() {
      try {
        const requestBody = {
          Conditions: [
            {
              SubjectId: this.$route.query.SubjectId,
              AssessmentId: this.$route.query.AssessmentId
            }
          ]
        }
        const result = await $axios.post('/Assessment/GetAssessmentResult', requestBody)
        return result
      } catch(e) {
        console.log(e)
      }
    },
    async init() {
      if(this.$route.query.SubjectId.toString() !== 'undefined' && this.$route.query.AssessmentId.toString() !== 'undefined') {
        try {
          const result = await this.sendGetAssessmentResultRequest()
          this.pageData = result.data.Results
          ? {
              ...result.data.Results[0],
              CurrentProfessionCompetency: { ...result.data.Results[0].CurrentProfesstionCompetency },
              TopProfessionCompetency: [ ...result.data.Results[0].TopProfesstionCompetency ],
              BottomProfessionCompetency: [ ...result.data.Results[0].BottumProfesstionCompetency ]
            }
          : []
          this.rowCount = result.data.Results ? result.data.RowCount : 0
        } catch (e) {
          // error
        }
      }
    }
  },
  async mounted() {
    await this.init()
    this.drawChart()
    this.drawRadarChart()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/utils/print';
::-webkit-scrollbar {
  display: none;
}
</style>

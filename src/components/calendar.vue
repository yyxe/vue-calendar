<template>
  <div class="date">
    <div class="month">
      <p>{{ currentYear }}年{{ currentMonth }}月</p>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <!-- 日期 -->
    <v-touch v-on:swipeleft="swipeleft" v-on:swiperight="swiperight" class="wrapper">
      <ul class="days">
        <li
          v-for="(day, index) in days"
          :key="index"
          :class="day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() === new Date().getDate() && isShow ? 'active' : activeIndex === index ? 'active' : day.getTime() > new Date().getTime() ? 'disabled' : ''"
          @click="handleClick(day, index)"
        >
          <div class="active-bold" v-if="day.getFullYear() === new Date().getFullYear() && day.getMonth() === new Date().getMonth() && day.getDate() === new Date().getDate()">
            {{ day.getDate() }}
          </div>
          <div
            v-else
            :class="day.getMonth()+1 !== currentMonth ? 'other-month' : ''"
          >
            {{ day.getDate() }}
          </div>
        </li>
      </ul>
    </v-touch>
  </div>
</template>

<script>

import {format, formatMouthDate, formatMouthDates} from '@/filters/filter'
// import store from '@/store/index.js'
export default {
  name: 'calendar',
  data () {
    return {
      currentYear: '', // 年份
      currentMonth: '', // 月份
      currentDay: '', // 日期
      currentWeek: '', // 星期
      days: [],
      activeIndex: -1,
      isShow: true
    }
  },
  methods: {
    goAttendanceTotal () {
      this.$router.push({path: '/attendanceTotal'})
    },

    /**
     * 点击切换日期 今日后不可点击
     */
    handleClick (day, index) {
      this.isShow = false
      if (day.getTime() <= new Date().getTime()) {
        this.activeIndex = index
        // store.commit('setReDate', formatMouthDates(day))
      }
    },
    /**
     * 格式化日期
     */

    formatDate (year, month, day) {
      const y = year
      let m = month
      if (m < 10) m = `0${m}`
      let d = day
      if (d < 10) d = `0${d}`
      return `${y}-${m}-${d}`
    },
    /**
     * 日期init
     */
    initData (cur) {
      let date = ''
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
        // store.commit('setReDate', formatMouthDates(date))
      }
      this.currentDay = date.getDate() // 今日日期 几号
      this.currentYear = date.getFullYear() // 当前年份
      this.currentMonth = date.getMonth() + 1 // 当前月份
      this.currentWeek = date.getDay() // 1...6,0 // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 0
      }
      const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
      this.days.length = 0
      // 第一天是周日，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek; i > 0; i -= 1) {
        const d = new Date(str)
        d.setDate(d.getDate() - i)
        this.days.push(d)
      }
      for (let i = 0; i <= 6 - this.currentWeek; i += 1) {
        const d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    },
    //  上个星期
    weekPre () {
      this.activeIndex = -1
      const d = this.days[0] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7)
      this.initData(d)
    },
    //  下个星期
    weekNext () {
      this.activeIndex = -1
      const d = this.days[6] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7)
      this.initData(d)
    },

    // 左滑动
    swipeleft () {
      this.activeIndex = -1
      this.weekNext()
    },

    // 右滑动
    swiperight () {
      this.activeIndex = -1
      this.weekPre()
    }
  },
  created () {
    this.initData(null)
  }
}
</script>

<style lang="less" scoped>
  .date {
    height: 140px;
    color: #333333;
    background-color: #ffffff;
    .month {
      text-align: center;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 14px;
      padding-right: 14px;
      p {
        font-size: 15px;
        font-weight: bold;
      }
    }
    .weekdays {
      display: flex;
      font-size: 14px;
      margin-top: 18px;
      li {
        flex: 1;
        font-size: 16px;
        text-align: center;
      }
    }
    .days {
      display: flex;
      margin-top: 12px;
      font-size: 20px;
      li {
        flex: 1;
        text-align: center;
        /*width: 48px;*/
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        /*pointer-events: none;*/
        div.other-month {
          color: #1495EB;
        }
      }
      li.disabled {
        pointer-events: none;
      }
      li.active {
        div {
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          color: #fff;
          border: 1px transparent solid;
          border-radius: 50%;
          background-color: #1495EB;
        }
      }
    }
    li div.active-bold {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      color: #1495EB;
      border-radius: 50%;
      border: 1px #1495EB solid;
    }
  }
</style>

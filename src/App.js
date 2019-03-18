import React, { Component } from 'react'
import './App.css'
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      today: new Date(),
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    }
  }
  renderRow = td => {
    return <tr>{td}</tr>
  }

  renderCalendar = (month, year) => {
    let first = new Date(year, month).getDay()
    let { days, today } = this.state
    let date = 1
    let arr = []
    let week = []
    for (let i = 0; i < 7; i++) {
      week.push(<td className="week">{days[i][0]}</td>)
    }
    week = this.renderRow(week)
    arr.push(week)
    console.log(today)
    console.log(month)
    console.log(year)
    const thisDay = new Date()
    for (let i = 0; i < 6; i++) {
      let row = []
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < first) {
          row.push(<td />)
        } else if (date > this.checkDate(month, year)) {
          break
        } else {
          if (
            date === thisDay.getDate() &&
            month === thisDay.getMonth() &&
            year === thisDay.getFullYear()
          ) {
            row.push(<td className="today">{date}</td>)
          } else {
            row.push(<td>{date}</td>)
          }
          date++
        }
      }
      row = this.renderRow(row)
      arr.push(row)
    }
    return arr
  }
  prev = () => {
    let today = new Date(
      this.state.today.setMonth(this.state.today.getMonth() - 1),
    )
    this.setState({ today })
  }
  next = () => {
    let today = new Date(
      this.state.today.setMonth(this.state.today.getMonth() + 1),
    )
    this.setState({ today })
  }
  checkDate = (month, year) => {
    let date = new Date(year, month + 1, 0).getDate()
    console.log('date', date, month, year)
    return date
  }
  render() {
    const { months, today } = this.state
    return (
      <div className="app">
        <div className="month-row">
          <button className="month-btn prev-btn" onClick={this.prev}>
            {'<'}
          </button>
          <div className="month">{`${
            months[today.getMonth()]
          } ${today.getFullYear()}`}</div>
          <button className="month-btn next-btn" onClick={this.next}>
            {'>'}
          </button>
        </div>
        <table>
          <tbody>
            {this.renderCalendar(today.getMonth(), today.getFullYear())}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App

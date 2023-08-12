import { useState } from 'react'
const StatisticLine = ({text, value}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const total = good + neutral + bad
    return(
        <tbody>
            <StatisticLine text={'good'} value={good}/>
            <StatisticLine text={'neutral'} value={neutral}/>
            <StatisticLine text={'bad'} value={bad}/>
            <StatisticLine text={'all'} value={total}/>
            <StatisticLine text={'average'} value={(good - bad)/total}/>
            <StatisticLine text={'positive'} value={(good/total)*100 + '%'}/>
        </tbody>
    )
}
const Button = ({handleClick, text}) => {
    return(
        <button onClick={handleClick}>{text}</button>
    )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  if (good + neutral + bad === 0) {
    return(
    <div>
        <h1>give feedback</h1>
        <div>
            <Button handleClick={handleGoodClick} text={"good"}/>
            <Button handleClick={handleNeutralClick} text={"neutral"}/>
            <Button handleClick={handleBadClick} text={"bad"}/>
        </div>
        <h1>statistics</h1>
        <p>No feedback given</p>
    </div>
    )
  }
  return (
    <div>
        <h1>give feedback</h1>
        <div>
            <Button handleClick={handleGoodClick} text={"good"}/>
            <Button handleClick={handleNeutralClick} text={"neutral"}/>
            <Button handleClick={handleBadClick} text={"bad"}/>
        </div>
        <h1>statistics</h1>
        <table>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </table>
    </div>
  )
}

export default App
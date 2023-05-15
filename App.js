import React, { useEffect, useState } from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Modal from "./components/Modal"
import Timer from "./components/Timer"

export default function App() {
  const { width, height } = useWindowSize()
  const [dies, setDies] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [modal, setModal] = useState(true)
  const [user, setUser] = useState({ name: "", best: 0 })
  const [timer, setTimer] = useState({ min: 0, sec: 0, count: 0 })


  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    if (tenzies) {
      setTimerOn(false)

    }
  }, [tenzies])

  useEffect(() => {

    let myTimeOut;
    if (timerOn) {
      myTimeOut = setTimeout(() => {
        setTimer(oldTimer => {
          let newTimer = { ...oldTimer };
          newTimer.count++;
          if (newTimer.count === 100) {
            newTimer.count = 0;
            newTimer.sec++;
          }
          if (newTimer.sec === 60) {
            newTimer.sec = 0;
            newTimer.min++;
          }
          // console.log("third")
          return newTimer;
        })
      }, 10)

    }
    else {
      clearTimeout(myTimeOut)
    }

  }, [timer, timerOn])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(
        generateNewDie()
      )
    }
    return newDice
  }
  function holdDice(id) {
    if (!timerOn) {

      setTimerOn(true)

    }
    setDies(oldDies =>
      oldDies.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die

      }))
  }
  function rollDice() {
    if (tenzies) {
      setTimer({ count: 0, min: 0, sec: 0 })
      setTenzies(false);
      setDies(allNewDice())

    }
    else {

      setDies(oldDies => oldDies.map((die) => {
        if (die.isHeld) {
          return die;
        }
        else {
          return generateNewDie()
        }
      }))
    }
  }
  function eventHandler(event) {
    const { name, value } = event.target;

    setUser(user => {
      return { ...user, [name]: value }
    })

  }

  const dieElements = dies.map((die, index) =>
    <Die
      id={die.id}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => holdDice(die.id)}
    />)

  useEffect(() => {
    const allHeld = dies.every(die => die.isHeld)
    const firstValue = dies[0].value
    const allSameValue = dies.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {

      setTenzies(true)

    }
  }, [dies])


  return (
    <main className="mx-auto flex flex-col items-center justify-around">
      {modal && <Modal name={user.name} eventHandler={eventHandler} toggle={() => setModal(false)} />}
      {tenzies && <Confetti height={height} width={width} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <Timer timer={timer} />
      <div className="die-container grid grid-cols-5 gap-4 ">
        {dieElements}
      </div>
      <button
        className="bg-[#5035FF] shadow-md text-white rounded-lg px-4 py-3 active:shadow-inner active:shadow-black	 focus:outline-none"
        onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}
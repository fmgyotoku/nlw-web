import { api } from "../lib/axios";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";

const availableDaysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

export function NewHabitForm() {
  const[title, setTitle] = useState('')
  const[daysOfWeek, setDaysOfWeek] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || daysOfWeek.length === 0) {
      return
    }

    console.log(title, daysOfWeek)

    await api.post('/habits', {
      title,
      daysOfWeek
    })

    alert('Habit created successfully!')
    setTitle("")
    setDaysOfWeek([])
  }

  function handleToggleDayOfWeek(dayOfWeek: number) {
    if (daysOfWeek.includes(dayOfWeek)) {
      const filteredDaysOfWeek = daysOfWeek.filter(day => day !== dayOfWeek)
      setDaysOfWeek(filteredDaysOfWeek)
    } else {
      const updatedDaysOfWeek = [...daysOfWeek, dayOfWeek]

      setDaysOfWeek(updatedDaysOfWeek)
    }
  }

  return (
    <form onSubmit={ createNewHabit } className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What's your commitment?
      </label>

      <input 
        type="text" 
        id="tittle" 
        placeholder="i.e.: Exercise, sleep well, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        onChange={event => setTitle(event.target.value)}
      />
      
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        What is the frequency?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {
          availableDaysOfWeek.map((dayOfWeek, index) => {
            return(
              <Checkbox.Root
                  key={dayOfWeek}
                  className="flex items-center gap-3 group focus:outline-none"
                  checked={daysOfWeek.includes(index)}
                  onCheckedChange={() => handleToggleDayOfWeek(index)}
              >
                <div 
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
                >
                  <Checkbox.Indicator>
                    <Check size={20} className="text-white" />
                  </Checkbox.Indicator>
                </div>
                <span className="text-white leading-tight">
                  {dayOfWeek}
                </span>
              </Checkbox.Root>
            )
          })
        }
      </div>

      <button type="submit" 
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  )
}

function userState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}

'use client'

import { useState } from 'react'

export default function Home() {
  const [expenses, setExpenses] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [weeksOff, setWeeksOff] = useState('')
  const [profitBuffer, setProfitBuffer] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    const monthlyExpenses = parseFloat(expenses)
    const hours = parseFloat(hoursPerWeek)
    const vacation = parseFloat(weeksOff)
    const buffer = parseFloat(profitBuffer)

    if (!monthlyExpenses || !hours || !vacation || !buffer) {
      alert('Please fill in all fields')
      return
    }

    const annualExpenses = monthlyExpenses * 12
    const workingWeeks = 52 - vacation
    const billableHours = workingWeeks * hours
    const withBuffer = annualExpenses * (1 + buffer / 100)
    const hourlyRate = withBuffer / billableHours

    setResult(hourlyRate.toFixed(2))
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Freelance Rate Calculator</h1>
        <p className="text-gray-500 text-sm mb-6">Find out what you should charge per hour</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
            <input
              type="number"
              value={expenses}
              onChange={e => setExpenses(e.target.value)}
              placeholder="e.g. 2000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Billable Hours Per Week</label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={e => setHoursPerWeek(e.target.value)}
              placeholder="e.g. 30"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weeks Off Per Year</label>
            <input
              type="number"
              value={weeksOff}
              onChange={e => setWeeksOff(e.target.value)}
              placeholder="e.g. 4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profit Buffer (%)</label>
            <input
              type="number"
              value={profitBuffer}
              onChange={e => setProfitBuffer(e.target.value)}
              placeholder="e.g. 20"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Calculate My Rate
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-600 font-medium">You should charge at least</p>
            <p className="text-4xl font-bold text-blue-700 mt-1">${result}<span className="text-lg font-medium">/hr</span></p>
          </div>
        )}
      </div>
    </main>
  )
}
'use client'

import { useState } from 'react'

export default function Home() {
  const [expenses, setExpenses] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [weeksOff, setWeeksOff] = useState('')
  const [profitBuffer, setProfitBuffer] = useState('')
  const [result, setResult] = useState(null)
  const [currency, setCurrency] = useState('$')
  const [dark, setDark] = useState(false)

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
    <main className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`rounded-2xl shadow-md p-8 w-full max-w-md transition-colors duration-300 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
        
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDark(!dark)}
            className={`text-sm px-3 py-1 rounded-full border transition-colors duration-300 ${dark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-500 hover:bg-gray-100'}`}
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <h1 className={`text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-800'}`}>Freelance Rate Calculator</h1>
        <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Find out what you should charge per hour</p>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Expenses</label>
            <input
              type="number"
              value={expenses}
              onChange={e => setExpenses(e.target.value)}
              placeholder="e.g. 2000"
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Billable Hours Per Week</label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={e => setHoursPerWeek(e.target.value)}
              placeholder="e.g. 30"
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Weeks Off Per Year</label>
            <input
              type="number"
              value={weeksOff}
              onChange={e => setWeeksOff(e.target.value)}
              placeholder="e.g. 4"
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Profit Buffer (%)</label>
            <input
              type="number"
              value={profitBuffer}
              onChange={e => setProfitBuffer(e.target.value)}
              placeholder="e.g. 20"
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            >
              <option value="$">$ - US Dollar</option>
              <option value="€">€ - Euro</option>
              <option value="£">£ - British Pound</option>
              <option value="₺">₺ - Turkish Lira</option>
              <option value="¥">¥ - Japanese Yen</option>
            </select>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Calculate My Rate
          </button>
        </div>

        {result && (
          <div className={`mt-6 border border-blue-200 rounded-xl p-4 ${dark ? 'bg-gray-900' : 'bg-blue-50'}`}>
            <div className={`space-y-2 mb-4 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex justify-between">
                <span>Annual expenses</span>
                <span className="font-medium">{currency}{(parseFloat(expenses) * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>With {profitBuffer}% buffer</span>
                <span className="font-medium">{currency}{(parseFloat(expenses) * 12 * (1 + parseFloat(profitBuffer) / 100)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Billable hours/year</span>
                <span className="font-medium">{((52 - parseFloat(weeksOff)) * parseFloat(hoursPerWeek)).toLocaleString()}</span>
              </div>
              <div className="border-t border-blue-200 pt-2 mt-2"></div>
            </div>
            <div className="text-center">
              <p className={`text-sm font-medium ${dark ? 'text-blue-400' : 'text-blue-600'}`}>You should charge at least</p>
              <p className={`text-4xl font-bold mt-1 ${dark ? 'text-blue-400' : 'text-blue-700'}`}>{currency}{result}<span className="text-lg font-medium">/hr</span></p>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
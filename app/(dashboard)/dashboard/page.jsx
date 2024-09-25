'use client'
import FormatNumber from '@/components/FormatNumber'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { format } from 'date-fns'

const page = () => {
  const { data: session } = useSession()
  const [reports, setReports] = useState(null)
  const [payroll, setPayroll] = useState(null)
  const [nextpayroll, setNextPayroll] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const res = async () => {
      const data = await axios.post('/api/reports', { data: { code: session.user.companyCode, email: session.user.email } })
      const res = data.data.ChartData

      setReports(res.CostPerDepertment)
      setPayroll(res.lastPayment)
      setNextPayroll(res.nextpayroll)
    }
    if (session?.user?.companyCode) {
      res()
    }
  }, [session?.user?.companyCode])

  const totalSalaryallDepertements = reports?.reduce((acc, r) => acc + r.totalSalary, 0) || 0

  const departmentColors = {
    HR: '#37BFFA',
    Finance: '#FF96A3',
    IT: '#F6B27A',
    Sales: '#BDB4FD',
    Marketing: '#EFABFD'
  }

  console.log(payroll)

  return (
    <div>
      <div className='flex items-center justify-center font-semibold text-2xl pt-5'><h1 className='px-6 py-3 rounded-2xl w-fit bg-[#0C1A25]'>{session?.user?.companyName}</h1></div>

      <div className='flex w-full gap-10 justify-between mt-5 flex-col xl:flex-row'>
        {/* list for salary */}
        <div className='border-2 p-3 rounded-md border-[#181920] flex-1'>
          <h2 className='text-gray-300 py-3'>Cost per depertment</h2>
          <div className='flex gap-2 flex-col pt-2'>
            {
              reports?.map((r) => {
                const percentage = totalSalaryallDepertements ? (r.totalSalary / totalSalaryallDepertements) * 100 : 0

                const departmentColor = departmentColors[r.employType] || '#ccc';

                return (
                  <div className='relative bg-[#181920] p-1 rounded-md text-black font-semibold' key={r.employType}>
                    {/* Bar as background based on department */}
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: departmentColor,
                        zIndex: 0,
                        opacity: 0.7
                      }}
                    />
                    <div className="relative flex justify-between items-center z-10 p-1">
                      <h3>{r.employType}</h3>
                      <p className='text-white'><FormatNumber num={r.totalSalary} /></p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* list for  payroll */}
        <div className='flex flex-col gap-5'>
          <div className='border-2 px-2 py-3 border-[#181920] rounded-xl lg:w-[24rem] xl:w-[30rem] 2xl:w-[30rem]'>
            <h6 className='pb-2 text-gray-300 py-2'>Last Payroll </h6>
            <div className='flex items-center justify-between '>
              <div className='flex gap-5'>
                <img className='w-14 rounded-xl object-cover' src={payroll?.payment?.img} alt="" />
                <div>
                  <h3 className='text-lg'>{payroll?.payment?.name}</h3>
                  <h3><FormatNumber num={payroll?.payment?.salary} /></h3>
                </div>
              </div>
              <button onClick={() => router.push('/dashboard/payments')} className='border-2 rounded-full border-[#181920] p-1'><MdKeyboardArrowRight size={30} color='gray' /></button>
            </div>
          </div>
          <div className='border-2 px-2 py-3 border-[#181920] rounded-xl lg:w-[24rem] xl:w-[30rem] 2xl:w-[30rem]'>
            <h6 className='pb-2 text-gray-300 py-2'>Next Payroll </h6>
            <div className='flex items-center justify-between '>
              <div className='flex gap-3 items-center'>
                  <FaCalendar size={20} color='gray'/>
                  <h1 className='text-xl'>{format(nextpayroll, 'MMMM d, yyyy') }</h1>
              </div>
              <button onClick={() => router.push('/dashboard/payments')} className='border-2 rounded-full border-[#181920] p-1'><MdKeyboardArrowRight size={30} color='gray' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
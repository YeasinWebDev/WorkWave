'use client'
import FormatNumber from '@/components/FormatNumber'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { format } from 'date-fns'
import Loader from '@/components/Loader'

import { IoMdPeople } from "react-icons/io";
import { MdSignalWifi2BarLock, MdHealthAndSafety } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";

const page = () => {
  const { data: session, status } = useSession()
  const [reports, setReports] = useState(null)
  const [payroll, setPayroll] = useState(null)
  const [compliance, setCompliance] = useState(null)
  const [user, setUser] = useState(null)
  const [nextpayroll, setNextPayroll] = useState(null)
  const [loading, setloading] = useState(false)
  const router = useRouter()

  const fetchData = async () => {
    try {
      setloading(true);
      const response = await axios.post('/api/reports', {
        data: { code: session?.user.companyCode, email: session?.user.email }
      });
      const resData = await response.data.ChartData;

      setReports(resData?.CostPerDepertment);
      setPayroll(resData?.lastPayment);
      setNextPayroll(resData?.nextpayroll);
      setCompliance(resData?.compliance);
      setUser(resData?.recentlyJoinedUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchData();
    }
  }, [session,status]);



  const totalSalaryallDepertements = reports?.reduce((acc, r) => acc + r.totalSalary, 0) || 0

  const departmentColors = {
    HR: '#37BFFA',
    Finance: '#FF96A3',
    IT: '#F6B27A',
    Sales: '#BDB4FD',
    Marketing: '#EFABFD'
  }

  if (loading || status === "loading") {
    return <Loader />
  }


  return loading ? <Loader /> : (
    <div>
      <div className='flex items-center justify-center font-semibold text-2xl pt-5'><h1 className='px-6 py-3 rounded-2xl w-fit bg-[#0C1A25]'>{session?.user?.companyName}</h1></div>

      <div className='flex w-full gap-10 justify-between mt-5 flex-col xl:flex-row'>
        <div className='flex-1 flex flex-col gap-3'>
          {/* list for salary */}
          <div className='border-2 p-3 rounded-md border-[#181920] '>
            <h2 className='text-gray-300 py-3'>Cost per depertment</h2>
            <div className='flex gap-2 flex-col pt-2'>
              {
                reports?.map((r) => {
                  const percentage = totalSalaryallDepertements ? (r?.totalSalary / totalSalaryallDepertements) * 100 : 0

                  const departmentColor = departmentColors[r?.employType] || '#ccc';

                  return (
                    <div className='relative bg-[#181920] p-1 rounded-md text-black font-semibold' key={r?.employType}>
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
                        <h3>{r?.employType}</h3>
                        <p className='text-white'><FormatNumber num={r?.totalSalary} /></p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* recent user */}
          <div className='border-2 p-3 rounded-md border-[#181920] mb-2'>
            <div className='flex items-center justify-between pb-4'>
              <h2 className='text-gray-300 py-3'>Recently Joined</h2>
              <button onClick={() => router.push('/dashboard/people')} className='border-2 rounded-full border-[#181920] p-1'><MdKeyboardArrowRight size={30} color='gray' /></button>
            </div>

            <div className='flex flex-col gap-2 items-start'>
              {
                user?.map((u) => (
                  <div key={u?._id} className={`flex gap-3 items-center justify-between w-full ${u !== user[user?.length - 1] ? "border-b-[1px]" : 'border-b-0'} border-[#181920] pb-1`}>
                    <div className='flex items-center gap-3'>
                      <img className='w-10 h-10 rounded-full object-cover' src={u?.imgUrl} alt="" />
                      <div>
                        <h3 className='text-lg'>{u?.name}</h3>
                        <p className='text-gray-500'>{u?.employType}</p>
                      </div>
                    </div>
                    <div>
                      <h6>Joining Date</h6>
                      <h6 className='text-gray-500'>{u?.joiningDate}</h6>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        {/* list for  payroll  and Compliance*/}
        <div className='flex flex-col gap-3'>
          <div className='border-2 px-4 py-3 border-[#181920] rounded-md lg:w-full xl:w-[30rem] 2xl:w-[30rem]'>
            <h6 className='pb-2 text-gray-300 py-2'>Last Payroll </h6>
            <div className='flex items-center justify-between '>
              <div className='flex gap-5'>
                <img className='w-14 rounded-md object-cover' src={payroll?.payment?.img} alt="" />
                <div>
                  <h3 className='text-lg'>{payroll?.payment?.name}</h3>
                  <h3><FormatNumber num={payroll?.payment?.salary} /></h3>
                </div>
              </div>
              <button onClick={() => router.push('/dashboard/payments')} className='border-2 rounded-full border-[#181920] p-1'><MdKeyboardArrowRight size={30} color='gray' /></button>
            </div>
          </div>
          <div className='border-2 px-4 py-3 border-[#181920] rounded-md lg:w-full xl:w-[30rem] 2xl:w-[30rem]'>
            <h6 className='pb-2 text-gray-300 py-2'>Next Payroll </h6>
            <div className='flex items-center justify-between '>
              <div className='flex gap-3 items-center'>
                <FaCalendar size={20} color='gray' />
                <h1 className='text-xl'>{format(nextpayroll, 'MMMM d, yyyy')}</h1>
              </div>
              <button onClick={() => router.push('/dashboard/payments')} className='border-2 rounded-full border-[#181920] p-1'><MdKeyboardArrowRight size={30} color='gray' /></button>
            </div>
          </div>
          {/* compliance */}
          <div className='border-2 px-4 py-3 border-[#181920] rounded-md lg:w-full xl:w-[30rem] 2xl:w-[30rem]'>
            <div className='flex items-center justify-between'>
              <h6 className='pb-2 text-gray-300 py-2'>Compliance Update </h6>
              <button onClick={() => router.push('/dashboard/compliance')} className='border-2 rounded-full border-[#181920] p-1'><MdKeyboardArrowRight size={30} color='gray' /></button>
            </div>

            {
              compliance?.map((compliance) => (
                <div key={compliance?._id} className='flex gap-4 items-center justify-start py-3'>
                  <div className={`p-2 rounded-full ${compliance?.category === 'Labor Laws' ? 'bg-orange-200' : compliance?.category === 'Data Protection' ? 'bg-blue-200' : compliance?.category === 'Health & Safety' ? 'bg-orange-200' : compliance?.category === 'Health Insurance' ? 'bg-green-200' : 'bg-orange-200'}`}>
                    {compliance?.category === 'Labor Laws' ? <IoMdPeople className='text-orange-900' size={25} />
                      : compliance?.category === 'Data Protection' ? <MdSignalWifi2BarLock className='text-blue-900' size={25} />
                        : compliance?.category === 'Health & Safety' ? <MdHealthAndSafety className='text-orange-900' size={25} />
                          : compliance?.category === 'Health Insurance' ? <RiMentalHealthFill className='text-orange-900' size={25} />
                            : <BsPersonWorkspace className='text-green-900' size={25} />
                    }
                  </div>
                  <div className='border-b-[1px] border-[#181920] w-full pb-2'>
                    <h2 className="text-lg font-semibold text-gray-100">{compliance?.title}</h2>
                    <div className='flex items-center justify-start gap-2'>
                      <h6 className='text-[14px] flex items-center gap-2 text-gray-300'>{compliance?.priority === "High" ? <FcHighPriority size={23} /> : compliance?.priority === 'Medium' ? <FcMediumPriority size={23} /> : <FcLowPriority size={23} />} <span className='border-[1px] p-1 border-[#181920] rounded-lg'>{compliance?.priority}</span></h6>
                      <p className='text-[12px] text-gray-500'>Due Date: {new Date(compliance?.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )) || <p>No compliance updates yet.</p>
            }

          </div>
        </div>

      </div>
    </div>
  )
}

export default page
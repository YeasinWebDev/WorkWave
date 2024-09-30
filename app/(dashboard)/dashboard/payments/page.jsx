"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { checkoutOrder } from '@/app/api/checkoutorder/checkout';
import { isEqual, parseISO, isBefore } from 'date-fns';
import FormatNumber from '@/components/FormatNumber';
import Loader from '@/components/Loader';

const Payments = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession()
  const [employ, setEmploy] = useState('')
  const [status, setStatus] = useState('')


  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await axios.get('/api/employee/allemployee');
        let payrollData = response.data

        // update status
        const currentDate = new Date()

        const updatedpayroll = await Promise.all(
          payrollData.map(async (payroll) => {
            const payrollDate = parseISO(payroll.nextPayrollDate)

            if ((isBefore(payrollDate, currentDate) || isEqual(payrollDate, currentDate)) && payroll.status === 'complete') {
              console.log('inside')
              await axios.post('/api/employee/updatePayrollStatus', {
                email: payroll.email,
                status: 'pending'
              })
              payroll.status = 'Pending';
            }

            return payroll
          })
        )
        setPayrolls(updatedpayroll)
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch payroll data.');
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, []);

  const handleProcessPayroll = async (payroll) => {

    try {
      const payment = {
        paymentBy: session?.user?.email,
        name: payroll.name,
        email: payroll.email,
        img: payroll.imgUrl,
        salary: payroll.salary,
        payrollDate: payroll.nextPayrollDate
      }
      checkoutOrder(payment)
    } catch (err) {
      toast.error('Failed to process payroll.');
    }
  };

  if (loading) return <Loader/>;
  if (error) return <div className="text-red-500">{error}</div>;

  const totalPayroll = payrolls.reduce((a, r) => (a + r.salary), 0)
  const duePayroll = payrolls.filter(e => e.status === 'Pending').reduce((a, r) => (a + r.salary), 0)
  console.log(payrolls)

  const filterdate = employ ? payrolls.filter(e => e.employType  === employ)  : status ? payrolls.filter(e => e.status  === status) : payrolls

  return (
    <div className=" py-20 flex items-center flex-col rounded-xl gap-3">
      <h1 className="text-2xl font-bold text-white">Payments</h1>
      <div className='flex items-center gap-3'>
        <h2 className="text-gray-300 py-3 border-[1px] border-[#181920] p-2 rounded">Total: <span className='bg-[#0C1A25] p-2 rounded mx-3'><FormatNumber num={totalPayroll} /></span></h2>
        <h2 className="text-gray-300 py-3 border-[1px] border-[#181920] p-2 rounded">Due: <span className='bg-[#0C1A25] p-2 rounded mx-3'><FormatNumber num={duePayroll} /></span></h2>
        
          <div className='flex items-center gap-2 border-[1px] border-[#181920] p-2 rounded'>
            <label className="block text-sm font-medium text-gray-300">Depertment:</label>
            <select
              value={employ}
              onChange={(e) => {setEmploy(e.target.value) , setStatus('')}}
              className="mt-1 block w-full p-1 rounded-md bg-[#181920] text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select an option</option>
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Customer Support">Customer Support</option>
            </select>
          </div>

          <div className='flex items-center gap-2 border-[1px] border-[#181920] p-2 rounded'>
            <label className="block text-sm font-medium text-gray-300">Status:</label>
            <select
              value={status}
              onChange={(e) => {setStatus(e.target.value) ,setEmploy('')}}
              className="mt-1 block w-full p-1 rounded-md bg-[#181920] text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select an option</option>
              <option value="Pending">Pending</option>
              <option value="complete">Complete</option>
            </select>
          </div>

        </div>
        

      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr className='font-semibold text-white text-lg'>
              <th></th>
              <th> Email</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Next Payroll</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterdate.map((payroll, i) => (
              <tr key={i} className='text-lg text-gray-400'>
                <td>{i + 1}</td>
                <td>{payroll.email}</td>
                <td>{payroll.salary}</td>
                <td className={` ${payroll.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {payroll.status}
                </td>
                <td>{payroll.nextPayrollDate}</td>
                <td>
                  <button
                    onClick={() => handleProcessPayroll(payroll)}
                    disabled={payroll.status !== 'Pending'}
                    className={`py-1 px-3 rounded ${payroll.status === 'Pending'
                      ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'}`}
                  >
                    Process Payroll
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;

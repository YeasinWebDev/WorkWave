"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { checkoutOrder } from '@/app/checkoutorder/checkout';
import { format, isEqual, isAfter, parseISO, isBefore } from 'date-fns';

const Payments = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {data:session} = useSession()


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

            if((isBefore(payrollDate, currentDate) || isEqual(payrollDate, currentDate)) && payroll.status === 'complete'){
              console.log('inside')
              await axios.post('/api/employee/updatePayrollStatus',{
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
      const payment ={
        paymentBy: session?.user?.email,
        name:payroll.name,
        email:payroll.email,
        img:payroll.imgUrl,
        salary: payroll.salary,
        payrollDate:payroll.nextPayrollDate
      }
      checkoutOrder(payment)
    } catch (err) {
      toast.error('Failed to process payroll.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;


  const isPayrollDateEligible = (date) =>{
    const currentDate = new Date();
    const payrollDate = parseISO(date);
    
    return isEqual(currentDate, payrollDate) || isBefore(payrollDate,currentDate );
  }

  return (
    <div className=" py-20 flex items-center flex-col rounded-xl gap-3">
      <h1 className="text-2xl font-bold text-white">Payments</h1>

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
            {payrolls.map((payroll, i) => (
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
                    disabled={!payroll.status === 'Pending'}
                    className={`py-1 px-3 rounded ${ payroll.status === 'Pending'
                      ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-200'}`}
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

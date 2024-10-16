'use client'
import ComplianceCard from '@/components/dashboard/ComplianceCard'
import DashHero from '@/components/dashboard/DashHero'
import EditComplianceModal from '@/components/dashboard/EditComplianceModal'
import Loader from '@/components/Loader'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiPlus } from "react-icons/fi";

const page = () => {
  const [data, setData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [reload, setreload] = useState(false)
  const { data: session } = useSession()

  const fetchData = async () => {
    if (session?.user?.companyCode) {
      try {
        const res = await axios.post('/api/compliance', { code: session?.user?.companyCode });
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [session, reload]);

  const HandleCreate = async(data) => {
    const newData = {...data, createdBy:session.user.email, companyCode:session.user.companyCode}
    
    const newCompliance = await axios.post('/api/compliance/createCompliance',{data:newData})
    if(newCompliance.status === 200){
      toast.success('New Compliance Added Successfully');
      setreload(pev => !pev);
    }else{
      toast.error('Failed to Add New Compliance');
    }
    setIsModalOpen(false);
  }

  return loading ? <Loader /> : (
    <div className='relative'>
      <DashHero text='Compliance' />
      <div className='p-2 absolute right-0 mr-10 xl:mr-14 border-[1px] w-fit rounded-full select-bordered cursor-pointer' onClick={() => setIsModalOpen(true)}>
        <FiPlus size={28} color='gray' />
      </div>
      <div className="flex flex-wrap justify-center gap-6 pt-20">
        {data ? data?.map((compliance, index) => (
          <ComplianceCard key={index} compliance={compliance} setreload={setreload} />
        )) : <h1>No Data found</h1>}
      </div>
      <EditComplianceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={HandleCreate}
      />
    </div>
  )
}

export default page
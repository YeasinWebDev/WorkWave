'use client'

import DashHero from '@/components/dashboard/DashHero'
import Model from '@/components/dashboard/Model'
import Loader from '@/components/Loader'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const People = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  const employTypeOrder = ['IT', 'Sales', 'Marketing', 'Finance', 'Customer Support'];

  // Fetch employee data
  const fetchData = async () => {
    const res = await axios.get('/api/employee/allemployee');
    setEmployee(res.data);
    setFilteredEmployee(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSortType('')
    const filtered = employee?.filter((e) =>
      e.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredEmployee(filtered);
  };

  // Custom sort for employType
  const handleSort = (event) => {
    const sortBy = event.target.value;
    setSortType(sortBy)
    if (sortBy === '') {
      setFilteredEmployee(employee);
    }else{
      const filterdata = employee?.filter(e => e.employType === sortBy)
      setFilteredEmployee(filterdata);
    }
  };

  return loading? <Loader/> : (
    <div>
      <DashHero text={'People'} />
      <div>
        <div className="mb-4 flex items-center justify-center gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name"
            className="input input-bordered w-full max-w-xs bg-transparent text-white"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Sort Dropdown */}
          <select
            value={sortType}
            onChange={handleSort}
            className="select select-bordered w-full max-w-xs bg-transparent"
          >
            <option value="" className='bg-black text-white'>Sort by Depertment</option>
            {employTypeOrder?.map((e,i)=>(<option key={i} value={e} className='bg-black text-white'>{e}</option>))}
          </select>
        </div>

        <div>
          {filteredEmployee.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                {/* Table Head */}
                <thead>
                  <tr className="text-white font-semibold text-xl">
                    <th></th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Job</th>
                    <th>Salary(BDT)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table Body */}
                  {filteredEmployee?.map((e, i) => (
                    <tr key={e?._id} className="text-lg text-gray-400">
                      <td>{i + 1}</td>
                      <td>
                        <img
                          src={e?.imgUrl}
                          alt={e?.name}
                          className="rounded-full object-cover w-12 h-12"
                        />
                      </td>
                      <td>{e?.name}</td>
                      <td>{e?.email}</td>
                      <td>{e?.employType}</td>
                      <td>{e?.salary}</td>
                      <td>
                        <Model employee={e} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No employees found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default People;

// components/ComplianceCard.js
import React, { useState } from 'react';
import { IoMdPeople } from "react-icons/io";
import { MdSignalWifi2BarLock, MdHealthAndSafety, MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { useSession } from 'next-auth/react';
import EditComplianceModal from './EditComplianceModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const ComplianceCard = ({ compliance , setreload}) => {
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusColor = compliance.status === 'Pending' ? 'text-yellow-500' : compliance.status === 'In Progress' ? 'text-blue-400' : 'text-green-400';
    const priorityColor = compliance.priority === 'High' ? 'text-red-500' : compliance.priority === 'Medium' ? 'text-yellow-400' : 'text-green-400';
    const complianceLevelColor = compliance.complianceLevel === 'Critical' ? 'text-red-500' : compliance.complianceLevel === 'Major' ? 'text-orange-400' : 'text-green-400';

    const handleEdit = async(editedCompliance) => {
        const res = await axios.post('/api/compliance/updateCompliance', {editedCompliance, id: editedCompliance._id})
        if(res.status === 200) {
            toast.success('Compliance updated successfully');
            setreload(pev => !pev);
        }
        setIsModalOpen(false);
    };

    const handleDelete = async(id) => {
        const res = await axios.post('/api/compliance/deleteCompliance', {id})
        if(res.status === 200) {
            toast.success('Compliance deleted successfully');
            setreload(pev =>!pev);
        }
    };

    return (
        <>
            <div className="bg-[#16232E] shadow-md rounded-lg p-6 mb-6 w-full md:w-[46%] xl:w-[30%] transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
                <div className='flex justify-between items-center pb-2'>
                    <div className={`p-2 rounded-full ${compliance.category === 'Labor Laws' ? 'bg-orange-200' : compliance.category === 'Data Protection' ? 'bg-blue-200' : compliance.category === 'Health & Safety' ? 'bg-orange-200' : compliance.category === 'Health Insurance' ? 'bg-green-200' : 'bg-orange-200'}`}>
                        {compliance.category === 'Labor Laws' ? <IoMdPeople className='text-orange-900' size={25} />
                            : compliance.category === 'Data Protection' ? <MdSignalWifi2BarLock className='text-blue-900' size={25} />
                                : compliance.category === 'Health & Safety' ? <MdHealthAndSafety className='text-orange-900' size={25} />
                                    : compliance.category === 'Health Insurance' ? <RiMentalHealthFill className='text-orange-900' size={25} />
                                        : <BsPersonWorkspace className='text-green-900' size={25} />
                        }
                    </div>
                    <div>
                        {session?.user?.email === compliance.createdBy ? (
                            <div className='flex items-center justify-center gap-3'>
                                <button onClick={() => setIsModalOpen(true)} className='border-2 p-2 rounded-full border-green-800'><MdOutlineEdit size={20} color='green' /></button>
                                <button onClick={() => handleDelete(compliance._id)} className='border-2 p-2 rounded-full border-red-600'><MdDeleteOutline size={20} color='red' /></button>
                            </div>
                        ) : ''}
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-100 mb-4">{compliance.title}</h2>
                <div className="space-y-3 text-gray-300">
                    <p className="text-sm"><span className="font-bold">Category:</span> {compliance.category}</p>
                    <p className="text-sm"><span className="font-bold">Description:</span> {compliance.description}</p>
                    <p className={`text-sm ${statusColor}`}><span className="font-bold text-gray-200">Status:</span> {compliance.status}</p>
                    <p className={`text-sm ${priorityColor}`}><span className="font-bold text-gray-200">Priority:</span> {compliance.priority}</p>
                    <p className="text-sm"><span className="font-bold">Due Date:</span> {new Date(compliance.dueDate).toLocaleDateString()}</p>
                    <p className={`text-sm ${complianceLevelColor}`}><span className="font-bold text-gray-200">Compliance Level:</span> {compliance.complianceLevel}</p>
                    <p className="text-sm"><span className="font-bold">Action Plan:</span> {compliance.actionPlan}</p>
                    <p className="text-sm"><span className="font-bold">Assigned to:</span> {compliance.assignedTo}</p>
                </div>


            </div>
            <EditComplianceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                compliance={compliance}
                onSave={handleEdit}
            />
        </>
    );
};

export default ComplianceCard;

import React, { useState, useEffect } from 'react';

const EditComplianceModal = ({ isOpen, onClose, compliance, onSave }) => {
    const [editedCompliance, setEditedCompliance] = useState({});
    const categories = ['Labor Laws', 'Data Protection', 'Health & Safety', 'Health Insurance', 'Employee Training'];

    useEffect(() => {
        if (compliance) {
            setEditedCompliance(compliance);
        } else {
            setEditedCompliance({
                title: '',
                description: '',
                dueDate: '',
                status: 'Pending',
                priority: 'Medium',
                complianceLevel: 'State',
                actionPlan: '',
                assignedTo: '',
                category: categories[0]
            });
        }
    }, [compliance,isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCompliance((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedCompliance);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#07090F] bg-opacity-70 z-50">
            <div className="bg-[#1E2A38] rounded-lg px-6 py-3 w-full max-w-2xl mx-4 shadow-lg overflow-y-auto max-h-screen z-50">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">{compliance ? 'Edit Compliance' : 'Create Compliance'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-1">
                    {/* Title Input */}
                    <div className="mb-5 col-span-2">
                        <label className="block text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editedCompliance?.title}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white placeholder-gray-400 focus:outline-none border-gray-600"
                            placeholder="Enter compliance title"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="mb-5 col-span-2">
                        <label className="block text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={editedCompliance?.description}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white placeholder-gray-400 focus:outline-none border-gray-600"
                            placeholder="Enter compliance description"
                        />
                    </div>

                    {/* Due Date Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 mb-2">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={editedCompliance?.dueDate?.split('T')[0] || ''}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white focus:outline-none border-gray-600"
                        />
                    </div>

                    {/* Status Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 mb-2">Status</label>
                        <select
                            name="status"
                            value={editedCompliance?.status}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white focus:outline-none border-gray-600"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Compliant">Compliant</option>
                        </select>
                    </div>

                    {/* Priority Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 mb-2">Priority</label>
                        <select
                            name="priority"
                            value={editedCompliance?.priority}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white focus:outline-none border-gray-600"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    {/* Compliance Level Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 mb-2">Compliance Level</label>
                        <select
                            name="complianceLevel"
                            value={editedCompliance?.complianceLevel}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white focus:outline-none border-gray-600"
                        >
                            <option value="State">State</option>
                            <option value="International">International</option>
                            <option value="National">National</option>
                        </select>
                    </div>

                    {/* Action Plan Input */}
                    <div className="mb-5 col-span-2">
                        <label className="block text-gray-300 mb-2">Action Plan</label>
                        <textarea
                            name="actionPlan"
                            value={editedCompliance?.actionPlan}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white placeholder-gray-400 focus:outline-none border-gray-600"
                            placeholder="Enter action plan"
                        />
                    </div>

                    {/* Assigned To Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 mb-2">Assigned To</label>
                        <input
                            type="text"
                            name="assignedTo"
                            value={editedCompliance?.assignedTo}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white placeholder-gray-400 focus:outline-none border-gray-600"
                            placeholder="Assigned person"
                        />
                    </div>

                    {/* Category Input */}
                    <div className="mb-5">
                        <label className="block text-gray-300 mb-2">Category</label>
                        <select
                            name="category"
                            value={editedCompliance?.category}
                            onChange={handleChange}
                            className="border rounded w-full p-3 bg-[#0E1621] text-white focus:outline-none border-gray-600"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between col-span-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border rounded px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 transition border-none "
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="border rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition border-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditComplianceModal;

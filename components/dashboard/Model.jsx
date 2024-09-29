import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Model = ({ employee }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-[#0C1A25] px-4 py-2 rounded-xl">Details</AlertDialogTrigger>
            <AlertDialogContent className='bg-[#0C1A25] border-none'>
                <div className="flex items-center justify-center">
                    <img className="w-40 h-40 rounded-full object-cover" src={employee?.imgUrl} alt="" />
                </div>
                <div className="max-w-md p-6 text-white rounded-lg shadow-lg shadow-black">
                    <h1 className="text-2xl font-bold text-gray-200 mb-4">Employee Details</h1>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <h2 className="text-lg font-medium">Name:</h2>
                            <p className="text-gray-400">{employee?.name || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Email:</h2>
                            <p className="text-gray-400">{employee?.email || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Department:</h2>
                            <p className="text-gray-400">{employee?.employType || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Location:</h2>
                            <p className="text-gray-400">{employee?.location || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Contact:</h2>
                            <p className="text-gray-400">{employee?.contact || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Salary:</h2>
                            <p className="font-semibold text-red-500">{employee?.salary ? `${employee.salary} Tk` : "N/A"}</p>
                        </div>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel className='bg-[#0C1A25] text-white hover:bg-[#07090F] hover:text-white hover:border-[#07090F]'>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Model
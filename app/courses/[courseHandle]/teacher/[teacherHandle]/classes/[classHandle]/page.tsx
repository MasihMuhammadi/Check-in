"use client"
import React, { useEffect, useState } from 'react';
import AddClass from '../../../../../../auth/teacher/addClass'
import AddStudent from '../../../../../../auth/teacher/addStudent'
import StudentInfo from '../../../../../../components/studentInfomationForm/studentInfo';
import Students from '../../students/page';
import axios from 'axios';
import PresentIcon from '../../../../../../../public/smallIcons/presentIcon';
import AbsentIcon from '../../../../../../../public/smallIcons/absentIcon';
import Table from '../../../../../../components/table/table';
import TableForMobileScreen from '../../../../../../components/table/tableForMobileScreen';
import Buttons from '../../../../../../components/buttons';
import FullModal from '../../../../../../components/fullModal';
import PopUp from '../../../../../../components/popUp';
import { useRouter } from 'next/navigation';
import BackButton from '../../../../../../../public/smallIcons/backButton';

const SingleClass = ({ params }: { params: any }) => {

    const [students, setStudent] = useState<any>()
    const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false)
    const [clickedId, setClickedId] = useState<string>("")
    const route = useRouter()

    // console.log(params?.classHandle, 'pppppppppparams')
    useEffect(() => {
        const fetchStudents = async () => {

            // console.log(params, 'vvvvvvvvvvvvvv')

            // const desiredClasses = allClasses.filter((cls: any) => cls.teacher_name === singleTeacherData?.data?.data?.teacher?.teacher_name);

            const response: any = await axios.get(`http://localhost:5000/api/students/student`)
            const newStudent = response?.data?.filter((s: any) => s?.class_name === params?.classHandle?.split("-").join(" "))
            setStudent(newStudent)
        }
        fetchStudents()
    }, [])
    console.log(students, 'sssssssss')
    const updateStudent = () => {

    }
    const editStudent = () => {

    }
    const addStudent = () => {
        setShowAddStudentModal(true)
    }
    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const handleRowDoubleClick = (id: any) => {
        setShowPopUp(true)
        setClickedId(id)
    };
    const checkShowModal = (e: any) => {
        console.log(e.target.value, '........')
    }
    const handleEdit = () => {
        console.log(clickedId, 'ccccccccllllllllllicked')
    }
    const handleDelete = async () => {
        const response = await axios.delete(`http://localhost:5000/api/students/student/${clickedId}`)
        const filterDeleted = students.filter((stu) => stu?._id !== clickedId)
        setStudent(filterDeleted)
        console.log(response, 'ccccccccllllllllllicked')
    }
    const goBack = () => {
        route.back()

    }


    return (
        <div>
            <div className="cursor-pointer" onClick={goBack}>
                <BackButton />
            </div>
            {showPopUp && <PopUp data={students} showEditModal={handleRowDoubleClick} handleDelete={handleDelete} handleEdit={handleEdit} setShowPopUp={setShowPopUp} />}
            {showAddStudentModal && <FullModal showModal={true} handleClose={() => { setShowAddStudentModal(false) }}>
                <AddStudent />
            </FullModal>}
            {students?.length ?
                <div>
                    <div className='hidden md:block'>
                        <Table
                            isClass={false}
                            headers={["", "Name", "Father Name", "Phone", "Subject", "Delete"]}
                            teacherData={students}
                            // onDoubleClick={() => alert(`table with should be edited`)}
                            onRowDoubleclick={handleRowDoubleClick}
                            bodyRows={students?.map((cls: any) => [

                                <input type="checkbox" className='bg-blue-500' onChange={(e: any) => checkShowModal(e)} key={`checkbox-${cls.id}`} />,

                                cls.name,
                                cls.father_name,
                                cls.phone,
                                cls.class_name,
                                <>
                                    <div className="flex gap-x-4 items-center justify-center">
                                        <div className='cursor-pointer' onClick={() => alert("email should sent which your son is present")}>
                                            <PresentIcon />
                                        </div>
                                        <div className='cursor-pointer' onClick={() => alert("email sent which your son is absent")}>
                                            <AbsentIcon />
                                        </div>
                                    </div>
                                </>
                            ])}
                        />

                    </div>

                    <div className='block md:hidden my-5'>
                        {students?.map((cls: any) => {
                            return (
                                <TableForMobileScreen key={cls._id} data={cls} isStudent={true} updatedClass={updateStudent} handleShowPopUp={editStudent} />
                            )
                        })}
                    </div>
                </div>
                : <span className='flex justify-center items-cener text-center'>NO Course Found</span>
            }

            <Buttons secondary={true} style=" px-4 py-2" type="button" clickHandler={addStudent}>
                + Add Student
            </Buttons>

        </div>
    );
}

export default SingleClass;

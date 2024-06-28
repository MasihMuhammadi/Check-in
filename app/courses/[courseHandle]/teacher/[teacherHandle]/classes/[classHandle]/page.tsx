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
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditable, setPageWillShow, setShowFullModal, setSingleStudent } from '../../../../../../../redux/slices/studentSlice';
import UpdateStudents from '../../../../../../auth/teacher/updateStudents';

const SingleClass = ({ params }: { params: any }) => {

    const [students, setStudent] = useState<any>()
    const [clickedId, setClickedId] = useState<string>("")
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const dispatch = useDispatch()
    const showFullModal = useSelector((state: any) => state.studentSlice.showFullModal)
    const isEditable = useSelector((state: any) => state.studentSlice.isEditable)
    const pageWillShow = useSelector((state: any) => state.studentSlice.pageWillShow)
    const singleStudent = useSelector((state: any) => state.studentSlice.singleStudent)

    const route = useRouter()
    useEffect(() => {
        const fetchStudents = async () => {
            const response: any = await axios.get(`http://localhost:5000/api/students/student`)
            const newStudent = response?.data?.filter((s: any) => s?.class_name === params?.classHandle?.split("-").join(" "))
            setStudent(newStudent)
        }
        fetchStudents()
    }, [dispatch, params?.classHandle])
    const updateStudent = () => {

    }
    const editStudent = () => {

    }
    const addStudent = () => {

        dispatch(setShowFullModal(true))
        setIsEditable(false)
    }

    const handleRowDoubleClick = (id: any) => {
        setShowPopUp(true)
        setClickedId(id)
    };
    const checkShowModal = (e: any) => {
    }
    const handleEdit = () => {
        dispatch(setShowFullModal(true))
        dispatch(setPageWillShow("updateStudent"))
        dispatch(setIsEditable(true))
        const single = students?.filter((ss: any) => ss._id == clickedId)
        dispatch(setSingleStudent(single[0]))
    }
    const handleDelete = async () => {
        const response = await axios.delete(`http://localhost:5000/api/students/student/${clickedId}`)
        const filterDeleted = students.filter((stu: any) => stu?._id !== clickedId)
        setStudent(filterDeleted)

    }
    const goBack = () => {
        route.back()
    }
    const closePopUp = () => {
        if (showPopUp == true) {
            setShowPopUp(false)
        }
    }
    const handleCloseModal = () => {
        dispatch(setIsEditable(false))
        dispatch(setPageWillShow("students"))
        dispatch(setShowFullModal(false))
    }
    const notifyPresentToParent = async (data: any, status: string) => {
        const date = new Date()
        const formattedDate = `${date.getFullYear()} - ${date.getMonth()} - ${date?.getDay()}`
        const payload = {
            // "to": `${data?.email}`,
            "to": "masihmuhammadi202@gmail.com",
            "subject": ` Attendance Notification for ${data?.name}- ${formattedDate}`,
            "text": "",
            "html":
                `<p>Dear <b> ${data?.father_name} </b>,<br />We hope this message finds you well.<br />
                    We are writing to inform you that your child, <b>${data?.name}</b>,was <span style="color:${status == "present" ? "green" : "red"}"> ${status === "present" ? "Present" : "Absent"} </span> in todays <b> ${data?.class_name} </b> class.If you have any questions or concerns regarding your child attendance or anything else related to their education, <br />please feel free to reach out to usThank you for your continued support <br />
                Best regards <b>${data?.teacher_name}</b>
                Your Son Teacher
                </p>`


        }


        try {
            await axios.post("http://localhost:5000/api/send-email", payload)
        }
        catch (e) {
            console.log(e)
        }
        // setSubmitting(false);
    }


    return (
        <div onClick={closePopUp} className='bg-gray-50 w-full h-full min-h-[calc(100vh-150px)]'>
            <div className="cursor-pointer" onClick={goBack}>
                <BackButton />
            </div>

            {showPopUp && <PopUp data={students} showEditModal={handleRowDoubleClick} handleDelete={handleDelete} handleEdit={handleEdit} setShowPopUp={setShowPopUp} />}
            {showFullModal &&
                <FullModal showModal={true} handleClose={handleCloseModal}>
                    {(isEditable && pageWillShow == "updateStudent") ? <UpdateStudents data={singleStudent} /> : <AddStudent />}
                </FullModal>
            }

            {students?.length ?
                <div>
                    <div className='hidden md:block'>
                        <Table
                            isClass={false}
                            headers={["", "Name", "Father Name", "Phone", "Subject", "Delete"]}
                            teacherData={students}
                            onRowDoubleclick={handleRowDoubleClick}
                            bodyRows={students?.map((cls: any) => [

                                <input type="checkbox" className='bg-blue-500' onChange={(e: any) => checkShowModal(e)} key={`checkbox-${cls.id}`} />,

                                cls.name,
                                cls.father_name,
                                cls.phone,
                                cls.class_name,
                                <>
                                    <div className="flex gap-x-4 items-center justify-center">
                                        <div className='cursor-pointer' onClick={() => notifyPresentToParent(cls, "present")}>
                                            <PresentIcon />
                                        </div>
                                        <div className='cursor-pointer' onClick={() => notifyPresentToParent(cls, "absent")}>
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

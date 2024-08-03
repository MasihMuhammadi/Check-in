"use client"
import React, { useEffect, useState } from 'react';
import AddClass from '../../../../../../auth/teacher/addClass';
import AddStudent from '../../../../../../auth/teacher/addStudent';
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
import ThreeDotIcon from '../../../../../../../public/smallIcons/threeDotIcon';
import TeacherInfo from '../../../../../../components/teacherInformationForm/teacherInfo';
import Notification from '../../../../../../components/notification';
import jsPDF from 'jspdf';
import DownloadIcon from '../../../../../../../public/smallIcons/downloadIcon';
import { svgToBase64 } from '../../../../../../../utils/svgToBased64';
import EduEchoLogo from '../../../../../../../public/smallIcons/eduEcho';

const SingleClass = ({ params }: { params: any }) => {
    const [students, setStudent] = useState<any>();
    const [clickedId, setClickedId] = useState<string>("");
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>({
        content: "",
        isShow: false,
        success: true
    });
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [currentStudent, setCurrentStudent] = useState<any>(null);
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [emailsSent, setEmailsSent] = useState<Set<string>>(new Set());

    const dispatch = useDispatch();
    const showFullModal = useSelector((state: any) => state.studentSlice.showFullModal);
    const isEditable = useSelector((state: any) => state.studentSlice.isEditable);
    const pageWillShow = useSelector((state: any) => state.studentSlice.pageWillShow);
    const singleStudent = useSelector((state: any) => state.studentSlice.singleStudent);
    const [reportContent, setReportContent] = useState<string>("");


    const route = useRouter();

    useEffect(() => {
        const fetchStudents = async () => {
            const response: any = await axios.get(`http://localhost:5000/api/students/student`);
            const newStudent = response?.data?.filter((s: any) => s?.class_name === params?.classHandle?.split("-").join(" "));
            setStudent(newStudent);
        };
        fetchStudents();
    }, [dispatch, params?.classHandle]);

    const updateStudent = () => { };

    const editStudent = () => { };

    const addStudent = () => {
        dispatch(setShowFullModal(true));
        setIsEditable(false);
    };

    const handleRowDoubleClick = (id: any) => {
        setShowPopUp(true);
        setClickedId(id);
    };

    const checkShowModal = (e: any) => { };

    const handleEdit = () => {
        dispatch(setShowFullModal(true));
        dispatch(setPageWillShow("updateStudent"));
        dispatch(setIsEditable(true));
        const single = students?.filter((ss: any) => ss._id == clickedId);
        dispatch(setSingleStudent(single[0]));
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/students/student/${clickedId}`, { withCredentials: true });
        const filterDeleted = students.filter((stu: any) => stu?._id !== clickedId);
        setStudent(filterDeleted);
    };

    const goBack = () => {
        route.back();
    };

    const closePopUp = () => {
        if (showPopUp === true) {
            setShowPopUp(false);
        }
    };

    const handleCloseModal = () => {
        dispatch(setIsEditable(false));
        dispatch(setPageWillShow("students"));
        dispatch(setShowFullModal(false));
    };

    const handleConfirmation = async (data: any, status: string) => {
        setCurrentStudent(data);
        setCurrentStatus(status);
        setShowConfirmation(true);
    };

    const [showReportModal, setShowReportModal] = useState<boolean>(false);

    const handleShowReportModal = (student: any) => {
        setCurrentStudent(student);
        setShowReportModal(true);
    };

    const closeReportModal = () => {
        setShowReportModal(false);
    };

    const handleSendReportEmail = async () => {
        if (!currentStudent) return;

        const date = new Date();
        const formattedDate = `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
        const payload = {
            to: currentStudent?.email,
            subject: `Performance Report for ${currentStudent?.name} - ${formattedDate}`,
            text: "",
            html: `
            <p>
                Dear <b>${currentStudent?.father_name}</b>,<br />
                We are pleased to provide you with the details of your child's performance.<br />
                Please find below the information regarding their progress and achievements.<br />
                ${reportContent ? `<p>${reportContent}</p>` : ""}
                If you have any questions or need further assistance, do not hesitate to contact us.<br />
                Best regards,<br />
                <b>${currentStudent?.teacher_name}</b><br />
                Your child's teacher
            </p>
            <p>
                ${currentStudent?.father_name} عزیز,<br />
                ما خوشحالیم که جزئیات عملکرد فرزند شما را به اطلاع شما می‌رسانیم.<br />
                لطفاً اطلاعات مربوط به پیشرفت و دستاوردهای او را در زیر مشاهده کنید.<br />
                ${reportContent ? `<p>${reportContent}</p>` : ""}
                اگر سوال یا نیازی به کمک بیشتر دارید، با ما تماس بگیرید.<br />
                با احترام,<br />
                <b>${currentStudent?.teacher_name}</b><br />
                معلم فرزندتان
            </p>`
        };

        try {
            await axios.post("http://localhost:5000/api/send-email", payload, { withCredentials: true });
            setNotification({
                content: "Report email sent successfully",
                isShow: true,
                success: true
            });
            setEmailsSent(new Set(emailsSent).add(currentStudent._id));
        } catch (e: any) {
            setNotification({
                content: e.message,
                isShow: true,
                success: false
            });
        }

        setShowReportModal(false);
    };


    const sendEmail = async () => {
        if (emailsSent.has(currentStudent._id)) return;

        const data = currentStudent;
        if (currentStatus == "present") {
            await axios.put(`http://localhost:5000/api/students/student/${data?._id}`, {
                presentDays: data?.presentDays + 1,
            }, { withCredentials: true });
        }
        else {
            await axios.put(`http://localhost:5000/api/students/student/${data?._id}`, {
                obsentDays: data?.obsentDays + 1,
            }, { withCredentials: true });
        }

        const status = currentStatus;
        const date = new Date();
        const formattedDate = `${date.getFullYear()} - ${date.getMonth()} - ${date?.getDate()}`;
        const payload = {
            to: data?.email,
            subject: `Attendance Notification for ${data?.name} - ${date}`,
            text: "",
            html: `
            <p>
                    Dear <b> ${data?.father_name} </b>,<br />
                    We hope this message finds you well.<br />
                    We are writing to inform you that your child, <b>${data?.name}</b>, was
                    <span style="color:${status == "present" ? "green" : "red"}">
                        ${status === "present" ? "Present" : "Absent"}
                    </span> in today's <b>${data?.class_name}</b> class. If you have any questions or concerns regarding your child's attendance or anything else related to their education,<br />
                    please feel free to reach out to us. Thank you for your continued support.<br />
                    Best regards,<br />
                    <b>${data?.teacher_name}</b><br />
                    Your child's teacher
                </p>
                <p>
                    ${data?.father_name} عزیز,<br />
                    امیدواریم این پیام شما را در سلامتی و شادی بیابد.<br />
                    ما می‌خواهیم به شما اطلاع دهیم که فرزندتان، <b>${data?.name}</b>،
                    <span style="color:${status == "present" ? "green" : "red"}">
                        ${status === "present" ? "حاضر" : "غایب"}
                    </span>
                    در کلاس <b>${data?.class_name}</b> امروز بود. اگر سوال یا نگرانی‌ای در مورد حضور فرزندتان یا هر موضوع دیگری مرتبط با تحصیلات او دارید،<br />
                    لطفاً با ما تماس بگیرید. از حمایت مداوم شما متشکریم.<br />
                    با احترام,<br />
                    <b>${data?.teacher_name}</b><br />
                    معلم فرزندتان
                </p>`
        };

        try {
            await axios.post("http://localhost:5000/api/send-email", payload, { withCredentials: true });
            setNotification({
                content: "Email sent successfully",
                isShow: true,
                success: true
            });
        } catch (e: any) {
            setNotification({
                content: e.message,
                isShow: true,
                success: false
            });
        }

        setEmailsSent(new Set(emailsSent).add(currentStudent._id));
        setShowConfirmation(false);
    };

    useEffect(() => {
        const notif = setTimeout(() => {
            setNotification({
                success: true,
                isShow: false,
                content: ""
            });
        }, 5000);

        return () => clearTimeout(notif);
    }, [notification]);

    const generatePDF = async (cls: any) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
        doc.setFontSize(10);

        doc.text("Dear Parent, We are pleased to provide you with the details of your child's", 15, 20);
        doc.text(`performance in the ${cls?.course_name} Education Center. Please find below the information regarding their progress and `, 15, 25);
        doc.text("achievements. If you have any questions or need further assistance, do not hesitate to contact us.", 15, 30);

        doc.text(`Name: ${cls.name}`, 15, 40);
        doc.text(`Father Name: ${cls.father_name}`, 15, 50);
        doc.text(`Class: ${cls.class_name}`, 15, 60);
        doc.text(`Teacher Name: ${cls.teacher_name}`, 15, 70);
        doc.text(`Absent Days: ${cls.obsentDays}`, 15, 80);
        doc.text(`Present Days: ${cls.presentDays}`, 15, 90);
        doc.text(`Date: ${new Date()}`, 15, 100);

        doc.text(`Signature:`, 15, 145);
        doc.text(`____________`, 15, 160);

        doc.save("details.pdf");
    };

    return (
        <>
            <p className="px-14 mb-4 font-normal">Welcome to Class <span className='font-bold capitalize'>{params?.classHandle}</span></p>
            <div onClick={closePopUp} className='px-2 sm:px-10 bg-gray-50 w-full h-full min-h-[calc(100vh-150px)] relative'>
                <Notification isShow={notification.isShow} success={notification.success}>
                    {notification.content}
                </Notification>

                <div className="cursor-pointer" onClick={goBack}>
                    <BackButton />
                </div>

                {showPopUp && <PopUp data={students} showEditModal={handleRowDoubleClick} handleDelete={handleDelete} handleEdit={handleEdit} setShowPopUp={setShowPopUp} />}
                {showFullModal &&
                    <FullModal showModal={true} handleClose={handleCloseModal}>
                        {(isEditable && pageWillShow == "updateStudent") ?
                            <UpdateStudents data={singleStudent} /> : <AddStudent data={singleStudent} />}
                    </FullModal>
                }

                {students?.length ?
                    <div>
                        <div className='hidden md:block'>
                            <Table
                                isClass={false}
                                headers={["Action", "Name", "Father Name", "Parent Email", "Phone", "Subject", "Status", "Download", "Report"]}
                                teacherData={students}
                                onRowDoubleclick={handleRowDoubleClick}
                                bodyRows={students?.map((cls: any, index: number) => [
                                    <div onClick={() => handleRowDoubleClick(cls._id)} key={index} className='flex items-center justify-center'>
                                        <ThreeDotIcon key={`icon-${cls._id}`} className={"w-5 h-5"} />
                                    </div>,
                                    cls.name,
                                    cls.father_name,
                                    cls.email,
                                    cls.phone,
                                    cls.class_name,


                                    <>
                                        {emailsSent.has(cls._id) ? (
                                            <p className='text-gray-500 '>You already sent the email</p>
                                        ) : (
                                            <div className="flex gap-x-4 items-center justify-center">
                                                <div className='cursor-pointer' onClick={() => handleConfirmation(cls, "present")}>
                                                    <PresentIcon />
                                                </div>
                                                <div className='cursor-pointer' onClick={() => handleConfirmation(cls, "absent")}>
                                                    <AbsentIcon />
                                                </div>
                                            </div>
                                        )}

                                    </>,
                                    <button onClick={() => generatePDF(cls)}>
                                        <DownloadIcon />
                                    </button>,
                                    <button onClick={() => handleShowReportModal(cls)}>
                                        Report
                                    </button>
                                ])}
                            />

                        </div>

                        <div className='block md:hidden my-5'>
                            {students?.map((cls: any) => (
                                <TableForMobileScreen key={cls._id} data={cls} isStudent={true} updatedClass={updateStudent} handleShowPopUp={editStudent} />
                            ))}
                        </div>
                    </div>
                    : <span className='flex justify-center items-center text-center'>No Student Found</span>
                }

                <Buttons secondary={true} style=" px-4 py-2 mx-10 mt-5" type="button" clickHandler={addStudent}>
                    + Add Student
                </Buttons>

                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg">
                            <h2 className="text-lg mb-4">Confirm Email</h2>
                            <p>Are you sure you want to send this email?</p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                    onClick={() => setShowConfirmation(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                    onClick={sendEmail}
                                    disabled={emailsSent.has(currentStudent._id)}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            // Modal for sending report
            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg mb-4">Send Report</h2>
                        <p>Are you sure you want to send the report email to {currentStudent?.father_name}?</p>
                        <textarea
                            className='w-full h-40 mt-4'
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            placeholder="Enter additional report details here..."
                        />
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => setShowReportModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={handleSendReportEmail}
                                disabled={emailsSent.has(currentStudent?._id)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default SingleClass;

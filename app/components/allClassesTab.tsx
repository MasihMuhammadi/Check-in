import React, { useEffect, useState } from 'react';
import AddClass from '../auth/teacher/addClass';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Table from '../components/table/table';
import TableForMobileScreen from '../components/table/tableForMobileScreen';
import DeleteIcon from '../../public/smallIcons/deleteIcon';
import EditIcon from '../../public/smallIcons/editIcon';
import SmallModal from './smallModal';
import FullModal from './fullModal';
import Buttons from './buttons';
import { setIsEditable, setPageWillShow } from '../../redux/slices/classSlice'
import UpdateClass from '../auth/teacher/updateClass';

const AllClassesTab = ({ data, params }: { data: any, params: any }) => {

    // Global Redux States
    const [updatedClass, setUpdatedClass] = useState([]);
    const singleTeacherData = useSelector((state: any) => state.teacherSlice.aTeacherData);
    const pageToShow = useSelector((state: any) => state.classSlice.pageWillShow);
    const isEditable = useSelector((state: any) => state.classSlice.isEditable);
    const dispatch = useDispatch()


    // All Local States
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [time, setTime] = useState<number>(5);
    const [classIdToDelete, setClassIdToDelete] = useState<string | null>(null);
    const [proceedWithDelete, setProceedWithDelete] = useState<boolean>(true);
    const [showFullModal, setShowFullModal] = useState<boolean>(false)


    useEffect(() => {
        const getClasses = async () => {
            setIsLoading(true);
            try {
                const response: any = await axios.get("http://localhost:5000/api/classes/class");
                let allClasses = response?.data?.data;

                const desiredClasses = allClasses.filter((cls: any) => cls.teacher_name === singleTeacherData?.data?.data?.teacher?.teacher_name);
                setFilteredClasses(desiredClasses);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getClasses();
    }, [singleTeacherData]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (showModal) {
            setProceedWithDelete(true);
            timeout = setTimeout(() => {
                setTime((prevTime) => {
                    if (prevTime === 1) {
                        if (proceedWithDelete) {
                            deleteClassById(classIdToDelete);
                        }
                        setShowModal(false);
                        return 5; // Reset the timer
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearTimeout(timeout);
    }, [showModal, time, classIdToDelete, proceedWithDelete]);

    const deleteClass = (id: any) => {
        setShowModal(true);
        setClassIdToDelete(id);
    };

    const deleteClassById = async (id: any) => {
        if (id) {
            try {
                await axios.delete(`http://localhost:5000/api/classes/class/${id}`, { withCredentials: true });
                setFilteredClasses((prevClasses) => prevClasses.filter((cls: any) => cls._id !== id));

            } catch (error) {
                console.log('Error deleting class:', error);
            }
        }
    };

    const undoHandler = () => {
        setTime(5)
        setProceedWithDelete(false);
        setShowModal(false);
    };
    const handleCloseModal = () => {
        dispatch(setIsEditable(false))
        dispatch(setPageWillShow("classes"))
        setShowFullModal(false)
    }
    const handleFullModal = () => {
        dispatch(setPageWillShow("addaClass"))

        setShowFullModal(true)
    }

    const editClass = (id: any) => {
        const desiredClasses = filteredClasses.filter((cls: any) => cls._id === id);
        setUpdatedClass(desiredClasses);
        dispatch(setIsEditable(true))
        dispatch(setPageWillShow("addaClass"))
        setShowFullModal(true)
    }


    return (
        <div className='relative'>

            {(showFullModal || isEditable) && pageToShow === "addaClass" &&
                <FullModal handleClose={handleCloseModal} showModal={showFullModal} setShowModal={setShowFullModal}>
                    <div className="flex ">
                        {isEditable ? <UpdateClass data={updatedClass} /> :
                            <AddClass data={data} />
                        }
                    </div>
                </FullModal>
            }

            <div className=' '>
                {showModal && (
                    <SmallModal
                        style="w-[300px] bg-black border border-white text-white h-[40px] flex items-center justify-center"
                        text={`You can undo deletion in`}
                        time={time}
                        undoButton={<><b>Undo</b></>}
                        undoHandler={undoHandler}
                    />
                )}

                {isLoading ? (
                    <div>
                        <Skeleton count={5} />
                    </div>
                ) : (
                    filteredClasses.length > 0 ? (
                        <>
                            <div className='hidden md:block'>
                                <Table
                                    // onRowDoubleclick={}
                                    isClass={true}
                                    headers={["Subject", "Course", "Days", "Time", "Finish Time", "Action"]}
                                    teacherData={singleTeacherData}
                                    bodyRows={filteredClasses.map((cls: any) => [
                                        cls.class_name,
                                        cls.course_name,
                                        `${cls.start_day} - ${cls.finish_day}`,
                                        `${cls?.started_time}-${cls?.finish_time}`,
                                        cls.finish_time,
                                        <>
                                            <div className="flex gap-x-4 items-center justify-center">
                                                <div className='cursor-pointer' onClick={() => deleteClass(cls?._id)}>
                                                    <DeleteIcon />
                                                </div>
                                                <div className='cursor-pointer' onClick={() => editClass(cls?._id)}>
                                                    <EditIcon />
                                                </div>
                                            </div>
                                        </>
                                    ])}
                                />
                            </div>
                            <div className='block md:hidden my-5'>
                                {filteredClasses?.map((cls: any) => {
                                    return (
                                        <TableForMobileScreen key={cls._id} data={cls} isStudent={false} updatedClass={updatedClass} handleShowPopUp={editClass} />
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <span className='flex items-center justify-center'>No Class Found</span>
                    )
                )}
                <Buttons type="button" secondary={true} clickHandler={handleFullModal} style='px-5 mt-10'>
                    <span className='text-xl mr-2'>+</span> {"  "} Add Class
                </Buttons>
            </div>
        </div>
    );
};

export default AllClassesTab;

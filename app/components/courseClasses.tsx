import React, { useState, useEffect } from 'react';
import NoCourseFound from '../../public/mockups/noCourseFoundMockup';
import Buttons from './buttons';
import { useDispatch, useSelector } from 'react-redux';
import { setPageWillShow } from '../../redux/slices/classSlice';
import AddClassByAdmin from './addClassByAdmin';
import ThreeDotIcon from '../../public/smallIcons/threeDotIcon';
import PopUp from './popUp';
import axios from 'axios';

const CourseClases = ({ data, courseData, teachers }: { data: any, courseData: any, teachers: any }) => {
    const dispatch = useDispatch();
    const pageWillShow = useSelector((state: any) => state.classSlice.pageWillShow);

    const [classModal, setClassModal] = useState(false);
    const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedClassData, setSelectedClassData] = useState<any>(null);
    const [classes, setClasses] = useState(data);

    useEffect(() => {
        setClasses(data);
    }, [data]);

    const showModal = () => {
        setClassModal(true);
        dispatch(setPageWillShow("adminDashboard"));
    };

    const hideModal = () => {
        setIsUpdate(false);
        setClassModal(false);
        setSelectedClassData(null);
        dispatch(setPageWillShow("adminDashboard"));
    };

    const showActionPopup = (index: number) => {
        setActivePopupIndex(index === activePopupIndex ? null : index);
    };

    const handleEdit = (index: number) => {
        setActivePopupIndex(-1);
        setIsUpdate(true);
        setSelectedClassData(classes[index]); // Ensure this contains _id
        setClassModal(true);
        dispatch(setPageWillShow("adminDashboard"));
    };


    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/classes/class/${id}`);
            setClasses(classes.filter((cls: any) => cls._id !== id));
        } catch (error) {
            console.error('Failed to delete class', error);
        }
    };

    const handleUpdate = async (updatedClassData: any) => {
        try {
            await axios.put(`http://localhost:5000/api/classes/class/${updatedClassData._id}`, updatedClassData);
            setClasses(classes.map((cls: any) => cls._id === updatedClassData._id ? updatedClassData : cls));
        } catch (error) {
            console.error('Failed to update class', error);
        }
    };

    return (
        <>
            <Buttons secondary={true} clickHandler={showModal} style={"mx-10 px-5"}>
                Add Class
            </Buttons>
            <div className={`flex gap-x-10 gap-y-4 justify-center flex-wrap`}>
                {classModal && pageWillShow === "adminDashboard" &&
                    <div className="h-screen w-screen fixed top-0 left-0 z-[1000]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-40"></div>
                        <div className="flex flex-col justify-center items-center z-50 absolute inset-0">
                            <div className='absolute bg-gray-200 p-5 shadow-md rounded-md py-7 z-[1000]'>
                                <Buttons primary={true} style='text-black px-2 ' clickHandler={hideModal}>Cancel</Buttons>
                                <AddClassByAdmin
                                    isUpdate={isUpdate}
                                    data={courseData}
                                    classData={selectedClassData} // Ensure this is correctly set
                                    teachers={teachers}
                                    onUpdate={handleUpdate}
                                />

                            </div>
                        </div>
                    </div>
                }

                {classes?.length > 0 ? classes?.map((cls: any, index: number) => {
                    return (
                        <div key={index} className='border shadow-xl rounded-2xl bg-gray-50 w-auto h-auto p-4 text-center'>
                            <div className="mb-4 block py-1" onClick={() => showActionPopup(index)}>
                                <ThreeDotIcon className={"w-5 h-5"} />
                            </div>
                            {activePopupIndex === index && <PopUp handleEdit={() => handleEdit(index)} handleDelete={() => handleDelete(cls._id)} />}
                            <p className='font-semibold capitalize'>Subject: {cls?.class_name}</p>
                            <p className='font-normal my-4'>Teacher Name: {cls?.teacher_name}</p>
                            <p className='font-normal'>Start From <span className="font-bold">{cls?.start_day}</span> to <span className="font-bold">{cls?.finish_day}</span></p>
                        </div>
                    );
                })
                    :
                    <div className='flex flex-col items-center'>
                        <h1 className='text-3xl'>No Class Found</h1>
                        <NoCourseFound className={"mt-5 w-full sm:w-[450px] opacity-85 m-auto"} />
                    </div>
                }
            </div>

        </>
    );
};

export default CourseClases;

"use client"
import React from 'react'
import TeacherInfo from '../../components/teacherInformationForm/teacherInfo'
import { useDispatch, useSelector } from 'react-redux'



const AddClass = ({ data }: { data: any }) => {
    const dispatch = useDispatch()
    const number = useSelector((state: any) => state.classSlice.number)
    return (
        <div className='overflow-x-hidden'>
            <TeacherInfo data={data} />
        </div>
    )
}
export default AddClass

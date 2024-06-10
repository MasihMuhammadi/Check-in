"use client"
import React from 'react'
import TeacherInfo from '../../components/teacherInformationForm/teacherInfo'
// import { useDispatch } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../../redux/slices/classSlice'


const AddClass = () => {
    const dispatch = useDispatch()
    const number = useSelector((state: any) => state.classSlice.number)
    // const number = useSelector(userSelector).number
    // dispatch(increment())
    console.log(number, '........')
    return (
        <div>
            {/* <h1 className='text-red-500 text-4xl'>{number}</h1> */}
            <TeacherInfo />
            <button onClick={() => dispatch(increment())}>icnrement</button>

        </div>
    )
}
export default AddClass

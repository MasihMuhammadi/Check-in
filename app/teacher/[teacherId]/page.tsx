"use client";
import React, { useState } from 'react';
import Table from '../../components/table/table';
import ClassesPag from './classesPage';

const SingleTeacher = ({ params }: { params: any }) => {

    return (
        <>
            {/* <p >Welcome Teacher {params?.teacherId} to this class </p>
            <Table
                headers={[
                    "...",
                    "Student Id",
                    "Name",
                    "Father Name",
                    'Phone',
                    "Class",
                    "Absent Days",
                    "Present Days",
                    "Status"]}
            /> */}
            <ClassesPag />


        </>
    );
};

export default SingleTeacher;

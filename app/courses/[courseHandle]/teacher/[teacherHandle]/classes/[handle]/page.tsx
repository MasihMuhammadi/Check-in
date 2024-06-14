import React from 'react';
import AddClass from '../../../../../../auth/teacher/addClass'
import AddStudent from '../../../../../../auth/teacher/addStudent'
import StudentInfo from '../../../../../../components/studentInfomationForm/studentInfo';
import Students from '../../students/page';

const SingleClass = ({ params }: { params: any }) => {

    return (
        <div>
            {params?.teacherId}
            {/* Hi Masssssssssssssssssssih */}
            {/* <Students /> */}

            {/* <AddStudent /> */}
            {/* <AddClass /> */}
        </div>
    );
}

export default SingleClass;

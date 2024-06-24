
import React from 'react';
import Table from '../../../../../components/table/table';
import DeleteIcon from '../../../../../../public/smallIcons/deleteIcon';
import EditIcon from '../../../../../../public/smallIcons/editIcon';
import TableForMobileScreen from '../../../../../components/table/tableForMobileScreen';
import PopUp from '../../../../../components/popUp';

const Students = () => {
    return (
        <>

            <h1 className='mb-10 font-semibold text-2xl mt-10 px-10'>Here is Your Classes Information</h1>
            <div className="hidden md:block">
                <Table
                    headers={[
                        "Subject",
                        "Course Name",
                        "Days",
                        "Started Time",
                        'End Time',
                        "Student Count",
                        "Edit",
                        "Delete",
                    ]}
                    bodyRows={[
                        ["Math", "Mozamel", "Sat - Thu", "12:00 PM", "1:00 PM", "20", <div key="edit"><EditIcon /></div>, <div key="delete"><DeleteIcon /></div>],
                        ["Science", "Mozamel", "Mon - Wed", "3:00 PM", "4:30 PM", "12", <div key="edit"><EditIcon /></div>, <div key="delete"><DeleteIcon /></div>]
                    ]}
                    teacherData={{}}
                />
            </div>
            <div className="block md:hidden ">
                <TableForMobileScreen isStudent={true} />
            </div>
            <PopUp />

        </>
    );
};

export default Students;
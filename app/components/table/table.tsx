"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import EditOrDelete from './editOrDelete';

const Table = ({ headers, bodyRows, teacherData, isClass = true, onRowDoubleclick }
    :
    { headers: any, bodyRows: any, teacherData: any, isClass?: boolean, onRowDoubleclick?: any }
) => {
    const [background, setBackground] = useState("");

    return (
        <>
            {background === "bg-red-200" && <EditOrDelete />}
            <div className='px-10'>
                <table className="table-auto w-full px-10">
                    <thead>
                        <tr className='relative mt-4'>
                            {headers.map((header: any, idx: number) => (
                                <th className='mt-2' key={idx}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-center justify-center items-center rounded-2xl'>
                        {bodyRows?.map((row: any, rowIndex: number) => {

                            const rowId = row[1]; // Assuming the second element is the ID
                            return (
                                <React.Fragment key={rowIndex}>
                                    {isClass ? (
                                        <tr className='odd:bg-gray-100 even:bg-gray-50 h-10 rounded-xl px-4 py-3 cursor-pointer' key={rowIndex}>
                                            {row?.map((cell: any, cellIndex: any) => (
                                                <td key={cellIndex} className="m-auto">
                                                    <Link href={`${teacherData?.data?.data?.teacher?.handle}/classes/${row[0].split(" ").join("-")}`} >
                                                        {cell}
                                                    </Link>
                                                </td>
                                            ))}
                                        </tr>
                                    ) : (
                                        <tr key={rowIndex} className='odd:bg-gray-100 even:bg-gray-50 h-10 rounded-xl px-4 py-3'>
                                            {row?.map((cell: any, cellIndex: number) => (
                                                <td key={cellIndex} className="m-auto" onDoubleClick={() => onRowDoubleclick(teacherData[rowIndex]?._id)}>{cell}</td>
                                            ))}
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;

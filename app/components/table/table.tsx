"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import EditOrDelete from './editOrDelete';

const Table = ({ headers, bodyRows, teacherData, isClass = true, onRowDoubleclick }
    :
    { headers: any, bodyRows: any, teacherData: any, isClass?: boolean, onRowDoubleclick?: any }
) => {
    const [background, setBackground] = useState("");
    console.log(teacherData, '........1.....')

    const changeBG = (checked) => {
        setBackground(checked ? "bg-red-200" : "even:bg-gray-100");
    };

    return (
        <>
            {background === "bg-red-200" && <EditOrDelete />}
            <div className='px-10'>
                <table className="table-auto w-full px-10">
                    <thead>
                        <tr className='relative mt-4'>
                            {headers.map((header, idx) => (
                                <th className='mt-2' key={idx}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-center justify-center items-center rounded-2xl'>
                        {bodyRows?.map((row, rowIndex) => {
                            console.log(row, 'rrrrrrrrrrrrrooooooooooowwwww');
                            const rowId = row[1]; // Assuming the second element is the ID
                            return (
                                <React.Fragment key={rowIndex}>
                                    {isClass ? (
                                        <Link href={`${teacherData?.data?.data?.teacher?.handle}/classes/${row[0].split(" ").join("-")}`} key={rowIndex}>
                                            <tr className='odd:bg-gray-100 even:bg-gray-50 h-10 rounded-xl px-4 py-3 cursor-pointer'>
                                                {row?.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="m-auto">{cell}</td>
                                                ))}
                                            </tr>
                                        </Link>
                                    ) : (
                                        <tr key={rowIndex} className='odd:bg-gray-100 even:bg-gray-50 h-10 rounded-xl px-4 py-3'>
                                            {row?.map((cell, cellIndex) => (
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

"use client";
import React, { useState } from 'react';
import EditOrDelete from './editOrDelete';


const Table = ({ headers, bodyRows }: { headers: string[], bodyRows: any[] }) => {
    const [background, setBackground] = useState("");

    const changeBG = (checked: boolean) => {
        setBackground(checked ? "bg-red-200" : "even:bg-gray-100");
    };

    return (
        <>
            {background === "bg-red-200" && <EditOrDelete />}
            <div className='px-10'>
                <table className="table-auto  w-full px-10 ">
                    <thead>
                        <tr className='relative mt-4'>
                            {headers.map((header: any, idx: number) => (
                                <th className='mt-2' key={idx}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-center justify-center items-center rounded-2xl'>
                        {bodyRows?.map((row, rowIndex) => (
                            <tr key={rowIndex} className='odd:bg-gray-100 even:bg-gray-50 h-10  rounded-xl px-4 py-3'>
                                {row?.map((cell: any, cellIndex: number) => (
                                    <td key={cellIndex} className="m-auto">{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>

        </>
    );
};

export default Table;


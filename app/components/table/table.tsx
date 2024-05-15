"use client";
import React, { useState } from 'react';
import EditOrDelete from './editOrDelete';
import PresentIcon from '../../../public/smallIcons/presentIcon';
import AbsentIcon from '../../../public/smallIcons/absentIcon';

const Table = ({ headers, bodyRows }: { headers: string[], bodyRows: any[] }) => {
    const [background, setBackground] = useState("");

    const changeBG = (checked: boolean) => {
        setBackground(checked ? "bg-red-200" : "even:bg-gray-100");
    };

    return (
        <>
            {background === "bg-red-200" && <EditOrDelete />}
            <div className='px-10'>
                <table className="table-auto  w-full px-10">
                    <thead>
                        <tr className='relative mt-4'>
                            {headers.map((header, idx) => (
                                <th className='mt-2' key={idx}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-center justify-center items-center rounded-md'>
                        {bodyRows?.map((row, idx) => (
                            <tr key={idx} className='odd:bg-gray-100 even:bg-gray-50 rounded-xl px-4'>
                                {row.map((cell, idx) => (
                                    <td className="m-auto" key={idx}>{cell}</td>
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

{/* <tbody className='text-center'>
                    <tr className='odd:bg-gray-100'>
                        <input type="checkbox" />
                        <td>stu_1231212313</td>
                        <td>Masihullah</td>
                        <td>Abdullah</td>
                        <td>+123131233</td>
                        <td>Math</td>
                        <td>10</td>
                        <td>2</td>
                        <td>
                            <div className='flex gap-x-4 items-center justify-center'>
                                <PresentIcon />
                                <AbsentIcon />
                            </div>
                        </td>
                    </tr>
                    <tr className=''>
                        <input type="checkbox" />
                        <td>stu_1231212313</td>
                        <td>Safiullah</td>
                        <td>Abdullah</td>
                        <td>+742734732</td>
                        <td>Chemistery</td>
                        <td>2</td>
                        <td>4</td>
                        <td>
                            <div className='flex gap-x-4 items-center justify-center'>
                                <PresentIcon />
                                <AbsentIcon />
                            </div>
                        </td>
                    </tr>
                    <tr className='odd:bg-gray-100'>
                        <input type="checkbox" />
                        <td>stu_1231212313</td>
                        <td>Safiullah</td>
                        <td>Abdullah</td>
                        <td>+742734732</td>
                        <td>Chemistery</td>
                        <td>2</td>
                        <td>4</td>
                        <td>
                            <div className='flex gap-x-4 items-center justify-center'>
                                <PresentIcon />
                                <AbsentIcon />
                            </div>
                        </td>
                    </tr>
                    <tr className={` ${background}`}>
                        <input type="checkbox" name="table" onChange={(e) => changeBG(e.target.checked)} />
                        <td>stu_1231212313</td>
                        <td>Safiullah</td>
                        <td>Abdullah</td>
                        <td>+742734732</td>
                        <td>Chemistery</td>
                        <td>2</td>
                        <td>4</td>
                        <td>
                            <div className='flex gap-x-4 items-center justify-center'>
                                <PresentIcon />
                                <AbsentIcon />
                            </div>
                        </td>
                    </tr>
                </tbody> */}
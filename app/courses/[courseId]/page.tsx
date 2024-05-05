
import React from 'react'
import NotFound from '../../not-found'
import Header from '@/app/components/header'
import Image from 'next/image'
import masihImage from "../../../public/images/Masih.jpg"
import LocationIcon from '../../../public/smallIcons/location'
import SubjectIcon from '../../../public/smallIcons/subject'
import StudentsIcon from '../../../public/smallIcons/students'


export default function Page({ params }: { params: any }) {


    const courseId = "course_123abc"

    return <>
        {params.courseId === courseId ? <>
            <div>
                <Header />
                <div>
                    <div className="flex flex-col md:flex-row gap-y-5 p-10 items-start gap-x-5 justify-between">
                        <Image src={masihImage} width={500} height={500} className="text-center content-center " alt="" />
                        <div>
                            <p className='text-[32px] text-medium'>Description:</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vitae enim obcaecati repellendus quisquam quas rem laboriosam, facere molestiae esse aperiam eius fugit numquam perferendis laborum expedita tenetur maxime. Numquam.</p>
                            <div className='flex  flex justify-end mt-32'>

                                <div className='bg-gray-100 shadow-2xl w-[475px] h-[475px] rounded-xl px-10 flex flex-end'>
                                    <div className='mt-10  flex flex-col gap-y-5'>
                                        <h1 className='font-semibold text-[32px] mt-5'>Mozamel Educational Center</h1>
                                        <div className='flex gap-x-2 '>
                                            <LocationIcon />
                                            <p>Kabul, Panjsad Family</p>
                                        </div>
                                        <div className="flex gap-x-2">
                                            <SubjectIcon />
                                            <p>Mathematics, English</p>
                                        </div>
                                        <div className="flex gap-x-2">
                                            <StudentsIcon />
                                            <p>500 Students</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between '>
                        <div>jlk</div>
                    </div>
                </div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad ut tempora non quam aut adipisci natus modi quo voluptatem debitis odio consequatur error earum, nihil fugiat perspiciatis accusamus hic quos illum consequuntur. Ab aliquam quibusdam nulla quod eius. Numquam, magni? Iure delectus dolores nesciunt quod sit, expedita voluptates saepe consequuntur.

            </div>
        </> :
            <><NotFound /></>}
    </>

}

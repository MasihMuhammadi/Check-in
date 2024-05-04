
import React from 'react'
import NotFound from '../../not-found'
import Header from '@/app/components/header'

export default function Page({ params }: { params: any }) {


    const courseId = "course_123abc"

    return <>
        {params.courseId === courseId ? <>
            <div>
                <Header />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad ut tempora non quam aut adipisci natus modi quo voluptatem debitis odio consequatur error earum, nihil fugiat perspiciatis accusamus hic quos illum consequuntur. Ab aliquam quibusdam nulla quod eius. Numquam, magni? Iure delectus dolores nesciunt quod sit, expedita voluptates saepe consequuntur.

            </div>
        </> :
            <><NotFound /></>}
    </>

}

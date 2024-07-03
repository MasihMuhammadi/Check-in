import axios from 'axios';
import LocationIcon from '../../../public/smallIcons/location';
import SubjectIcon from '../../../public/smallIcons/subject';
import StudentsIcon from '../../../public/smallIcons/students';
import Buttons from '../../components/buttons';
import Footer from '../../components/footer/footer';
import NotFound from '../../not-found';
import Image from 'next/image';
import ShareButtons from '../../components/shareButton';
import CopyUrlButton from '../../components/copyUrl';
import TeacherIcon from '../../../public/smallIcons/teacherIcon';
import Link from 'next/link';

async function getSingleCourseData(courseHandle: string) {

    try {
        const response = await axios.get(`http://localhost:5000/api/public-courses/p-courses/${courseHandle}`, { withCredentials: true });
        const courseData = response?.data;
        const base64Image = Buffer.from(courseData.Images, 'binary').toString('base64');
        const image = `data:image/jpeg;base64,${base64Image}`;
        return { courseData, image };
    } catch (error) {

        return { courseData: null, image: null };
    }
}

export default async function Page({ params }: { params: { courseHandle: string } }) {
    const { courseData, image } = await getSingleCourseData(params.courseHandle);

    if (!courseData) {
        return <NotFound />;
    }

    return (
        <>
            <div>
                <div>
                    <div className="flex flex-col md:flex-row gap-y-5 p-10 items-start gap-x-5 justify-between">
                        {<Image src={`${image}`} alt="Course Image" width={500} height={400} className="rounded-md" />}
                        <div>
                            <p className="text-[32px] text-medium">Description:</p>
                            <p>{courseData.description}</p>
                            <div className="flex justify-end mt-10  min-w-[350px] sm:min-w-[400px]">
                                <div className=" shadow-2xl w-full h-[475px] rounded-xl px-10 flex flex-end">
                                    <div className="mt-10 flex flex-col gap-y-5">
                                        <h1 className="font-semibold text-[32px] mt-5">{courseData?.courseName}</h1>
                                        <div className="flex gap-x-2">
                                            <LocationIcon />
                                            <p>{courseData.location}</p>
                                        </div>
                                        <div className="flex gap-x-2">
                                            <SubjectIcon />
                                            <p>{courseData.studyFields}</p>
                                        </div>
                                        <div className="flex gap-x-2">
                                            <StudentsIcon />
                                            <p>{courseData.studentsCount} Students</p>
                                        </div>
                                        <div className="flex gap-x-2 mb-4">
                                            <TeacherIcon />
                                            <p>{courseData.teacherCount} Teachers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 flex justify-between'>
                                <ShareButtons url={"masih"} title={"something"} />
                                <CopyUrlButton url="https://msihmuhmmadi.vercel.app" />
                            </div>
                        </div>
                    </div>

                    <Buttons secondary={true} style=" px-4 py-2 mx-10">
                        <Link href="/courses">See Other Courses</Link>
                    </Buttons>
                </div>
            </div>
            <Footer />
        </>
    );
}

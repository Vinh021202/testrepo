'use client'
import React from 'react'
import CourseDetailsPage from "../../components/Course/CourseDetailsPage"

const Page = ({ params }: any) => {
    // Use React.use() to unwrap the params promise
    const { id } = React.use(params);

    return ( 
        <div>
            <CourseDetailsPage id={id} />
        </div>
    )
}

export default Page

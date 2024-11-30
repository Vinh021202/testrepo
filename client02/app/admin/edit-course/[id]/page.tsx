'use client'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/Utils/Heading'
import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import DashboadrHero from "../../../components/Admin/DashboardHero";
// import CreateCourse from '../../../components/Admin/Course/CreateCourse';
import EditCourse from '../../../components/Admin/Course/EditCourse';


type Props = {}

const page = ({params}:any) => {
    const id =params?.id;

    return ( 
        <div>
        <AdminProtected>
          <Heading
            title="Học Trực Tuyến"
            description="nền tảng để học sinh học tập và nhận sự trợ giúp từ giáo viên"
            keyword="Lập trình, MERN, Redux, Học máy"
          />
          <div className="flex h-screen">
            <div className="1500px:w-[20%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%] ">
              <DashboadrHero />
              {/* <CreateCourse /> */}
              <EditCourse id={id} />
            </div>
          </div>
        </AdminProtected>
      </div>
    )
}

export default page
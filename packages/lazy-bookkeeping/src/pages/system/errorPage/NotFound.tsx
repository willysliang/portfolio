/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-01 15:31:36
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-01 18:08:28
 * @ Description: 404
 */

import React, { useEffect } from "react"
import { getResouceList } from "@/api/mock"

export default function Test() {
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const res = await getResouceList()
      const { list, studyList } = res.data
      console.log(list, studyList)
    } catch {}
  }

  return <div>this is NotFound</div>
}

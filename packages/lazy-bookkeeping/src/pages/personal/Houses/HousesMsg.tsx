/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-25 16:29:12
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 19:44:02
 * @ Description: 房屋概括
 */

import React from 'react'
import { Button, Ellipsis, Image } from 'antd-mobile'
import { IHousesDetail } from '#/house'
import s from '../styles/Houses.module.scss'
import { baseImgUrl } from '@willy/utils/constant'
import { CheckShieldOutline } from 'antd-mobile-icons'

/** 房屋概括 */
const HousesMsg = React.memo(({ dataInfo }: { dataInfo: IHousesDetail }) => {
  const genderName =
    dataInfo.gender === '0' ? '女士' : dataInfo.gender === '1' ? '先生' : ''

  return (
    <div className={s['houses-msg']}>
      <h3>房屋概括</h3>
      <div className={s['houses-owner']}>
        <Image
          src={baseImgUrl + dataInfo.userImg}
          width={54}
          height={54}
          fit="cover"
          style={{ borderRadius: '50%', overflow: 'hidden' }}
        />
        <div className={s['houses-owner-center']}>
          <span>
            {dataInfo.nickname}
            {genderName}
          </span>
          <div>
            <CheckShieldOutline fontSize={15} />
            <span>{dataInfo.authorization ? '已认证房主' : '尚未认证'}</span>
          </div>
        </div>
        <Button color="primary" size="mini" fill="outline">
          发送消息
        </Button>
      </div>
      <Ellipsis
        direction="end"
        expandText="展开"
        collapseText="收起"
        rows={2}
        content={dataInfo.desc}
      />
    </div>
  )
})

HousesMsg.displayName = 'HousesMsg'

export default HousesMsg

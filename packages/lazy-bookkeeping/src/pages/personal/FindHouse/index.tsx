/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-23 14:02:14
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-23 14:46:39
 * @ Description: 找房 FindHouse
 */

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';

import s from '../styles/FindHouse.module.scss'

const FindHouse = () => {
  const navigate = useNavigate();
  
  return (
    <div className={s.container}>
      <NavBar onBack={() => navigate(-1)}>找房</NavBar>
      <div className={s['list-box']}>
        
      </div>
    </div>
  )
}

export default FindHouse

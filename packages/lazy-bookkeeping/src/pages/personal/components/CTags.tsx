/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-25 15:48:04
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-25 15:55:38
 * @ Description: 标签扉页
 */

import React from 'react'
import cx from 'classnames'
import styles from '../styles/CTags.module.scss'

const CTags = React.memo(({ tags }: { tags: string[] }) => {
  return (
    <div className={styles['tags']}>
      {tags?.map((tag, index) => (
        <span
          className={cx({
            [styles['tag_']]: true,
            [styles[['tag_' + index].join(' ')]]: true,
          })}
          key={tag}
        >
          #&nbsp;{tag}
        </span>
      ))}
    </div>
  )
})

CTags.displayName = 'CTags'

export default CTags

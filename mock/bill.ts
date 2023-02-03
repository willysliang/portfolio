/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 16:32:19
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-03 17:15:12
 * @ Description: bill 账单
 */

const billList = [
  {
    date: '2023-02',
    bills: [
      {
        id: 1,
        type: 1,
        amount: 1,
        tag_id: 1,
        tag_name: '1',
        tag_icon: '1',
        user_id: 'string',
        remark: 'string',
        date: '2023-02-01',
        updated_time: '2023-02-02',
        created_time: '2023-02-03',
      },
    ],
  },
]

export default [
  {
    url: '/bill/list',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          total_expense: 101,
          total_income: 102,
          total_page: 103,
          list: billList,
        },
      }
    },
  },
]

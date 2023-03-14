/**
 * @ Author: willysliang
 * @ Create Time: 2023-02-03 16:32:19
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-14 11:47:34
 * @ Description: bill 账单
 */

export default [
  {
    url: '/bill/list',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          total_expense: 7,
          total_income: 6,
          total_page: 5,
          'list|10-30': [
            {
              date: '@date(yyyy-MM-dd)',
              'bills|10-30': [
                {
                  id: '@id()',
                  type: '@integer(1, 3)',
                  amount: 1,
                  tag_id: 1,
                  tag_name: '@cname()',
                  tag_icon: '1',
                  user_id: 'string',
                  remark: 'string',
                  date: '@date(yyyy-MM-dd hh:mm:ss)',
                  updated_time: '@date(yyyy-MM-dd hh:mm:ss)',
                  created_time: '@datetime',
                },
              ],
            },
          ],
        },
      }
    },
  },
  {
    url: RegExp(`/bill/` + '.*'),
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          id: '@id()',
          type: '@integer(1, 3)',
          amount: 1,
          tag_id: 1,
          tag_name: '@cname()',
          tag_icon: '1',
          user_id: 'string',
          remark: 'string',
          date: '@date(yyyy-MM-dd hh:mm:ss)',
          updated_time: '@date(yyyy-MM-dd hh:mm:ss)',
          created_time: '@datetime',
        },
      }
    },
  },
]

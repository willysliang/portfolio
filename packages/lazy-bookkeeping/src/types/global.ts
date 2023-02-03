export type ITagType = 1 | 2 | 3

export interface Bill {
  id: string
  type: ITagType
  amount: string
  tag_id: string
  tag_name: string
  tag_icon: string
  user_id: string
  remark: string
  date: string
  updated_time: string
  created_time: string
}

export interface OneDayBills {
  date: string
  bills: Bill[]
}

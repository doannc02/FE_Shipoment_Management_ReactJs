import _ from 'lodash'
import { useDate } from '../../../hooks/date/useDate'

type Props = {
  row: any
  render?: any
  fieldName?: string
}

export const CellContent = (props: Props) => {
  const { render, row, fieldName } = props
  const { checkDateValid, convertToDate } = useDate()

  if (row && render) {
    return render(row)
  }

  if (row && fieldName) {
    const val = _.get(row, fieldName)

    if (checkDateValid(val)) return convertToDate(val)

    return val
  }

  return null
}

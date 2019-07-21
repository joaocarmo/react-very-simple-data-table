// Import modules
import React from 'react'

const headerStyle = {
  verticalAlign: 'top',
  textAlign: 'left',
  fontWeight: 'bold',
}

const TableBody = ({ children, ...props }) => <tbody {...props}>{children}</tbody>
const TableCell = ({
  children, header, rightAlignedNames, ...props
}) => {
  const headerCellStyle = {
    verticalAlign: 'top',
    textAlign: rightAlignedNames ? 'right' : 'left',
    fontWeight: 'bold',
  }

  return (
    <td style={header ? headerCellStyle : {}} {...props}>{children}</td>
  )
}
const TableFooter = ({ children, ...props }) => <tfoot {...props}>{children}</tfoot>
const TableHeader = ({ children, style, ...props }) => <thead style={style || headerStyle} {...props}>{children}</thead>
const TableHeaderCell = ({ children, ...props }) => <th {...props}>{children}</th>
const TableRow = ({ children, ...props }) => <tr {...props}>{children}</tr>

const DefaultTable = ({ children, ...props }) => <table {...props}>{children}</table>

DefaultTable.Body = TableBody
DefaultTable.Cell = TableCell
DefaultTable.Footer = TableFooter
DefaultTable.Header = TableHeader
DefaultTable.HeaderCell = TableHeaderCell
DefaultTable.Row = TableRow

export default DefaultTable

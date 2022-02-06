import { useMemo } from 'react'
import PropTypes from 'prop-types'

const headerStyle = {
  verticalAlign: 'top',
  textAlign: 'left',
  fontWeight: 'bold',
}

const TableBody = ({ children, ...props }) => (
  <tbody {...props}>{children}</tbody>
)

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
}

const TableCell = ({
  children,
  header,
  rightAlignedNames,
  style,
  ...props
}) => {
  const headerCellStyle = useMemo(
    () => ({
      verticalAlign: 'top',
      textAlign: rightAlignedNames ? 'right' : 'left',
      fontWeight: 'bold',
    }),
    [rightAlignedNames],
  )

  const tdStyle = useMemo(() => {
    const withHeaderStyle = header ? headerCellStyle : {}

    return { ...withHeaderStyle, ...style }
  }, [header, headerCellStyle, style])

  return (
    <td style={tdStyle} {...props}>
      {children}
    </td>
  )
}

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
  rightAlignedNames: PropTypes.bool,
  style: PropTypes.object,
}

TableCell.defaultProps = {
  header: false,
  rightAlignedNames: false,
  style: {},
}

const TableFooter = ({ children, ...props }) => (
  <tfoot {...props}>{children}</tfoot>
)

TableFooter.propTypes = {
  children: PropTypes.node.isRequired,
}

const TableHeader = ({ children, style, ...props }) => (
  <thead style={style} {...props}>
    {children}
  </thead>
)

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
}

TableHeader.defaultProps = {
  style: headerStyle,
}

const TableHeaderCell = ({ children, ...props }) => (
  <th {...props}>{children}</th>
)

TableHeaderCell.propTypes = {
  children: PropTypes.node.isRequired,
}

const TableRow = ({ children, ...props }) => <tr {...props}>{children}</tr>

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
}

const DefaultTable = ({ children, ...props }) => (
  <table {...props}>{children}</table>
)

DefaultTable.propTypes = {
  children: PropTypes.node.isRequired,
}

DefaultTable.Body = TableBody
DefaultTable.Cell = TableCell
DefaultTable.Footer = TableFooter
DefaultTable.Header = TableHeader
DefaultTable.HeaderCell = TableHeaderCell
DefaultTable.Row = TableRow

export default DefaultTable

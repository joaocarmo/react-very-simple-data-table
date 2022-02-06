import PropTypes from 'prop-types'
import DefaultTable from './DefaultTable'
import Link from './Link'
import { getNestedValue, getLastValue } from './helper-functions'

/*
 * How to use (example)
 *
 * const headers = [
 *   { path: ['userID'], name: 'User ID', link: '/users', appendValue: true },
 *   { path: ['firstName'], name: 'First Name' },
 *   {
 *     path: ['startDate'],
 *     name: 'Start Date',
 *     transform: (value, row) => value ? value : 'N/A',
 *   },
 * ]
 * <SimpleDataTable
 *   data={data}
 *   headers={headers}
 *   vertical
 *   rightAlignedNames
 *   {...props}
 * />
 *
 */

const renderCellFromHeader = (
  { path, link, transform, appendValue },
  row,
  Table,
) => {
  const key = getLastValue(path)
  const isLink = typeof link === 'string'
  const value = getNestedValue(row, path)
  const transformedValue =
    (typeof transform === 'function' ? transform(value, row) : value) || '-'
  const linkValue = appendValue ? `${link}/${value}` : link
  return (
    <Table.Cell key={key}>
      {!isLink && transformedValue}
      {isLink && <Link to={linkValue}>{transformedValue}</Link>}
    </Table.Cell>
  )
}

const SimpleDataTable = (props) => {
  const {
    keyId,
    headers,
    data,
    vertical,
    rightAlignedNames,
    customElements,
    ...otherProps
  } = props
  const { table, tbody, td, tfoot, th, thead, tr } = customElements
  const Table = table || DefaultTable
  Table.Body = tbody || DefaultTable.Body
  Table.Cell = td || DefaultTable.Cell
  Table.Footer = tfoot || DefaultTable.Footer
  Table.HeaderCell = th || DefaultTable.HeaderCell
  Table.Header = thead || DefaultTable.Header
  Table.Row = tr || DefaultTable.Row
  return vertical ? (
    <Table {...otherProps}>
      <Table.Body>
        {data.map((row) => (
          <>
            {headers.map((header) => (
              <Table.Row key={header.name}>
                <Table.Cell header rightAlignedNames={rightAlignedNames}>
                  {header.name}
                </Table.Cell>
                {renderCellFromHeader(header, row, Table)}
              </Table.Row>
            ))}
          </>
        ))}
      </Table.Body>
    </Table>
  ) : (
    <Table {...otherProps}>
      <Table.Header>
        <Table.Row>
          {headers.map(({ name }) => (
            <Table.HeaderCell key={name}>{name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, idx) => (
          <Table.Row key={keyId ? row[keyId] : idx}>
            {headers.map((header) => renderCellFromHeader(header, row, Table))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

// Defines the type of data expected in each passed prop
SimpleDataTable.propTypes = {
  keyId: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  vertical: PropTypes.bool,
  rightAlignedNames: PropTypes.bool,
  customElements: PropTypes.exact({
    table: PropTypes.element,
    tbody: PropTypes.element,
    td: PropTypes.element,
    tfoot: PropTypes.element,
    th: PropTypes.element,
    thead: PropTypes.element,
    tr: PropTypes.element,
  }),
}

// Defines the default values for not passing a certain prop
SimpleDataTable.defaultProps = {
  keyId: '',
  vertical: false,
  rightAlignedNames: false,
  customElements: {},
}

export default SimpleDataTable

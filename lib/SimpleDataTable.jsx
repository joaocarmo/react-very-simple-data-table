// Import modules
import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table.jsx'
import Link from './Link.jsx'
import { getNestedValue, getLastValue } from './helper-functions.js'

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

const renderCellFromHeader = ({
  path, link, transform, appendValue,
}, row) => {
  const key = getLastValue(path)
  const isLink = typeof link === 'string'
  const value = getNestedValue(row, path)
  const transformedValue = (
    typeof transform === 'function' ? transform(value, row) : value
  ) || '-'
  const linkValue = appendValue ? `${link}/${value}` : link
  return (
    <Table.Cell key={key}>
      {!isLink && transformedValue}
      {isLink && (
        <Link to={linkValue}>
          {transformedValue}
        </Link>
      )}
    </Table.Cell>
  )
}

const SimpleDataTable = (props) => {
  const {
    headers, data, vertical, rightAlignedNames, ...otherProps
  } = props
  return vertical ? (
    <Table {...otherProps}>
      <Table.Body>
        {data.map(row => (
          <>
            {headers.map(header => (
              <Table.Row key={header.name}>
                <Table.Cell header rightAlignedNames={rightAlignedNames}>
                  {header.name}
                </Table.Cell>
                {renderCellFromHeader(header, row)}
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
            <Table.HeaderCell key={name}>
              {name}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, idx) => (
          <Table.Row key={row._id || idx}>
            {headers.map(header => renderCellFromHeader(header, row))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

// Defines the type of data expected in each passed prop
SimpleDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  vertical: PropTypes.bool,
  rightAlignedNames: PropTypes.bool,
}

// Defines the default values for not passing a certain prop
SimpleDataTable.defaultProps = {
  vertical: false,
  rightAlignedNames: false,
}

export default SimpleDataTable

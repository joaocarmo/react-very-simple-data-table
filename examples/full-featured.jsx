import { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import faker from '@withshepherd/faker'
import SimpleDataTable from '..'

const generateData = (numResults = 0) => {
  let total = numResults || 0
  if (typeof numResults === 'string') {
    total = parseInt(numResults, 10)
  }
  const data = []
  for (let i = 1; i <= total; i += 1) {
    data.push({
      id: i,
      avatar: faker.image.avatar(),
      fullName: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      address: {
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
      },
    })
  }
  return data
}

const data = generateData(100)

const headers = [
  {
    path: ['id'],
    name: 'ID',
    link: '/users',
    appendValue: true,
  },
  { path: ['fullName'], name: 'Full Name' },
  { path: ['username'], name: 'Username' },
  { path: ['email'], name: 'E-Mail' },
  { path: ['phoneNumber'], name: 'Phone Number' },
  {
    path: ['address'],
    name: 'Address',
    transform: ({ city, state, country }) => `${city}, ${state} [${country}]`,
  },
]

const colorNthRow = `
  table.simple-data-table-example > tbody > tr:nth-child(even) {
    background-color: #f2f2f2
  }
`

const hoverTHStyle = `
  .my-custom-header-cell:hover {
    background-color: aliceblue;
  }
`

const MyCustomHeaderCell = ({ children, ...props }) => {
  const handleOnClick = useCallback(() => {
    // eslint-disable-next-line no-alert
    window.alert(`You clicked on ${children}`)
  }, [children])

  return (
    <th {...props} className="my-custom-header-cell">
      {children}
      &nbsp;
      <a href="#hide" aria-label="Hide this header" onClick={handleOnClick}>
        &times;
      </a>
    </th>
  )
}

MyCustomHeaderCell.propTypes = {
  children: PropTypes.node.isRequired,
}

const spacedSpan = { marginLeft: '20px' }

const FullFeaturedDemo = () => {
  const [template, setTemplate] = useState('simple-data-table-example')
  const [vertical, setVertical] = useState(false)
  const [rightAlignedNames, setRightAlignedNames] = useState(false)

  return (
    <>
      <style type="text/css">
        {`
          ${colorNthRow}
          ${hoverTHStyle}
        `}
      </style>
      <div style={{ margin: '20px 0px' }}>
        <span>
          Use a template framework?{' '}
          <select
            name="template"
            id="template"
            value={template}
            onChange={({ target: { value } }) => setTemplate(value)}
          >
            <option value="none">None</option>
            <option value="simple-data-table-example">Custom</option>
            <option value="ui selectable striped table">Semantic UI</option>
            <option value="table table-striped table-hover">Bootstrap</option>
          </select>
        </span>
        <span style={spacedSpan}>
          <label htmlFor="vertical">
            <input
              type="checkbox"
              name="vertical"
              id="vertical"
              checked={vertical}
              onChange={() => setVertical(!vertical)}
            />
            Vertical Table
          </label>
        </span>
        {vertical && (
          <span style={spacedSpan}>
            <label htmlFor="rightAlignedNames">
              <input
                type="checkbox"
                name="rightAlignedNames"
                id="rightAlignedNames"
                checked={rightAlignedNames}
                onChange={() => setRightAlignedNames(!rightAlignedNames)}
              />
              Align names to the right
            </label>
          </span>
        )}
      </div>
      <SimpleDataTable
        keyId="id"
        data={data}
        headers={headers}
        vertical={vertical}
        rightAlignedNames={rightAlignedNames}
        className={template}
        customElements={{
          th: MyCustomHeaderCell,
        }}
      />
    </>
  )
}

ReactDOM.render(<FullFeaturedDemo />, document.getElementById('app'))

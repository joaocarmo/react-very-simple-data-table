// Main imports
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import faker from 'faker'
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
    path: ['id'], name: 'ID', link: '/users', appendValue: true,
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

const FullFeaturedDemo = () => {
  const [vertical, setVertical] = useState(false)
  const [rightAlignedNames, setRightAlignedNames] = useState(false)

  return (
    <>
      <style type="text/css">
        {`
          table.simple-data-table-example > tbody > tr:nth-child(even) {
            background-color: #f2f2f2
          }
        `}
      </style>
      <div style={{ margin: '20px 0px' }}>
        <span>
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
          <span style={{ marginLeft: '20px' }}>
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
        data={data}
        headers={headers}
        vertical={vertical}
        rightAlignedNames={rightAlignedNames}
        className='simple-data-table-example'
      />
    </>
  )
}

ReactDOM.render(
  <FullFeaturedDemo />,
  document.getElementById('app'),
)

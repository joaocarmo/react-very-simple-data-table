# react-very-simple-data-table

[![npm version](https://badge.fury.io/js/react-very-simple-data-table.svg)][badge]

When all you want is a table !

## About

A very simple and flexible data table for React.js. If you don't want to think
about rendering or need some smarts, try [react-smart-data-table][rsdt].

**This is in a very experimental stage**

## Installation

```sh
npm install react-very-simple-data-table

# or

yarn add react-very-simple-data-table
```

## Features

- Allows custom rendering
- Renders an horizontal table
- Renders a vertical table
- Easily customizable using CSS by passing a _className_ prop
- Allows custom table elements for:
  `table`, `tbody`, `td`, `tfoot`, `th`, `thead`, `tr`

## Usage

Please check the [examples][examples] until the documentation is complete.

## Demos

You can experiment with a demo [here][demo].

## Testing

Run tests using _Jest_:

```sh
yarn test
```

## Forking / Contributing

If you want to fork or contribute, it's easy to test your changes. Just run the
_start_ command to and a development HTTP server will start in your computer,
accessible from your browser at the address `http://localhost:3000/`.

```sh
yarn start
```

[badge]: https://badge.fury.io/js/react-very-simple-data-table
[demo]: https://joaocarmo.com/react-very-simple-data-table/
[examples]: ./examples
[rsdt]: https://github.com/joaocarmo/react-smart-data-table

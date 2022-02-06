import PropTypes from 'prop-types'

const Link = ({ to, children }) => <a href={to}>{children}</a>

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default Link

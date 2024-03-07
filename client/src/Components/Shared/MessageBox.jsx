import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
const MessageBox = ({variant,children}) => {
  return (
    <Alert variant={variant||"info"}>{children}</Alert>
  )
}
MessageBox.propTypes = {variant: PropTypes.string, children: PropTypes.node};
export default MessageBox;
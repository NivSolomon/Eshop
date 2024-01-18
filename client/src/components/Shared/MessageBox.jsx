import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';

const MessageBox = ({variant, children}) => {
  return (
    <div>
      <Alert variant={variant || 'info'}>
        {children}
      </Alert>
    </div>
  )
}

export default MessageBox

MessageBox.propTypes = {variant: PropTypes.string, children: PropTypes.node}
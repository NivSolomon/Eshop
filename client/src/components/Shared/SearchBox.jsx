import React from 'react'
import Form from 'react-bootstrap/form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const SearchBox = () => {
  return (
    <Form>
        <InputGroup>
         <FormControl type='text' name='q' id='q' placeholder='Search for products' area-aria-describedby='button-search'>

         </FormControl>
        </InputGroup>
    </Form>
  )
}

export default SearchBox

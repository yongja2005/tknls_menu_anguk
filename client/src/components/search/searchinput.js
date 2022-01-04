import React, { Fragment, useRef, useState } from 'react'
import { Form, Input, Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { SEARCH_REQUEST } from '../../redux/types'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchInput = () => {
	const dispatch = useDispatch()
	const [form, setValues] = useState({ searchBy: "" });

	const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

	const onSubmit = async(e) => {
		await e.preventDefault()
		const {searchBy} = form

		dispatch({
			type: SEARCH_REQUEST,
			payload: searchBy,
		})

		console.log(searchBy, "Submit Body")
		resetValue.current.value = ""
	}
	const resetValue = useRef(null)

	return (
		<Fragment>
			<Form onSubmit={onSubmit} className="ms-auto d-flex" width="70%">
				<Input
					name="searchBy"
					onChange={onChange}
					innerRef={resetValue}
					width="70%"
				/>
				<Button
						color=""
						block
						className=""
				>
					<FontAwesomeIcon icon={faSearch} className="" color='white' />
				</Button>
			</Form>
		</Fragment>
	)
}

export default SearchInput
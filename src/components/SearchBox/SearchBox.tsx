import { Button, Form } from 'react-bootstrap'
import './SearchBox.css'
import { BsSearchHeart } from 'react-icons/bs'
import { ChangeEvent, useContext } from 'react'
import { SearchContext } from '../../context/SerchContext';

/* import { BsSearch } from 'react-icons/bs' */

export default function SearchBox() {

    const search = useContext(SearchContext);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        search?.setTerm(event.target.value);
    }

    return (
        <Form className="d-flex">
            <Form.Control
                id='serch-box'
                type="search"
                placeholder="Search"
                className="me-3"
                aria-label="Search"
                onChange={handleInputChange}
            />
            <Button variant="outline-secondary">
                <BsSearchHeart />
            </Button>
        </Form>
    )
}
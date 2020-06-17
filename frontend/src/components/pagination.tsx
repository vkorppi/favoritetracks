import React,{ MouseEventHandler } from 'react';
import { useSelector } from 'react-redux'
import { setPagination } from '../reducers/pagination'
import { TotalType, PaginationType } from '../type';
import { Pagination } from 'react-bootstrap';


const Resultpagination: React.FC<TotalType> = (props) => {

    const paginationState = (state: PaginationType) => state

    const data = useSelector(paginationState)
    
    const pages =[]


    const newPage = (event: MouseEvent) => {

        let pageButton =event.target as HTMLElement

        let pageNumber = Number(pageButton.innerText); 

        props.searchObject({ variables: { name:  data.pagination.searchvalue, page: pageNumber} })

    }
    
    for (let i = data.pagination.start; i < data.pagination.last+1; i++) {
        pages.push(i)
    }
    
    return (
        <Pagination>
           {pages.map((page: number) => (
                <Pagination.Item key={Math.ceil(Math.random() * 100000)} onClick={newPage}>{page}</Pagination.Item>
           ))}
        </Pagination>
    )
};


export default Resultpagination;
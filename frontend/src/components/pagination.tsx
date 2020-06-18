import React,{ MouseEventHandler } from 'react';
import { useSelector } from 'react-redux'
import { updatePagination,setPage } from '../reducers/pagination'
import { SearchAttributes, PaginationType } from '../type';
import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux'


const Resultpagination: React.FC<SearchAttributes> = (props) => {

    const paginationState = (state: PaginationType) => state

    const data = useSelector(paginationState)
    const dispatch = useDispatch()
    
    const pages =[]


    const newPage = (event: MouseEvent) => {

        let pageButton =event.target as HTMLElement
        let pageNumber
        
       
        if(pageButton.innerText.includes('»')) {
            pageNumber= data.pagination.last+1
        }
        else if(pageButton.innerText.includes('«')) {
            pageNumber= data.pagination.start-1
        }
        else {
            pageNumber = Number(pageButton.innerText); 
        }

         
        props.searchObject({ variables: { name:  data.pagination.searchvalue, page: pageNumber} })

        if(pageNumber > data.pagination.last) {
           
            dispatch(updatePagination(pageNumber,(pageNumber+9),pageNumber))
        }
        else if(pageNumber < data.pagination.start) {

            dispatch(updatePagination((pageNumber-9),pageNumber,pageNumber))

        }
        else {
            dispatch(setPage(pageNumber))
        }
        
    }
    
    for (let i = data.pagination.start; i < data.pagination.last+1; i++) {
        pages.push(i)
    }

    
    return (
        <Pagination>

            {data.pagination.start > 10 ? <Pagination.First onClick={newPage} /> : ''}

           {pages.map((page: number) => (
                <Pagination.Item active={page === data.pagination.currentPage} key={Math.ceil(Math.random() * 100000)} onClick={newPage}>{page}</Pagination.Item>
           ))}
          <Pagination.Last  onClick={newPage}  />
         
        </Pagination>
    )
};


export default Resultpagination;
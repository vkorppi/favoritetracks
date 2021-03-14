import React from 'react';
import { useSelector } from 'react-redux'
import { updatePagination,setPage } from '../../reducers/pagination'
import { SearchAttributes} from '../../type';
import { PaginationType} from '../../types/pagination'
import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux'


const Resultpagination: React.FC<SearchAttributes> = ({total,search}) => {

    const paginationState = (state: PaginationType) => state

    const data = useSelector(paginationState)
    const dispatch = useDispatch()
    
    const pages =[]


    const newPage = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {

        const pageButton =event.target as HTMLElement
        const pageValue=pageButton.innerText
        let pageNumber
        
       
        if(pageValue.includes('»')) {
            pageNumber= data.pagination.last+1
        }
        else if(pageValue.includes('«')) {
            pageNumber= data.pagination.start-1
        }
        else {
            pageNumber = Number(pageValue); 
        }

        search({ variables: { name:  data.pagination.searchvalue, page: pageNumber} })

        if(pageNumber > data.pagination.last) {

           
            dispatch(updatePagination({start:pageNumber,last:(pageNumber+9),currentPage:pageNumber}))
            
        }
        else if(pageNumber < data.pagination.start) {

            

            dispatch(updatePagination({start:(pageNumber-9),last:pageNumber,currentPage:pageNumber}))

        }
        else {
            dispatch(setPage({currentPage:pageNumber}))
        }
        
    }

    // Exception: page has less than ten rows
    let last = data.pagination.last
    last = total <  last ? total : last

    
    for (let i = data.pagination.start; i < last+1; i++) {
        pages.push(i)
    }
	
	console.log('total: '+ total+' data.pagination.last '+data.pagination.last)
	
	// Työn alla
	
    return (
        <Pagination>

            {data.pagination.start > 10 ? <Pagination.First onClick={newPage} /> : ''}

           {pages.map((page: number) => (
                <Pagination.Item active={page === data.pagination.currentPage} key={page} id={'page'+page} onClick={newPage}>{page}</Pagination.Item>
           ))}
          {total  <= data.pagination.last ? '' : <Pagination.Last  onClick={newPage}  />} 
         
        </Pagination>
    )
};


export default Resultpagination;
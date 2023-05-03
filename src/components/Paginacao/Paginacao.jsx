import { usePagination, DOTS } from "../../hooks/usePagination";
import classnames from "classnames";
import "./Paginacao.css"

export function Paginacao(props) {
    const {
        totalCount,
        currentPage,
        pageSize,
        onPageChange,
        siblingCount = 1,
        className
    } = props;
    
    const paginationRange = usePagination({ totalCount, pageSize, siblingCount, currentPage});

    console.log(currentPage)

    console.log(paginationRange);

    if(!paginationRange) {
        return null;
    }

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrev = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={classnames('pagination-container', { [className]: className })}>
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrev}
            >
                <div className="arrow left" />
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li key={index} className="pagination-item dots">&#8230;</li>;
                }

                return <li
                    className={classnames("pagination-item", {
                        selected: pageNumber === currentPage
                    })}
                    onClick={() => onPageChange(pageNumber)}
                    key={index}
                >
                    {pageNumber}
                </li>
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    );
}
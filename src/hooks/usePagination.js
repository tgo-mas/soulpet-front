import { useMemo } from "react"

export const DOTS = '...';

const range = (start, end) => {
    let length = end - start + 1;
    /*
        Cria um array de determinado tamanho e define os elementos dentro do valor de início (start) e de fim (end).
    */
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        const mostrarEsquerda = leftSiblingIndex > 2;
        const mostrarDireita = rightSiblingIndex < totalPageCount - 2;

        const firstPage = 1;
        const lastPage = totalPageCount;

        if (!mostrarEsquerda && mostrarDireita) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (mostrarEsquerda && !mostrarDireita) {
            let rightItemCount = 2 + 3 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );

            return [firstPage, DOTS, ...rightRange];
        }

        if (mostrarEsquerda && mostrarDireita) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
        }

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;

}
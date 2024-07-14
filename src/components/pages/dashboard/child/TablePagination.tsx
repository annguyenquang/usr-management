import { useContext, useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../ui/pagination";
import React from "react";
import { UserContext } from "../Dashboard";
import { getTailwindBreakPointValue } from "../../../../utils/helper";

type PaginationProps = {
    number_of_pages: number;
}

const TablePagination: React.FC<PaginationProps> = (props) => {
    const { page, setPage, rowPerPage, setRowPerPage, users, totalUsers } = useContext(UserContext);
    const [displayedPages, setDisplayedPages] = useState<number[]>([]);

    useEffect(() => {
        const lastPage = Math.ceil(totalUsers / rowPerPage);
        if (page <= props.number_of_pages / 2) {
            setDisplayedPages([...Array(props.number_of_pages)].map((_, i) => i + 1).filter((p) => p <= lastPage));
        } else {
            setDisplayedPages([...Array(props.number_of_pages)].map((_, i) => i + page - 2).filter((p) => p <= lastPage));
        }
    }, [page, users]);

    const toLastPage = () => {
        setPage(Math.ceil(totalUsers / rowPerPage));
    }

    return (
        <>
            {/* PC */}
            <div className="hidden md:flex p-x-1">
                <Pagination className="w-fit">
                    <PaginationContent>
                        <PaginationItem onClick={() => { if (page !== 1) { setPage(page - 1) } }}>
                            <PaginationPrevious mobile={false} className="hover:text-blue-500" href="#" size={100} />
                        </PaginationItem>
                        {
                            displayedPages.map((p) => {
                                return (
                                    <PaginationItem onClick={() => { setPage(p) }} key={p}>
                                        <PaginationLink className={`${p == page && "bg-orange-400"} rounded-full hover:bg-slate-400`} isActive={p == page} size={undefined} href="#">{p}</PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        {!displayedPages.includes(Math.ceil(totalUsers / rowPerPage))
                            &&
                            <PaginationItem className="rounded hover:bg-slate-400" onClick={toLastPage}>
                                <PaginationEllipsis className="text-white" />
                            </PaginationItem>
                        }
                        <PaginationItem className="rounded p-1" onClick={() => {
                            if (page <= Math.ceil(totalUsers / rowPerPage)) {
                                setPage(page + 1);
                            }
                        }}>
                            <PaginationNext mobile={false} className="hover:text-blue-500" href="#" size={0} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                <div className="flex-1 flex flex-row justify-end space-x-1 items-center">
                    <label htmlFor="rows" className="mr-2 hidden md:block">Shows: </label>
                    {/* <select className="border-[3px] p-1 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setRowsPerPage(parseInt(e.currentTarget.value)) }}> */}
                    <select className="border-[3px] text-xs md:text-base  border-stone-300  rounded bg-transparent text-white" onChange={(e) => { setRowPerPage(parseInt(e.currentTarget.value)) }}>
                        <option className="bg-black" value={15}>15 rows</option>
                        <option className="bg-black" value={20}>20 rows</option>
                        <option className="bg-black" value={30}>30 rows</option>
                    </select>
                </div>
            </div>
            {/* MOBILE */}
            <div className="md:hidden flex p-x-1 items-center">
                <Pagination className="flex-1">
                    <PaginationContent>
                        <PaginationItem onClick={() => { if (page !== 1) { setPage(page - 1) } }}>
                            <PaginationPrevious mobile className="hover:text-blue-500" href="#" size={100} />
                        </PaginationItem>
                        {
                            displayedPages.map((p) => {
                                return (
                                    <PaginationItem onClick={() => { setPage(p) }} key={p}>
                                        <PaginationLink className={`${p == page && "bg-orange-400"} rounded-full w-[20px] h-[20px] hover:bg-slate-400`} isActive={p == page} size={undefined} href="#">{p}</PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        {!displayedPages.includes(Math.ceil(totalUsers / rowPerPage))
                            &&
                            <PaginationItem className="rounded hover:bg-slate-400" onClick={toLastPage}>
                                <PaginationEllipsis className="text-white" />
                            </PaginationItem>
                        }
                        <PaginationItem className="rounded p-1" onClick={() => {
                            if (page <= Math.ceil(totalUsers / rowPerPage)) {
                                setPage(page + 1);
                            }
                        }}>
                            <PaginationNext mobile className="hover:text-blue-500" href="#" size={0} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                <div className="flex-1 flex flex-row justify-end space-x-1 items-center">
                    <label htmlFor="rows" className="mr-2 hidden md:block">Shows: </label>
                    {/* <select className="border-[3px] p-1 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setRowsPerPage(parseInt(e.currentTarget.value)) }}> */}
                    <select className="border-[3px] text-xs md:text-base  border-stone-300  rounded bg-transparent text-white" onChange={(e) => { setRowPerPage(parseInt(e.currentTarget.value)) }}>
                        <option className="bg-black" value={15}>15 rows</option>
                        <option className="bg-black" value={20}>20 rows</option>
                        <option className="bg-black" value={30}>30 rows</option>
                    </select>
                </div>
            </div>

        </>
    )
};

export default TablePagination;
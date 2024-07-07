import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../ui/pagination";
import User from "../../../../types/User";
import React from "react";

type PaginationProps = {
    users: User[];
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
    page: number;
    setPage: (page: number) => void;
}
const TablePagination: React.FC<PaginationProps> = (props) => {
    const NUMBER_OF_PAGES = 5;
    const [displayedPages, setDisplayedPages] = useState<number[]>([]);
    useEffect(() => {
        console.log("page", props.page);
        let dpage: number[] = [];
        if (props.page > NUMBER_OF_PAGES / 2) {
            for (let i = props.page - Math.floor(NUMBER_OF_PAGES / 2); i < props.page + Math.floor(NUMBER_OF_PAGES / 2); i++) {
                dpage.push(i);
            }
        }
        else {
            dpage.push(...[...Array(NUMBER_OF_PAGES).keys()].map((i) => i + 1));
        }
        const lastPage = Math.ceil(props.users.length / props.rowsPerPage);
        console.log("last page", lastPage);
        if (dpage[dpage.length - 1] > lastPage) {
            dpage = dpage.map((page) => page - (dpage[dpage.length - 1] - lastPage));
        }
        setDisplayedPages(dpage);
    }, [props.page, props.users]);
    return (
        <div className="flex p-x-2 items-center">
            <Pagination className="flex-1">
                <PaginationContent>
                    <PaginationItem onClick={() => { if (props.page !== 1) { props.setPage(props.page - 1) } }}>
                        <PaginationPrevious className="hover:text-blue-500" href="#" size={100} />
                    </PaginationItem>
                    {
                        displayedPages.map((page) => {
                            return (
                                <PaginationItem onClick={() => { props.setPage(page) }} key={page}>
                                    <PaginationLink className={`${page == props.page ? "bg-orange-400" : ""}`} isActive={page == props.page} href="#" size={undefined}>{page}</PaginationLink>
                                </PaginationItem>
                            )
                        })
                    }
                    <PaginationItem>
                        <PaginationEllipsis className="text-white" />
                    </PaginationItem>
                    <PaginationItem className="rounded p-1" onClick={() => {
                        if (props.page < Math.ceil(props.users.length / props.rowsPerPage)) {
                            props.setPage(props.page + 1);
                        }
                    }}>
                        <PaginationNext className="hover:text-blue-500" href="#" size={0} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="flex-1 flex flex-row justify-end space-x-1 items-center">
                <label htmlFor="rows" className="mr-2">Shows: </label>
                {/* <select className="border-[3px] p-1 bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { props.setRowsPerPage(parseInt(e.currentTarget.value)) }}> */}
                <select className="border-[3px] border-stone-300  rounded bg-transparent text-white" onChange={(e) => { props.setRowsPerPage(parseInt(e.currentTarget.value)) }}>
                    <option className="bg-black" value={15}>15 rows</option>
                    <option className="bg-black" value={20}>20 rows</option>
                    <option className="bg-black" value={30}>30 rows</option>

                </select>
            </div>
        </div>
    )
};

export default TablePagination;
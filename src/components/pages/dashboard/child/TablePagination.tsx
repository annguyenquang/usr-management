import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../ui/pagination";
import User from "../../../../types/User";

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
        console.log(lastPage);
        if (dpage[dpage.length - 1] > lastPage) {
            dpage = dpage.map((page) => page - (dpage[dpage.length - 1] - lastPage));
        }
        setDisplayedPages(dpage);
    }, [props.page]);
    return (
        <div className="flex p-x-2 items-center">
            <Pagination className="flex-1">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" size={100} />
                    </PaginationItem>
                    {
                        displayedPages.map((page) => {
                            return (
                                <PaginationItem onClick={() => { props.setPage(page) }} key={page}>
                                    <PaginationLink className="hover:bg-orange-400" isActive={page == props.page} href="#" size={undefined}>{page}</PaginationLink>
                                </PaginationItem>
                            )
                        })
                    }
                    {/* <PaginationItem>
                    <PaginationLink href="#" size={undefined}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive size={undefined}>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" size={undefined}>3</PaginationLink>
                </PaginationItem>*/}
                    { }
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" size={0} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="flex-1 flex flex-row justify-end space-x-1 items-center">
                <label htmlFor="rows" className="text-center">Shows</label>
                <select className="border-[3px] p-1" onChange={(e) => { props.setRowsPerPage(parseInt(e.currentTarget.value)) }}>
                    <option value={5}>5 rows</option>
                    <option value={10}>10 rows</option>
                    <option value={15}>15 rows</option>
                </select>
            </div>
        </div>
    )
};

export default TablePagination;
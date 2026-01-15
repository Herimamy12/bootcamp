interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-center">
            <div className="join">
                <button
                    className="join-item btn btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    «
                </button>

                <button className="join-item btn btn-sm btn-active">
                    {currentPage} / {totalPages}
                </button>

                <button
                    className="join-item btn btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    »
                </button>
            </div>
        </div>
    );
}
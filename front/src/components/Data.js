import {
    Box,
    Button,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
    useGlobalFilter,
    useSortBy,
    useTable,
    usePagination,
    useFilters,
} from "react-table";
import { deleteCar, fetchCars } from "../features/cars/carsSlice";
import { GlobalFilter } from "./globalFilter";

const Data = ({ data }) => {
    const dispatch = useDispatch();

    const handleDelete =  async  (id) => {
        try {
            await dispatch(deleteCar({ id: id })).unwrap();
            dispatch(fetchCars());
        } catch (err) {
            console.error("Failed to delete the post", err);
        }
    };

    const productsData = useMemo(() => [...data], [data]);

    const productsColumns = useMemo(
        () =>
            data[0]
                ? Object.keys(data[0])
                    
                    .map((key) => {
                        return { Header: key, accessor: key };
                    })
                : [],
        [data]
    );

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Edit",
                Header: "Edycja",
                Cell: ({ row }) => (
                    <Link to={`/edit/${row.values.id}`}>
                        <Button>Edycja</Button>
                    </Link>
                ),
            },
            {
                id: "Delete",
                Header: "Usuń",
                Cell: ({ row }) => (
                    <Button onClick={() => handleDelete(row.values.id)}>Usuń</Button>
                ),
            },
        ]);
    };

    const tableInstance = useTable(
        {
            columns: productsColumns,
            data: productsData,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useGlobalFilter,
        tableHooks,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, pageSize },
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = tableInstance;

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
            />
            <TableContainer width={'100%'}>
                <Table
                    variant="striped"
                    colorScheme="blackAlpha"
                    size="lg"
                    {...getTableProps()}
                >
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            // eslint-disable-next-line react/jsx-key
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <Th
                                        textAlign={"center"}
                                        fontSize={"xl"}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render("Header")}
                                        {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);

                            return (
                                // eslint-disable-next-line react/jsx-key
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            // eslint-disable-next-line react/jsx-key
                                            <Td
                                                textAlign={"center"}
                                                fontSize={"medium"}
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render("Cell")}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Box
                display={"flex"}
                alignContent="center"
                alignItems={"center"}
                width="100%"
                justifyContent={"center"}
                mt={2}
            >
                <Box mr={2}>
                    <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {"<<"}
                    </Button>{" "}
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {"<"}
                    </Button>{" "}
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        {">"}
                    </Button>{" "}
                    <Button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {">>"}
                    </Button>{" "}
                    <Text as="span">
            Strona <Text as="strong">{pageIndex + 1}</Text> z{" "}
                        {pageOptions.length}
                    </Text>
                </Box>
                <Select
                    flexBasis={"15%"}
                    as={"select"}
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 25, 50, 100].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
              Pokaż {pageSize}
                        </option>
                    ))}
                </Select>
            </Box>
        </>
    );
};

export default Data;

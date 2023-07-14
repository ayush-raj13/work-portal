import { Fragment } from "react";

function Table({ data, config }) {
    const renderedHeaders = config.map((column) => {
        return (
            ( column.header && <Fragment key={column.label}>{column.header()}</Fragment> ) || <th valign='bottom' key={column.label}>{column.label}</th>
        )
    });

    const renderedRows = data.map((item) => {
        const renderedCells = config.map((column) => {
            return (
                <td key={column.label} className="p-3">{column.render(item)}</td>
            );
        });

        return (
            <tr className="border-b" key={item._id}>
                {renderedCells}
            </tr>
        );
    });

    return (
        <table className="table-auto border-spacing-2">
            <thead>
                <tr className="border-b-2">
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>{renderedRows}</tbody>
        </table>
    );
}

export default Table
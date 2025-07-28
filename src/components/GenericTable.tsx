import { GenericTableProps } from "../types/user-dashboard";

export default function GenericTable<T extends Record<string, any>>({
  headers,
  rows,
  getRowKey,
  className,
}: GenericTableProps<T>) {
  return (
    <div className={`w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-sm bg-white ${className ?? ""}`}>
      <table className="min-w-full text-center border-separate border-spacing-0">
        <thead>
          <tr className="bg-[#F5F8FB] text-gray-600 text-xs whitespace-nowrap">
            {headers.map((header, i) => (
              <th
                key={header}
                className={`py-3 px-4 font-semibold border-b border-gray-200 
                  ${i === 0 ? 'rounded-tl-xl' : ''}
                  ${i === headers.length - 1 ? 'rounded-tr-xl' : ''}
                `}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700 text-xs">
          {rows.map((row, rowIdx) => (
            <tr key={getRowKey ? getRowKey(row, rowIdx) : rowIdx}>
              {Object.values(row).map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className="py-2 px-4 border-b border-gray-100 font-medium whitespace-nowrap"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
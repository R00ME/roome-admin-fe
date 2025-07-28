import GenericTable from "../../../../components/GenericTable";
import { abnormalHeaders, abnormalRows } from "../../constants/abnormalData";

export default function SummaryTab({ drawerWidth }: { drawerWidth: number }) {
  return (
    <div className="flex flex-row items-center justify-center gap-5">
      {/* 차트 */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center" />
      </div>
      {/* 표 */}
      {drawerWidth > 900 && (
        <div className="flex flex-1 justify-center items-center">
          <GenericTable headers={abnormalHeaders} rows={abnormalRows} />
        </div>
      )}
    </div>
  );
}

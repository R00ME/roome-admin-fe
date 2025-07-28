import example from '@/assets/images/example.png';
import GenericTable from '../../../../components/GenericTable.tsx';
import {
  preferredFunctionHeaders,
  preferredFunctionRows,
} from '../../constants/preferredFunctions.ts.ts';

export default function PreferredFunctions({
  drawerWidth,
}: {
  drawerWidth: number;
}) {
  return (
    <section className='w-full bg-[#f8f8f8c5] rounded-xl px-14 py-8 '>
      <h2 className='font-semibold text-[#293F66] mb-2'>선호하는 기능</h2>
      <div className='flex gap-18 justify-center items-center'>
        {drawerWidth > 900 && (
          <img
            src={example}
            alt=''
            className='w-40 h-40'
          />
        )}
        <GenericTable
          rows={preferredFunctionRows}
          headers={preferredFunctionHeaders}
        />
      </div>
    </section>
  );
}

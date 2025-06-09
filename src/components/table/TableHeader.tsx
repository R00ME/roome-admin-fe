import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TableHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tabs?: {
    value: string;
    label: string;
  }[];
  defaultTab?: string;
}

const TableHeader = ({
  icon: Icon,
  title,
  tabs,
  defaultTab,
}: TableHeaderProps) => {
  return (
    <div className='flex items-center justify-between gap-2 mb-6'>
      <div className='flex items-center gap-2'>
        <Icon className='w-6 h-6 text-blue-500' />
        <h2 className='text-2xl font-semibold text-blue-500'>{title}</h2>
      </div>

      {tabs && (
        <Tabs
          defaultValue={defaultTab || tabs[0]?.value}
          className=' py-2'>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                className='cursor-pointer'
                key={tab.value}
                value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  );
};

export default TableHeader;

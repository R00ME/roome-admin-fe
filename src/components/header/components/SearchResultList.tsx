import { SearchItem } from '@/constants/search-items';

interface SearchResultListProps {
  items: SearchItem[];
  onSelect: (item: SearchItem) => void;
  selectedIndex: number;
}

const SearchResultList = ({
  items,
  onSelect,
  selectedIndex,
}: SearchResultListProps) => (
  <div className='max-h-[300px] overflow-auto rounded-lg bg-white'>
    {items.length === 0 ? (
      <div className='py-6 text-center text-sm text-gray-500'>
        검색 결과가 없습니다.
      </div>
    ) : (
      <div className='p-2'>
        <div className='px-2 py-1.5 text-sm font-medium text-gray-500'>
          서비스 자원
        </div>
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`px-2 py-1.5 rounded-md cursor-pointer ${
              index === selectedIndex
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-blue-50'
            }`}>
            <div className='font-medium text-gray-700'>{item.title}</div>
            <div className='text-sm text-gray-500'>{item.description}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default SearchResultList;

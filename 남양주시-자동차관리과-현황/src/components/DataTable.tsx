import { useState, useMemo } from 'react';
import { Search, Phone, MapPin } from 'lucide-react';
import { cn } from '../App';

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: any, item: T) => React.ReactNode;
  }[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
}

export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  searchKey,
  searchPlaceholder = '검색...'
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm || !searchKey) return data;
    return data.filter(item => {
      const val = item[searchKey];
      return String(val).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchKey]);

  const renderCellValue = (col: typeof columns[0], value: any, item: T) => {
    if (col.render) {
      return col.render(value, item);
    }

    // Auto-detect phone column or phone numbers for direct calling on mobile/desktop
    if (
      col.key === 'phone' || 
      (typeof value === 'string' && /^[\d-]{8,15}$/.test(value.trim()))
    ) {
      const rawNum = String(value).replace(/[^0-9]/g, '');
      if (rawNum.length >= 8) {
        return (
          <a
            href={`tel:${rawNum}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200/80 transition-colors shrink-0"
            title={`${value} 바로 전화걸기`}
            onClick={(e) => e.stopPropagation()}
          >
            <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{value}</span>
          </a>
        );
      }
    }

    // Auto-detect address column or address text for Naver Map search
    if (
      col.key === 'address' || 
      col.header === '소재지' || 
      col.header === '주소'
    ) {
      const addressStr = String(value);
      const searchQuery = addressStr.includes('남양주') ? addressStr : `남양주시 ${addressStr}`;
      const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(searchQuery)}`;

      return (
        <a
          href={naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-800 hover:text-blue-600 hover:underline group font-medium"
          title={`${addressStr} - 네이버 지도에서 위치 보기`}
          onClick={(e) => e.stopPropagation()}
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
          <span>{addressStr}</span>
        </a>
      );
    }

    return value;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {searchKey && (
        <div className="pb-3">
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm transition-shadow"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto flex-1 border border-slate-200/80 rounded-xl shadow-xs">
        <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-200 bg-slate-50 font-semibold">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700 divide-y divide-slate-100">
            {filteredData.length > 0 ? (
              filteredData.map((item, i) => (
                <tr key={item.id || i} className="hover:bg-slate-50/80 transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-3 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap font-medium">
                      {renderCellValue(col, item[col.key], item)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-xs sm:text-sm text-slate-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="pt-3 flex justify-between items-center text-xs text-slate-500 font-medium">
        <span>총 {filteredData.length}건</span>
        <span className="text-[11px] text-blue-600 sm:hidden">Tip: 전화번호/주소 클릭 시 연결 및 네이버지도 검색</span>
      </div>
    </div>
  );
}

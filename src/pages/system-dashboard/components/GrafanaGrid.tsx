import GrafanaPanel from './GrafanaPanel';
import React from 'react';

type GridItem = Omit<
  React.ComponentProps<typeof GrafanaPanel>,
  'className' | 'width'
> & {
  key: string;
  gridColumn?: string;
  gridRow?: string;
  minHeight?: number;
};

type GrafanaGridProps = {
  items: GridItem[];
  columns?: string;
  gap?: number | string;
  className?: string;
  reorderable?: boolean;
  order?: string[];
  onOrderChange?: (next: string[]) => void;
};

export default function GrafanaGrid({
  items,
  columns = 'repeat(12, minmax(0, 1fr))',
  gap = 12,
  className,
  reorderable = false,
  order,
  onOrderChange,
}: GrafanaGridProps) {
  const [draggingKey, setDraggingKey] = React.useState<string | null>(null);
  const orderedItems = React.useMemo(() => {
    if (!order || order.length === 0) return items;
    const map = new Map(items.map((it) => [it.key, it]));
    const arranged: GridItem[] = [];
    order.forEach((k) => {
      const v = map.get(k);
      if (v) arranged.push(v);
    });
    items.forEach((it) => {
      if (!order.includes(it.key)) arranged.push(it);
    });
    return arranged;
  }, [items, order]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, key: string) => {
    if (!reorderable) return;
    e.dataTransfer.setData('text/plain', key);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingKey(key);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetKey: string,
  ) => {
    if (!reorderable || !onOrderChange) return;
    e.preventDefault();
    const sourceKey = e.dataTransfer.getData('text/plain');
    if (!sourceKey || sourceKey === targetKey) return;
    const current = (
      order && order.length ? order : orderedItems.map((it) => it.key)
    ).slice();
    const from = current.indexOf(sourceKey);
    const to = current.indexOf(targetKey);
    if (from === -1 || to === -1) return;
    current.splice(to, 0, ...current.splice(from, 1));
    onOrderChange(current);
    setDraggingKey(null);
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!reorderable) return;
    e.preventDefault();
  };
  const handleDragEnd = () => {
    if (!reorderable) return;
    setDraggingKey(null);
  };
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap: typeof gap === 'number' ? `${gap}px` : gap,
      }}>
      {orderedItems.map(
        ({ key, gridColumn, gridRow, minHeight, ...panelProps }) => (
          <div
            key={key}
            style={{
              gridColumn,
              gridRow,
              minHeight: minHeight ? `${minHeight}px` : undefined,
            }}
            draggable={reorderable}
            onDragStart={(e) => handleDragStart(e, key)}
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, key)}
            onDragEnd={handleDragEnd}>
            <GrafanaPanel
              {...panelProps}
              className={draggingKey ? 'pointer-events-none' : undefined}
              width='100%'
            />
          </div>
        ),
      )}
    </div>
  );
}

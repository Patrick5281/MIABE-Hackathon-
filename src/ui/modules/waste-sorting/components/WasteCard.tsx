import React from 'react';
import { Box } from '@/ui/design-system/box/box';
import { Typography } from '@/ui/design-system/typography/typography';
import Image from 'next/image';
import { Tooltip } from '@/ui/design-system/tooltip/tooltip';
import { WasteItem } from '@/services/waste-management';

interface WasteCardProps {
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    items?: WasteItem[];
  };
  onClick: () => void;
  isSelected: boolean;
}

export const WasteCard: React.FC<WasteCardProps> = ({
  category,
  onClick,
  isSelected,
}) => {
  return (
    <Tooltip content={category.description}>
      <div
        className={`relative cursor-pointer card-hover rounded-lg p-6 ${
          isSelected
            ? 'ring-2 ring-offset-2 ring-primary shadow-lg'
            : 'hover:shadow-xl'
        } bg-${category.color}-50 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="relative w-16 h-16">
            <Image
              src={category.icon}
              alt={category.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <Typography
            variant="caption1"
            weight="medium"
            className="text-center"
          >
            {category.name}
          </Typography>
          {category.items && category.items.length > 0 && (
            <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
              <Typography variant="caption2">
                {category.items.length}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Tooltip>
  );
}; 
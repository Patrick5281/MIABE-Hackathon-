import React from 'react';
import { Input } from '@/ui/design-system/forms/input';
import { Button } from '@/ui/design-system/button/button';
import { Select } from '@/ui/design-system/forms/select';
import { Search, Filter, Download } from 'lucide-react';

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: {
    dateDebut?: string;
    dateFin?: string;
    typeDechet?: string;
    statut?: string[];
  }) => void;
  onExport?: (format: 'csv' | 'pdf') => void;
  showExport?: boolean;
  typeDechets?: Array<{ id: string; nom: string }>;
  statuts?: Array<{ value: string; label: string }>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onFilter,
  onExport,
  showExport = false,
  typeDechets = [],
  statuts = []
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dateDebut, setDateDebut] = React.useState('');
  const [dateFin, setDateFin] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedStatuts, setSelectedStatuts] = React.useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleFilter = () => {
    onFilter?.({
      dateDebut,
      dateFin,
      typeDechet: selectedType,
      statut: selectedStatuts
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Barre de recherche */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Input
              type="search"
              placeholder="Rechercher une mission..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </form>

        {/* Boutons */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            action={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtres
          </Button>

          {showExport && (
            <div className="relative group">
              <Button
                variant="secondary"
                action={() => {}}
              >
                <Download className="h-5 w-5 mr-2" />
                Exporter
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <div className="py-1">
                  <button
                    onClick={() => onExport?.('csv')}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Exporter en CSV
                  </button>
                  <button
                    onClick={() => onExport?.('pdf')}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Exporter en PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Panneau de filtres */}
      {isFilterOpen && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Input
                type="date"
                label="Date début"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="date"
                label="Date fin"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
              />
            </div>
            <div>
              <Select
                label="Type de déchet"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Tous les types</option>
                {typeDechets.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.nom}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                label="Statut"
                value={selectedStatuts}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedStatuts(
                    selectedStatuts.includes(value)
                      ? selectedStatuts.filter((s) => s !== value)
                      : [...selectedStatuts, value]
                  );
                }}
                multiple
              >
                {statuts.map((statut) => (
                  <option key={statut.value} value={statut.value}>
                    {statut.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              action={() => {
                setDateDebut('');
                setDateFin('');
                setSelectedType('');
                setSelectedStatuts([]);
                onFilter?.({});
              }}
            >
              Réinitialiser
            </Button>
            <Button
              variant="accent"
              action={handleFilter}
            >
              Appliquer les filtres
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar; 
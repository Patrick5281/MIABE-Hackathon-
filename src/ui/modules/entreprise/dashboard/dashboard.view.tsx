import React from 'react';
import { DeclarationDechetEntreprise, StatistiquesEntreprise } from '@/types/entreprise';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Loader2, TrendingUp, Droplet, Zap, TreePine } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardViewProps {
  declarations: DeclarationDechetEntreprise[];
  statistiques: StatistiquesEntreprise | null;
  loading: boolean;
  error: string | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C43'];

const DashboardView: React.FC<DashboardViewProps> = ({
  declarations,
  statistiques,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!statistiques) {
    return null;
  }

  const pieData = Object.entries(statistiques.repartitionParType).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total des déchets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-2xl font-bold">{statistiques.totalDechetsKg.toLocaleString()} kg</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CO2 évité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TreePine className="h-4 w-4 text-green-500" />
              <p className="text-2xl font-bold">{statistiques.impactEnvironnemental.co2Evite.toLocaleString()} kg</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eau économisée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <p className="text-2xl font-bold">{statistiques.impactEnvironnemental.eauEconomisee.toLocaleString()} L</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Énergie économisée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <p className="text-2xl font-bold">{statistiques.impactEnvironnemental.energieEconomisee.toLocaleString()} kWh</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Évolution mensuelle des déchets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={statistiques.evolutionMensuelle}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="quantite"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par type de déchet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des dernières déclarations */}
      <Card>
        <CardHeader>
          <CardTitle>Dernières déclarations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Quantité</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {declarations.map((declaration) => (
                  <tr key={declaration.id}>
                    <td className="px-4 py-2">{declaration.type}</td>
                    <td className="px-4 py-2">
                      {declaration.quantite} {declaration.unite}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(declaration.dateDeclaration).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          declaration.statut === 'valide'
                            ? 'bg-green-100 text-green-800'
                            : declaration.statut === 'en_attente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {declaration.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView; 
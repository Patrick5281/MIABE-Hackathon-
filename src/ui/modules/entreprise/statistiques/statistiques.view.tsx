import React from 'react';
import { StatistiquesEntreprise } from '@/types/entreprise';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/design-system/card/card';
import { Loader2, TrendingUp, Droplet, Zap, TreePine, Truck } from 'lucide-react';
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
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface StatistiquesViewProps {
  statistiques: StatistiquesEntreprise | null;
  loading: boolean;
  error: string | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C43'];

const StatistiquesView: React.FC<StatistiquesViewProps> = ({
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
      <h1 className="text-3xl font-bold mb-8">Statistiques détaillées</h1>

      {/* KPIs */}
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
            <CardTitle>Collectes effectuées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-blue-500" />
              <p className="text-2xl font-bold">{statistiques.totalCollectes}</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Évolution mensuelle des déchets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statistiques.evolutionMensuelle}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantite" fill="#8884d8" name="Quantité (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par type de déchet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact environnemental */}
      <Card>
        <CardHeader>
          <CardTitle>Impact environnemental détaillé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <TreePine className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-lg font-semibold">CO2 évité</p>
              <p className="text-2xl font-bold text-green-600">
                {statistiques.impactEnvironnemental.co2Evite.toLocaleString()} kg
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <Droplet className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-lg font-semibold">Eau économisée</p>
              <p className="text-2xl font-bold text-blue-600">
                {statistiques.impactEnvironnemental.eauEconomisee.toLocaleString()} L
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
              <Zap className="h-8 w-8 text-yellow-500 mb-2" />
              <p className="text-lg font-semibold">Énergie économisée</p>
              <p className="text-2xl font-bold text-yellow-600">
                {statistiques.impactEnvironnemental.energieEconomisee.toLocaleString()} kWh
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatistiquesView; 
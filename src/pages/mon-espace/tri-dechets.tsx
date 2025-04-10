import { useState, useEffect } from 'react';
import { Box } from '@/ui/design-system/box/box';
import { Typography } from '@/ui/design-system/typography/typography';
import { Button } from '@/ui/design-system/button/button';
import { WasteCard } from '@/ui/modules/waste-sorting/components/WasteCard';
import { ImageUpload } from '@/ui/modules/waste-sorting/components/ImageUpload';
import { Select } from '@/ui/design-system/forms/select';
import { toast } from 'react-toastify';
import { wasteManagementService, WasteCategory, WasteItem } from '@/services/waste-management';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

interface FormData {
  categoryId: string;
}

export default function TriDechets() {
  const [categories, setCategories] = useState<WasteCategory[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categoryItems, setCategoryItems] = useState<Record<string, WasteItem[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      categoryId: ''
    }
  });

  const selectedCategory = watch('categoryId');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadCategoryItems(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const data = await wasteManagementService.getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des catégories");
    }
  };

  const loadCategoryItems = async (categoryId: string) => {
    try {
      const items = await wasteManagementService.getWastesByCategory(categoryId);
      setCategoryItems(prev => ({
        ...prev,
        [categoryId]: items
      }));
    } catch (error) {
      toast.error("Erreur lors du chargement des déchets");
    }
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedImage) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    setIsLoading(true);
    try {
      await wasteManagementService.addWaste(data.categoryId, selectedImage);
      await loadCategoryItems(data.categoryId);
      toast.success("Déchet trié avec succès !");
      setSelectedImage(null);
    } catch (error) {
      toast.error("Erreur lors de l'ajout du déchet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="max-w-7xl mx-auto p-6">
      <Typography variant="h2" className="mb-8">
        Trier mes déchets
      </Typography>

      {/* Section des catégories */}
      <div className="mb-8">
        <Typography variant="h3" className="mb-4">
          Catégories de déchets
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <WasteCard
              key={category.id}
              category={{
                ...category,
                items: categoryItems[category.id]
              }}
              onClick={() => {}}
              isSelected={selectedCategory === category.id}
            />
          ))}
        </div>
      </div>

      {/* Section de tri */}
      <Box className="bg-gray-50 p-6 rounded-lg">
        <Typography variant="h3" className="mb-4">
          Trier un nouveau déchet
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
          <div>
            <Typography variant="caption1" className="mb-2">
              Photo du déchet
            </Typography>
            <ImageUpload onImageSelect={handleImageSelect} />
          </div>

          <div>
            <Select
              id="categoryId"
              label="Sélectionner la catégorie"
              register={register}
              errors={errors}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>

            <Button
              variant="secondary"
              type="submit"
              disabled={!selectedCategory || !selectedImage || isLoading}
            >
              {isLoading ? 'Chargement...' : 'Confirmer le tri'}
            </Button>
          </div>
        </form>
      </Box>

      {/* Affichage des déchets de la catégorie sélectionnée */}
      {selectedCategory && categoryItems[selectedCategory] && (
        <Box className="mt-8">
          <Typography variant="h3" className="mb-4">
            Déchets triés - {categories.find(c => c.id === selectedCategory)?.name}
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryItems[selectedCategory].map((item) => (
              <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={item.image_url}
                  alt="Déchet trié"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <Typography variant="caption2" className="text-white">
                    {new Date(item.created_at).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Box>
      )}
    </Box>
  );
} 
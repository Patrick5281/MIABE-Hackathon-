
import React from 'react';
import { Box } from '@/ui/design-system/box/box';
import { Typography } from '@/ui/design-system/typography/typography';
import { Card, CardContent } from '@/ui/design-system/card/card';
import { Input } from '@/ui/design-system/forms/input';
import { Button } from '@/ui/design-system/button/button';
import { useForm } from 'react-hook-form';

export const WasteDeclaration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box className="max-w-2xl mx-auto">
      <Typography variant="h2" className="mb-6">
        Déclarer un déchet
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Type de déchet"
                placeholder="Ex: Plastique, Verre, etc."
                {...register('wasteType', { required: 'Ce champ est requis' })}
                error={errors.wasteType?.message}
              />
            </div>
            <div>
              <Input
                label="Quantité (kg)"
                type="number"
                placeholder="Ex: 5"
                {...register('quantity', { required: 'Ce champ est requis' })}
                error={errors.quantity?.message}
              />
            </div>
            <Button type="submit" variant="primary">
              Déclarer
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

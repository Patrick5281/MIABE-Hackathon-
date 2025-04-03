import { FormsType } from "@/types/forms";
import { Button } from "@/ui/design-system/button/button";
import { Input } from "@/ui/design-system/forms/input";


interface Props {
    form: FormsType;
}

export const Registerform = ({ form }: Props) => {
    const{control, onSubmit, errors, register, isLoading, handleSubmit} = form;
    console.log ("form", form); 
    console.log("isLoading:", isLoading);  // Vérifier si isLoading change bien 
    return(
<form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
      <Input
      isLoading={isLoading}
      placeholder="johnsmith@gmail.com"
      type = "email"
      register={register}
      errors={errors}
      errorMsg="Tu dois renseigner ce champ"
      required
      id="email"
      />
      <Input
      isLoading={isLoading}
      placeholder="Mot de passe"
      type = "password"
      register={register}
      errors={errors}
      errorMsg="Tu dois renseigner ce champ"
      required
      id="password"
      />
<Input
      isLoading={isLoading}
      placeholder="Comment nous a tu-connu ?"
      register={register}
      errors={errors}
      errorMsg="Tu dois renseigner ce champ"
      required
      id="how_did_hear"
      />


  <Button type="submit" disabled={isLoading} isLoading={isLoading} fullwith >
    S'inscrire
  </Button>
</form>

    )
}
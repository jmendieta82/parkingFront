import Layout from "../components/common/Layout.tsx";
import {Button, Card, CardBody, CardHeader, Divider, Input} from "@nextui-org/react";
import CardParking from "../components/common/CardParking.tsx";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";


const PageHome = () => {
  const {register, handleSubmit} = useForm()
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());
  const submitHandler = (data:any) => {
    console.log(data)
  }

  useEffect(() => {
    const timer = setInterval(()=>{
      setHoraActual(new Date().toLocaleTimeString());
    }, 5000);
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <div className='flex flex-col gap-6'>
        <Card>
          <CardHeader className='flex flex-col'>
            <span className='p-4 text-xl'>Registro de Automoviles</span>
            <span>{horaActual}</span>
            <Divider/>
          </CardHeader>
          <CardBody>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitHandler)}>
              <Input type="text" label="Propietario" {...register('owner')} />
              <Input type="text" label="Automovil" {...register('car')}/>
              <Input type="text" label="Lugar" {...register('parking_spot')}/>
              <Button type='submit' className='btn-primary'>Guardar</Button>
            </form>
          </CardBody>
        </Card>
        <div className='grid grid-cols-4 gap-2'>
          <CardParking/>
          <CardParking/>
          <CardParking/>
          <CardParking/>
          <CardParking/>
        </div>
      </div>
    </Layout>
  );
};

export default PageHome;
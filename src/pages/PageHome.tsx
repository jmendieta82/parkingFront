import Layout from "../components/common/Layout.tsx";
import { Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import CardParking from "../components/common/CardParking.tsx";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {post} from "../shared/api.tsx";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";


const PageHome = () => {
  const {register, handleSubmit} = useForm()
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());
  const submitHandler = (data:any) => {
    console.log(data)
  }
  useEffect(() => {
    const timer = setInterval(()=>{
      setHoraActual(new Date().toLocaleTimeString());
    }, 1000);
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);
  const [owner, setOwners] = useState<any>({})

  const getPropietarioByCel = async (value:any) =>{

    if(value.value.length == 10){
      let obj={
        'phone':value.value,
      }
      try{
        const response = await post('searchByCel',obj)
        setOwners(response[0])
        console.log(response)
      }catch(e){
        console.log(e)
      }
    }
  }


  return (
    <Layout>
      <div className='flex flex-col gap-6'>
        <Card>
          <CardHeader>
            <div className='w-full flex justify-between items-center'>
              <span className='p-4 text-xl'>Registro de Automoviles</span>
              <span className='pr-4'>{horaActual}</span>
            </div>
          </CardHeader>
          <CardBody>
            <form  onSubmit={handleSubmit(submitHandler)}>
              <div className='flex justify-between gap-4'>
                <Input type="text" label="Telefono"
                        endContent={
                          owner ? (
                            <FaCheckCircle className={'text-green-500'} />
                          )
                          :(
                              <FaTimesCircle className={'text-red-500'} />
                            )
                        }
                       onInput={(event)=>{getPropietarioByCel(event.target)}}/>
                <Input type="text" label="Automovil" {...register('car')}/>
                <Input type="text" label="Lugar" {...register('parking_spot')}/>
              </div>
              <div className='w-full flex justify-end mt-10'>
                <Button type='submit' className='btn-primary'>Guardar</Button>
              </div>
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
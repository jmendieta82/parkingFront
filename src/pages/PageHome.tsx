import Layout from "../components/common/Layout.tsx";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import CardParking from "../components/common/CardParking.tsx";
import {useEffect, useState} from "react";
import FormTiket from "../components/common/FormTiket.tsx";


const PageHome = () => {

  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(()=>{
      setHoraActual(new Date().toLocaleTimeString());
    }, 1000);
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);


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
            <FormTiket/>
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
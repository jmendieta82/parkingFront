import Layout from "../components/common/Layout.tsx";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import FormTiket from "../components/common/FormTiket.tsx";




const PageHome = () => {

  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());


  const isMounted = useRef(true);

  useEffect(() => {
    const timer = setInterval(()=>{
      if (isMounted.current) {
        setHoraActual(new Date().toLocaleTimeString());
      }
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      isMounted.current = false;
      clearInterval(timer);
    }
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
      </div>
    </Layout>
  );
};

export default PageHome;
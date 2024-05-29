import {Button, Card, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {FaCarOn} from "react-icons/fa6";


const CardParking = () => {
  return (
    <div>
        <Card >
          <CardBody className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>AUM-601</span>
              <span className='text-gray-400'>Placa</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>B15</span>
              <span className='text-gray-400'>Lugar</span>
            </div>
            <Divider/>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>3:45 PM</span>
              <span className='text-gray-400'>Hora de entrada</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>Javier Mendieta</span>
              <span className='text-gray-400'>Propietario</span>
            </div>
            <Divider/>
          </CardBody>
          <CardFooter className='flex justify-end'>
            <Button className='btn-primary flex items-center'>
              <FaCarOn className='text-lg'/>
               <span>Retirar</span>
            </Button>
          </CardFooter>
        </Card>
    </div>
  );
};

export default CardParking;
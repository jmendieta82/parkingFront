import {Button, Card, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {FaCarOn} from "react-icons/fa6";
import {useEffect, useState} from "react";


const CardParking = ({tiket}:any) => {

  const [price, setPrice] = useState(0)
  const [formattedHours, setFormattedHours] = useState('00:00:00');
  const formatDate = (date:any) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  };

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  useEffect(() => {
    const formatHour = (time:string) => {
      const givenTime = new Date(time);
      const currentTime = new Date();

      const diff = currentTime.getTime() - givenTime.getTime();

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const paddedSeconds = String(seconds).padStart(2, '0');
      const paddedMinutes = String(minutes).padStart(2, '0');
      const paddedHours = String(hours).padStart(2, '0');

      const currentPrice = Math.floor(((diff/1000)/60) * 165)//TODO Los 165 tienen que ser dinamicos

      setPrice(currentPrice);

      if (days > 0) {
        setFormattedHours(`${days} días ${paddedHours}:${paddedMinutes}:${paddedSeconds}`);
      } else {
        setFormattedHours(`${paddedHours}:${paddedMinutes}:${paddedSeconds}`);
      }
    }
    formatHour(tiket.entry_time);
  }, [tiket.entry_time]);

  return (
    <div>
        <Card >
          <CardBody className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>{tiket.car.license_plate}</span>
              <span className='text-gray-400'>Placa</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>{tiket.parking_spot.location}</span>
              <span className='text-gray-400'>Lugar</span>
            </div>
            <Divider/>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>{formatDate(tiket.entry_time)}</span>
              <span className='text-gray-400'>Hora de entrada</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>{formattedHours}</span>
              <span className='text-gray-400'>Tiempo transcurrido</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>{formatter.format(price)}</span>
              <span className='text-gray-400'>Costo actual</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>{tiket.owner.full_name}</span>
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
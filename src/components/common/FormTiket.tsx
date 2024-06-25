import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader, Select, SelectItem, Spinner,
  useDisclosure
} from "@nextui-org/react";
import {FaCarSide, FaCheckCircle, FaMotorcycle, FaTimesCircle, FaTruckMoving} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {get, post} from "../../shared/api.tsx";
import {useEffect, useState} from "react";
import CardParking from "./CardParking.tsx";

const FormTiket = () => {

  const {
    register:reg1,
    handleSubmit:hand1,
    setValue:setvalue1,
    getValues:getValues1,
    reset:reset1,
  } = useForm()

  const {
    register:reg2,
    handleSubmit:hand2,
    setValue:setValue2,
    reset:reset2
  } = useForm()

  const {
    register:reg3,
    handleSubmit:hand3,
    setValue:setValue3,
    reset:reset3
  } = useForm()

  const [owner, setOwner] = useState<any>({})
  const [spots, setSpots] = useState<any>([])
  const [car, setCar] = useState<any>({})
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen:isOpen2, onOpen:onOpen2, onOpenChange:onOpenChange2} = useDisclosure();
  const [selectedSpot, setSelectedSpot] = useState<any>([]);
  const [loading, setLoading] = useState(false)
  const [loadingTiket, setLoadingTiket] = useState(false)
  const [tikets, setTikets] = useState<any>([])
  const [brnads, setBrnads] = useState([])


  const getBrands = async () =>{
    try {
      const response = await get('brand')
      setBrnads(response)
    } catch (e) {
      console.log(e)
    }
  }
  const submitHandler = async (data:any) => {
    setLoading(true)
    console.log(selectedSpot.currentKey);
    data.owner_id = owner.id
    data.car_id = car.id
    data.parking_spot_id = selectedSpot.currentKey
    data.exit_time = null
    try{
      const response = await post('tiket/',data)
      console.log(response)
      setLoading(false)
      getTikets()
      reset1()
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }
  const getPropietarioByCel = async (value:any) =>{

    if(value.value.length == 10){
      let obj={
        'phone':value.value,
      }
      try{
        const response = await post('searchByCel',obj)
        setOwner(response[0])
        if(response[0] == undefined){
          reset2()
          onOpen()
          setValue2('phone_number',getValues1('phone_number'))
        }
        console.log(response[0])
      }catch(e){
        console.log(e)
      }
    }
  }
  const getCarByPlate = async (value:any) =>{

    if(value.value.length == 7){
      let obj={
        'plate':value.value,
      }
      try{
        const response = await post('searchByPlate',obj)
        setCar(response[0])
        if(response[0] == undefined){
          reset3()
          onOpen2()
          setValue3('license_plate',getValues1('plate'))
        }
        console.log(response[0])
      }catch(e){
        console.log(e)
      }
    }
  }
  const addPropietario = async (data:any,onClose:any) =>{
   try{
     const response = await post('owner/',data)
     setOwner(response)
     setvalue1('phone_number', response.phone_number);
     onClose()
   }catch (e){
     console.log(e)
   }
  }
  const addCar = async (data:any,onClose:any) =>{
    data.owner = owner.id
    console.log(data)
    try{
      const response = await post('car/',data)
      setCar(response)
      setvalue1('plate', response.license_plate);
      onClose()
    }catch (e){
      console.log(e)
    }
  }
  const getParkingSpot  = async () =>{
    try{
      const response = await get('parking_spot')
      setSpots(response)
      console.log(response)
    }catch (error){
      console.log(error)
    }
  }
  const getTikets = async ()=>{
    setLoadingTiket(true)
    try {
      const response = await get('tiket');
      setTikets(response);
      console.log(response)
      setLoadingTiket(false)

    } catch (e) {
      console.log(e)
      setLoadingTiket(false)
    }
  }

  const Icon =(spot:any)=>{
    switch (spot.size) {
      case 'Pequeño':
        return <FaMotorcycle />;
        break;
      case 'Mediano':
        return <FaCarSide />;
        break;
      case 'Grande':
        return <FaTruckMoving />;
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getParkingSpot()
    getBrands()
    getTikets()
  }, []);


  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear nuevo propietario</ModalHeader>
              <ModalBody>
                <form className='flex flex-col gap-6' onSubmit={hand2((data) => addPropietario(data, onClose))}>
                  <Input type="text" label="Nombre completo" {...reg2('full_name')} />
                  <Input type="text" label="Teléfono" {...reg2('phone_number')}/>
                  <div className='flex justify-end gap-4'>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button type='submit' color="primary">
                      Guardar
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onOpenChange={onOpenChange2} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear nuevo automovil</ModalHeader>
              <ModalBody>
                <form className='flex flex-col gap-6' onSubmit={hand3((data) => addCar(data, onClose))}>
                  <Input type="text" label="Placa" {...reg3('license_plate')} />
                  <Select label="Seleccione una marca" {...reg3('brand_id')}>
                    {brnads.map((brand:any) => (
                      <SelectItem key={brand.id} textValue={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input type="text" label="Color" {...reg3('color')}/>
                  <div className='flex justify-end gap-4'>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button type='submit' color="primary">
                      Guardar
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <form onSubmit={hand1(submitHandler)}>
        <div className='flex justify-between gap-4'>
          <Input type="text" label="Telefono"
                 {...reg1('phone_number')}
                 color='primary'
                 endContent={
                   owner ? (
                       <FaCheckCircle className={'text-green-500'}/>
                     )
                     : (
                       <FaTimesCircle className={'text-red-500'}/>
                     )
                 }
                 onInput={(event) => {
                   getPropietarioByCel(event.target)
                 }}/>
          <Input type="text" label="Automovil"
                 {...reg1('plate')}
                 color='primary'
                 endContent={
                   car ? (
                       <FaCheckCircle className={'text-green-500'}/>
                     )
                     : (
                       <FaTimesCircle className={'text-red-500'}/>
                     )
                 }
                 onInput={(event) => {
                   getCarByPlate(event.target)
                 }}/>

          <Select label="Seleccione un lugar" color='primary' selectedKeys={selectedSpot}
                  onSelectionChange={setSelectedSpot}>
            {spots.map((spot: any) => (
              <SelectItem key={spot.id}
                          textValue={spot.size}
                          endContent={<span>{spot.is_occupied ? ' (ocupado)' : ' (libre)'}</span>}
                          startContent={Icon(spot)}
              >
                <span>{spot.size}</span>
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className='w-full flex justify-end mt-10'>
          <Button type='submit' color='primary' isLoading={loading}>Guardar</Button>
        </div>
      </form>
      {
        loadingTiket ? <Spinner size='md'/> : <div className='grid grid-cols-4 gap-6 mt-10'>
          {
            tikets.map((tiket: any) => (
              <div key={tiket.id}>
                <CardParking tiket={tiket}/>
              </div>
            ))
          }
        </div>
      }
    </>
  );
};

export default FormTiket;
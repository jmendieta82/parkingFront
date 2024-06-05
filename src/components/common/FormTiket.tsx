import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {post} from "../../shared/api.tsx";
import {useState} from "react";

const FormTiket = () => {

  const {
    register:reg1,
    handleSubmit:hand1,
    setValue:setvalue1,
    getValues:getValues1
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

  const [owner, setOwners] = useState<any>({})
  const [car, setCar] = useState<any>({})
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen:isOpen2, onOpen:onOpen2, onOpenChange:onOpenChange2} = useDisclosure();

  const submitHandler = (data:any) => {
    console.log(data)
  }
  const getPropietarioByCel = async (value:any) =>{

    if(value.value.length == 10){
      let obj={
        'phone':value.value,
      }
      try{
        const response = await post('searchByCel',obj)
        setOwners(response[0])
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
     setOwners(response)
     setvalue1('phone_number', response.phone_number);
     onClose()
   }catch (e){
     console.log(e)
   }
  }
  const addCar = async (data:any,onClose:any) =>{
    data.owner = owner.id
    try{
      const response = await post('car/',data)
      setCar(response)
      setvalue1('plate', response.license_plate);
      onClose()
    }catch (e){
      console.log(e)
    }
  }


  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear nuevo propietario</ModalHeader>
              <ModalBody>
                <form className='flex flex-col gap-6' onSubmit={hand2((data) => addPropietario(data,onClose))}>
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
      <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear nuevo automovil</ModalHeader>
              <ModalBody>
                <form className='flex flex-col gap-6' onSubmit={hand3((data) => addCar(data,onClose))}>
                  <Input type="text" label="Placa" {...reg3('license_plate')} />
                  <Input type="text" label="Marca" {...reg3('brand')}/>
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
          <Input type="text" label="Lugar" {...reg1('parking_spot')}/>
        </div>
        <div className='w-full flex justify-end mt-10'>
          <Button type='submit' className='btn-primary'>Guardar</Button>
        </div>
      </form>
    </>
  );
};

export default FormTiket;
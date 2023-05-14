import {Box, Flex, Grid, Text} from '@chakra-ui/layout';
import {useForm} from "react-hook-form";
import {
    Select, Input, Button, Heading, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import {filterData} from "../utils/filterData";
import axios from "axios";
import { useState} from "react";

const zones = [
    {
        value: 1,
        name: 'East'
    },
    {
        value: 2,
        name: 'Center'
    },
    {
        value: 3,
        name: 'West'
    }]
const rooms = filterData[6]?.items;
const bathrooms = filterData[7]?.items;
const interior = filterData.at(-2)?.items;
const types = filterData.at(-1)?.items;

const Calculate = () => {
    const [price, setPrice] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const onSubmit = async (values) => {
        const price = await axios.post('https://lnu-server.onrender.com/v1/v1/buildings/calculate', values)
            .then((value) => value.data?.price);
        setPrice(price);
    }

    return <Box border='2px' borderRadius='24px' borderColor='gray.200' color='black.400' maxWidth='500px' margin='auto'
                px='4' py='12' my='10'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Heading color="blackAlpha.500" textAlign='center' as='h1' size='lg' py='2'>
                Calculate property type form
            </Heading>
            <Grid templateColumns='repeat(2, 1fr)' alignItems="center" gridColumnGap="4" pt='3'>
                <Box>
                    <Select placeholder="Property zone" {...register('zone', {required: true})}>
                        {zones.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Box minH='24px'>
                        {errors?.zone && <Text color='red.400'>This field is required</Text>}
                    </Box>
                </Box>

                <Box>
                    <Input type="number" placeholder="Area" {...register("area", {required: true, min: 10})} />
                    <Box minH='24px'>
                        {errors?.area && <Text color='red.400'>This field is required</Text>}
                    </Box>
                </Box>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' alignItems="center" gridColumnGap="4">
                <Box>
                    <Select placeholder="Number of rooms" {...register('rooms', {required: true})}>
                        {rooms.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Box minH='24px'>
                        {errors?.rooms && <Text color='red.400'>This field is required</Text>}
                    </Box>
                </Box>

                <Box>
                    <Select placeholder="Number of bathrooms" {...register('bathrooms', {required: true})}>
                        {bathrooms.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Box minH='24px'>
                        {errors?.bathrooms && <Text color='red.400'>This field is required</Text>}
                    </Box>
                </Box>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' alignItems="center" gridColumnGap="4" py='3'>
                <Box>
                    <Select placeholder="Interior type" {...register('interior', {required: true})}>
                        {interior.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Box minH='24px'>
                        {errors?.interior && <Text color='red.400'>This field is required</Text>}
                    </Box>
                </Box>

                <Box>
                    <Select placeholder="Property type" {...register('type', {required: true})}>
                        {types.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Box minH='24px'>
                        {errors?.type && <Text color='red.400'>This field is required</Text>}
                    </Box>
                </Box>
            </Grid>

            <Flex justifyContent='center' mt='5'>
                <Button onClick={onOpen} colorScheme='blue' type='submit'>Calculate</Button>
            </Flex>
        </form>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Result</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Flex justifyContent='center'>
                        <strong>Predicted price: </strong>{price}
                    </Flex>
                </ModalBody>

                <ModalFooter >
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
}

export default Calculate;
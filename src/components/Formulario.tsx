/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Modal, Text, StyleSheet, SafeAreaView, View, TextInput, ScrollView, Pressable, Alert} from 'react-native';

import DatePicker from 'react-native-date-picker';
import { PacienteProps } from './Paciente';

interface FormularioProps {
  cerrarModal: () => void;
  pacientes: PacienteProps[];
  setPacientes: React.Dispatch<React.SetStateAction<PacienteProps[]>>;
  paciente: PacienteProps;
  setPaciente: React.Dispatch<React.SetStateAction<PacienteProps>>;
}

const Formulario: React.FC<FormularioProps> = ({cerrarModal, pacientes, setPacientes, paciente: pacienteObj, setPaciente: setPacienteApp}) => {
  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState(0);
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(()=>{
    if(Object.keys(pacienteObj).length > 0){
      if(pacienteObj.id){
        setId(pacienteObj.id);
        setPaciente(pacienteObj.paciente ?? '');
        setPropietario(pacienteObj.propietario ?? '');
        setEmail(pacienteObj.email ?? '');
        setFecha(pacienteObj.fecha ?? new Date());
        setTelefono(pacienteObj.telefono ?? '');
        setSintomas(pacienteObj.sintomas ?? '');
      }
    }
  }, [pacienteObj]);

  const reiniciarPaciente = () => {
    setPaciente('');
    setPropietario('');
    setEmail('');
    setFecha(new Date());
    setTelefono('');
    setSintomas('');
    setId(0);
  };

  const handleCita = () =>{
    if([paciente, propietario, email, fecha, sintomas].includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevoPaciente: PacienteProps = {
      paciente,
      propietario,
      email,
      fecha,
      telefono,
      sintomas,
    };
    //Revisar si es un registro nuevo o edicion
    if(id){
      // Editando
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === id ? nuevoPaciente : pacienteState);
      setPacientes(pacientesActualizados);
      setPacienteApp({});
    }else{
      // Nuevo Registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    reiniciarPaciente();
    cerrarModal();
  };

  return (
    <Modal animationType="slide">
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable style={styles.btnCancelar} onLongPress={() => {
            cerrarModal();
            setPacienteApp({});
            reiniciarPaciente();
            }
          }>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput style={styles.input} placeholder="Paciente" placeholderTextColor={'#666'} value={paciente} onChangeText={setPaciente}/>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput style={styles.input} placeholder="Propietario" placeholderTextColor={'#666'} value={propietario} onChangeText={setPropietario}/>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor={'#666'} keyboardType="email-address" value={email} onChangeText={setEmail}/>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono Propietario</Text>
            <TextInput style={styles.input} placeholder="Telefono" placeholderTextColor={'#666'} keyboardType="number-pad" value={telefono}
            onChangeText={setTelefono} maxLength={10}/>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker date={fecha} locale="es" onDateChange={date => setFecha(date)}/>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput style={[styles.input, styles.sintomasInput]} placeholder="Sintomas Paciente" placeholderTextColor={'#666'} value={sintomas} onChangeText={setSintomas}
            multiline={true} numberOfLines={4}/>
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido:{
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo:{
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  tituloBold:{
    fontWeight: '900',
  },
  btnCancelar:{
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo:{
    marginTop: 10,
    marginHorizontal: 30,
  },
  label:{
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input:{
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    color: '#000',
  },
  sintomasInput:{
    height: 100,
  },
  fechaContenedor:{
    borderRadius: 10,
  },
  btnNuevaCita:{
    marginVertical: 50,
    backgroundColor: '#f59e0b',
    marginHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnNuevaCitaTexto:{
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
export default Formulario;

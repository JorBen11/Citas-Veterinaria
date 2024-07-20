import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import Formulario from './src/components/Formulario';
import Paciente, {PacienteProps} from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';
function App(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState<PacienteProps[]>([]);
  const [paciente, setPaciente] = useState<PacienteProps>({});
  const [modalPaciente, setModalPaciente] = useState(false);
  const pacienteEditar = (id: number) => {
    const pacienteActualizado = pacientes.find(pa => pa.id === id);
    setPaciente(pacienteActualizado || {});
  };

  const pacienteEliminar = (id: number) => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Si, eliminar',
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              pacienteState => pacienteState.id !== id,
            );
            setPacientes(pacientesActualizados);
          },
        },
      ],
    );
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={item => (item.id ? item.id.toString() : '')}
          renderItem={({item}) => (
            <Paciente
              item={item}
              setModalVisible={setModalVisible}
              pacienteEditar={pacienteEditar}
              pacienteEliminar={pacienteEliminar}
              setModalPaciente={setModalPaciente}
              setPaciente={setPaciente}
            />
          )}
        />
      )}

      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      <Modal visible={modalPaciente} animationType="slide">
        <InformacionPaciente
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnTextNuevaCita: {
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  negro: {
    color: '#000',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
export default App;

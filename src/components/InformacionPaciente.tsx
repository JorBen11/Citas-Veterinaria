import React from 'react';
import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import {formatearFecha} from './helpers';
import {PacienteProps} from './Paciente';

interface InformacionPacienteProps {
  paciente: PacienteProps;
  setModalPaciente: React.Dispatch<React.SetStateAction<boolean>>;
  setPaciente: React.Dispatch<React.SetStateAction<PacienteProps>>;
}
const InformacionPaciente: React.FC<InformacionPacienteProps> = ({
  paciente,
  setModalPaciente,
  setPaciente,
}) => {
  return (
    <SafeAreaView style={styles.contenedor}>
      <View>
        <Text style={styles.titulo}>
          Informacion <Text style={styles.tituloBold}>Paciente</Text>
        </Text>
        <Pressable
          style={styles.btnCerrar}
          onLongPress={() => {
            setModalPaciente(false);
            setPaciente({});
          }}>
          <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
        </Pressable>

        <View style={styles.contenido}>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.valor}>{paciente.paciente}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Propietario:</Text>
            <Text style={styles.valor}>{paciente.propietario}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.valor}>{paciente.email}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono:</Text>
            <Text style={styles.valor}>{paciente.telefono}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta:</Text>
            <Text style={styles.valor}>{formatearFecha(paciente.fecha)}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas:</Text>
            <Text style={styles.valor}>{paciente.sintomas}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F59E0B',
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCerrarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  contenido: {
    marginHorizontal: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  campo: {
    marginBottom: 10,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 12,
  },
  valor: {
    fontWeight: '700',
    color: '#334155',
    fontSize: 20,
  },
});

export default InformacionPaciente;

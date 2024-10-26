import React, { useState, useCallback, useEffect } from 'react';
import { contract } from "@dapp/web3-services";
import { Patient } from "@dapp/web3-services/near-interface";
import { placesUpdateObservable } from "@dapp/utils/observables";

const PatientInfo: React.FC<{ patient: Patient }> = ({ patient }) => (
  <div className="border p-4 mb-4 rounded-lg shadow-sm">
    <h3 className="font-bold">{patient.title} {patient.first_name} {patient.last_name}</h3>
    <p>ID: {patient.id}</p>
    <p>Email: {patient.email}</p>
    <p>Gender: {patient.gender}</p>
    <p>Condition: {patient.condition}</p>
    <p>AccountId: {patient.account_id}</p>
  </div>
);

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[] | null>(null);

  const fetchPatients = useCallback(async () => {
    const _patients = await contract.getPatients();
    setPatients(_patients);
  }, []);

  useEffect(() => {
    const handler = () => {
      fetchPatients();
    };
    placesUpdateObservable.subscribe(handler);
    return () => {
      placesUpdateObservable.unsubscribe(handler);
    };
  }, [fetchPatients]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Registered Patients</h1>
      {patients && patients.map((patient) => (
        <PatientInfo key={patient.id} patient={patient} />
      ))}
    </div>
  );
}
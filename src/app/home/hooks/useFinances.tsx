import {
  historicFinancesDetails,
  historicFinances,
} from '@/services/coinSentry';
import { useState } from 'react';

export const useFinances = () => {
  // TODO: add useReducer
  const [historic, setHistoric] = useState([]);
  const [historicDetails, setHistoricDetails] = useState([]);

  const fetchHistoric = async () => {
    const [historicResponse, historicDetailsResponse] = await Promise.all([
      historicFinances,
      historicFinancesDetails,
    ]);

    const historicData = await historicResponse();
    const historicDetailsData = await historicDetailsResponse();

    setHistoric(historicData);
    setHistoricDetails(historicDetailsData);
  };

  return {
    historic,
    historicDetails,
    fetchHistoric,
  };
};

import React, { useState } from 'react';
import DelayTableView from './DelayTable.mjs';
import TicketView from './TicketView.mjs';
import Map from './MapView.mjs';

export default function MainView() {
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
  };

  return (
    <>
      {selectedTrain ? (
        <TicketView selectedTrain={selectedTrain} onBackClick={() => setSelectedTrain(null)} />
      ) : (
        <DelayTableView onTrainClick={handleTrainClick} />
      )}
      <Map/>
    </>
  );
};

// export default MainView;

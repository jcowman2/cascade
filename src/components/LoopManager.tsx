import React from "react";
import { Timeline } from "react-ensemble";

export interface LoopManagerProps {
  speed: number;
  playing: boolean;
  onShift: () => void;
}

const LoopManager: React.FC<LoopManagerProps> = props => {
  const { speed, playing, onShift } = props;
  const [flag, setFlag] = React.useState(false);
  const [tick, setTick] = React.useState(0);

  // if (!speed) {
  //   return null;
  // }

  return (
    <Timeline
      playing={playing}
      endBehavior="loop"
      defaultState={{ flag: 0 }}
      track={[
        { duration: speed ? 2000 / speed : 2000, state: { flag: { to: 2 } } }
      ]}
      value={tick}
      onTick={({ value }) => setTick(value)}
      onUpdate={({ state }) => {
        const newFlag = !!Math.floor(state.flag);
        if (newFlag !== flag) {
          onShift();
        }
        setFlag(newFlag);
      }}
    />
  );
};

export default LoopManager;

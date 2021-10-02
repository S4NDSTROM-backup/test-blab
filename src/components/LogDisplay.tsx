import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  logs: string[];
}

const LogDisplay = ({ logs }: Props) => {
  const logRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <LogContainer ref={logRef}>
      {logs.map((log) => {
        return <LogLine>{log}</LogLine>;
      })}
    </LogContainer>
  );
};

const LogLine = styled.span`
  width: 100%;
  font-size: 10px;
`;

const LogContainer = styled.div`
  border: 1px solid;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100px;
  overflow: scroll;
`;

export default LogDisplay;

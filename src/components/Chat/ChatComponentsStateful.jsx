import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  ChatComposite,
  fromFlatCommunicationIdentifier,
  useAzureCommunicationChatAdapter
} from '@azure/communication-react';
import React, { useMemo, useEffect, useState } from 'react';
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'


export const ChatContainer = (props) => {
  
  const credential = useMemo(() => {
    try {
      return new AzureCommunicationTokenCredential(props.token);
    } catch {
      console.error('Failed to construct token credential');
      return undefined;
    }
  }, [props.token]);

  const userId = useMemo(
    () => fromFlatCommunicationIdentifier(props.userIdentifier),
    [props.userIdentifier]
  );

  // Add throttling for setting display name during typing
  const [displayName, setDisplayName] = useState(undefined);
  useEffect(() => {
    const handle = setTimeout(() => {
      setDisplayName(props.displayName);
    }, 500);
    return () => clearTimeout(handle);
  }, [props.displayName]);

  const adapter = useAzureCommunicationChatAdapter({
    endpoint: props.endpointUrl,
    userId,
    displayName,
    credential,
    threadId: props.threadId
  });


  if (adapter) {
    return (
      <Box sx={{display: 'flex', height: '70vh'}}>
        <ChatComposite
          adapter={adapter}
          fluentTheme={props.fluentTheme}
          rtl={props.rtl ?? false}
          options={{
            errorBar: props.errorBar,
            participantPane: props.participants,
            topic: props.topic,
            richTextEditor: props.richTextEditor
          }}
          locale={props.locale}
        />
      </Box>
    );
  }
  if (credential === undefined) {
    return <>Failed to construct credential. Provided token is malformed.</>;
  }
  return <CircularProgress sx={{position: 'relative', left: '50%', transform: 'translate(-0.5)'}} />;
};
